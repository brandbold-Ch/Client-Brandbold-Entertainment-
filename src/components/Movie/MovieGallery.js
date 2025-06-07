import React, { useState, useMemo } from 'react';
import MovieCard from './MovieCard';

const MovieGallery = ({ movies = [], onSelectMovie }) => {
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedFranchise, setSelectedFranchise] = useState('Todas');
  const [search, setSearch] = useState('');

  // Obtiene los géneros y franquicias únicas
  const genres = useMemo(() => {
    const allGenres = movies.flatMap(m => m.genres.map(g => g.genre_name));
    return ['Todos', ...Array.from(new Set(allGenres))];
  }, [movies]);

  const franchises = useMemo(() => {
    const all = movies.flatMap(m => m.franchises.map(f => f.name));
    return ['Todas', ...Array.from(new Set(all))];
  }, [movies]);

  // Aplica filtros
  const filteredMovies = movies.filter(movie => {
    const matchesGenre =
      selectedGenre === 'Todos' || movie.genres.some(g => g.genre_name === selectedGenre);
    const matchesFranchise =
      selectedFranchise === 'Todas' || movie.franchises.some(f => f.name === selectedFranchise);
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesFranchise && matchesSearch;
  });

  return (
    <div className="px-4 py-8 container mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Películas</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 w-full sm:w-64"
        />

        <select
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
        >
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          value={selectedFranchise}
          onChange={e => setSelectedFranchise(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
        >
          {franchises.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Grid de películas */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => onSelectMovie?.(movie)} 
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No se encontraron películas que coincidan.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieGallery;
