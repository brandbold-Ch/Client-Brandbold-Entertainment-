import React from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onSelectMovie }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            onClick={() => onSelectMovie && onSelectMovie(movie)}
            className="cursor-pointer">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default MovieRow;
