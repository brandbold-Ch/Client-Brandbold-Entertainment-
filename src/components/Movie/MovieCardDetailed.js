import React from 'react';

const MovieCardDetailed = ({ movie }) => {
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
      <img
        src={movie.thumbnail_url}
        alt={movie.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{movie.title} ({releaseYear})</h3>
        <p className="text-gray-300 mb-2">{movie.description?.slice(0, 100)}{movie.description?.length > 100 ? '...' : ''}</p>

        <p className="text-sm">
          <span className="font-semibold text-purple-400">Duración:</span> {movie.duration}
        </p>

        {movie.genres && movie.genres.length > 0 && (
          <p className="text-sm mt-1">
            <span className="font-semibold text-purple-400">Géneros:</span>{' '}
            {movie.genres.map(g => g.genre_name).join(', ')}
          </p>
        )}

        {movie.franchises && movie.franchises.length > 0 && (
          <p className="text-sm mt-1">
            <span className="font-semibold text-purple-400">Franquicia:</span>{' '}
            {movie.franchises.map(f => f.name).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCardDetailed;
