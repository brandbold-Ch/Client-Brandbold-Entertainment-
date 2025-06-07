import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  const releaseYear = movie.release_date?.split('-')[0] || '';

  return (
    <div 
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative">
        <img
          src={movie.thumbnail_url}
          alt={movie.title}
          className="w-full h-60 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
          <p className="text-purple-300 text-xs">{releaseYear}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
