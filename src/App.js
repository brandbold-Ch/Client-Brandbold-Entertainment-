import React, { useState, useEffect } from 'react';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Navbar from './components/Navbar/Navbar';
import MovieRow from './components/Movie/MovieRow';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import PlansSection from './components/Plans/PlansSection';
import WelcomePanel from './components/Dashboard/WelcomePanel';
import MovieGallery from './components/Movie/MovieGallery';
import { fetchMovies, signupUser, getAuthData, createWatchHistory, updateWatchHistory, getWatchTime } from './utils/api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [isTrailerWatched, setIsTrailerWatched] = useState(false);
  const [lastPosition, setLastPosition] = useState(0);
  const [watchTime, setWatchTime] = useState(null);

  const authData = getAuthData();
  const user_id = authData?.data?.user_id || null;

  useEffect(() => {
    if (isAuthenticated) {
      fetchMovies().then(data => setMovies(data));
      setCurrentView('home');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedMovie) {
      const stored = getWatchTime(selectedMovie.id);
      setWatchTime(stored || 0);
    }
  }, [selectedMovie]);

  useEffect(() => {
    let intervalId;

    const shouldTrack =
      isAuthenticated &&
      currentView === 'movie' &&
      isTrailerWatched &&
      selectedMovie &&
      user_id;

    if (shouldTrack) {
      intervalId = setInterval(() => {
        setLastPosition((prevTime) => {
          updateWatchHistory(user_id, {
            content_id: selectedMovie.id,
            last_position: prevTime
          });
          return prevTime;
        });
      }, 1 * 60 * 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated, currentView, isTrailerWatched, selectedMovie, user_id]);

  const handleLogin = (response) => {
    setIsAuthenticated(true);
    setCurrentView('home');
  };

  const handleSignup = async (credentials) => {
    try {
      await signupUser(credentials);
      setIsAuthenticated(true);
      setCurrentView('home');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('welcome');
    setShowLogin(true);
  };

  const handleWatchMovie = async () => {
    if (!selectedMovie || !user_id) return;

    try {
      const history = await createWatchHistory(user_id, {
        content_id: selectedMovie.id
      });

      const key = `watchTime_${selectedMovie.id}`;
      localStorage.setItem(key, history?.last_position || 0);
      setWatchTime(history?.last_position || 0);

    } catch (error) {
      console.error('Error al crear historial de visionado:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {isAuthenticated && (
        <Navbar onLogout={handleLogout} setCurrentView={setCurrentView} />
      )}

      {!isAuthenticated && currentView === 'welcome' && (
        <div className="flex flex-col min-h-screen">
          <WelcomePanel
            onShowLogin={() => {
              setShowLogin(true);
              setCurrentView('auth');
            }}
            onShowSignup={() => {
              setShowLogin(false);
              setCurrentView('auth');
            }}
          />
        </div>
      )}

      {!isAuthenticated && currentView === 'auth' && (
        <div className="flex items-center justify-center min-h-screen">
          {showLogin ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToSignup={() => setShowLogin(false)}
              onBack={() => setCurrentView('welcome')}
            />
          ) : (
            <SignupForm
              onSignup={handleSignup}
              onSwitchToLogin={() => setShowLogin(true)}
              onBack={() => setCurrentView('welcome')}
            />
          )}
        </div>
      )}

      {isAuthenticated && currentView === 'home' && (
        <MovieGallery
          movies={movies}
          onSelectMovie={(movie) => {
            setSelectedMovie(movie);
            setCurrentView('movie');
            setIsTrailerWatched(false);
          }}
        />
      )}

      {isAuthenticated && currentView === 'movies' && (
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setCurrentView('home')}
            className="mb-4 text-purple-400 hover:text-purple-300 transition"
          >
            ← Back to Home
          </button>
          <MovieRow
            title="Popular Movies"
            movies={movies}
            onSelectMovie={(movie) => {
              setSelectedMovie(movie);
              setCurrentView('movie');
              setIsTrailerWatched(false);
            }}
          />
          <MovieRow
            title="New Releases"
            movies={[...movies].reverse()}
            onSelectMovie={(movie) => {
              setSelectedMovie(movie);
              setCurrentView('movie');
              setIsTrailerWatched(false);
            }}
          />
        </div>
      )}

      {isAuthenticated && currentView === 'movie' && selectedMovie && (
        <div className="w-full px-4 py-8 text-white max-w-screen-2xl mx-auto">
          <button
            onClick={() => setCurrentView('home')}
            className="mb-6 text-purple-400 hover:text-purple-300 transition"
          >
            ← Volver al inicio
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              {!isTrailerWatched ? (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">Tráiler</h3>
                  <VideoPlayer
                    videoUrl={selectedMovie.trailer_url}
                    startTime={0}
                    onEnded={() => {
                      setIsTrailerWatched(true);
                      handleWatchMovie();
                    }}
                  />
                  <button
                    onClick={() => {
                      setIsTrailerWatched(true);
                      handleWatchMovie();
                    }}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition"
                  >
                    Ver Película
                  </button>
                </>
              ) : (
                watchTime !== null && (
                  <>
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">Película</h3>
                    <VideoPlayer
                      videoUrl={selectedMovie.content_url}
                      startTime={watchTime}
                      onProgress={(time) => setLastPosition(time)}
                    />
                  </>
                )
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-bold leading-tight">{selectedMovie.title}</h2>
              <p className="text-gray-300 text-base leading-relaxed">{selectedMovie.description}</p>

              <div className="text-sm text-gray-400 space-y-2">
                <p>
                  <span className="font-semibold text-white">Duración:</span> {selectedMovie.duration}
                </p>
                <p>
                  <span className="font-semibold text-white">Fecha de estreno:</span> {selectedMovie.release_date}
                </p>

                {selectedMovie.genres && (
                  <div>
                    <span className="font-semibold text-white">Géneros:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedMovie.genres.map((g, i) => (
                        <span key={i} className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          {g.genre_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMovie.franchises?.length > 0 && (
                  <div>
                    <span className="font-semibold text-white">Franquicia:</span>
                    <div className="mt-1">
                      <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                        {selectedMovie.franchises[0].name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && currentView === 'plans' && <PlansSection />}
    </div>
  );
};

export default App;
