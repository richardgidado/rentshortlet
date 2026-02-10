import { useState } from 'react';

interface Shortlet {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  available: boolean;
  ownerEmail: string;
}

interface ShortletCardProps {
  shortlet: Shortlet;
  expandedAmenities: Set<number>;
  onToggleAmenities: (propertyId: number) => void;
  onBookNow: (shortlet: Shortlet) => void;
  index: number;
}

export default function ShortletCard({ 
  shortlet, 
  expandedAmenities, 
  onToggleAmenities, 
  onBookNow, 
  index 
}: ShortletCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Image failed to load:', shortlet.image);
    e.currentTarget.style.display = 'none';
  };

  const handleImageLoad = () => {
    console.log('Image loaded:', shortlet.image);
  };

  return (
    <div 
      className={`animate-fadeInUp bg-white rounded-2xl shadow-lg overflow-hidden card-hover ${!shortlet.available ? 'opacity-75' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <img
          src={shortlet.image}
          alt={shortlet.name}
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-2xl font-bold mb-2">{shortlet.name}</h3>
            <p className="text-lg opacity-90">{shortlet.location}</p>
          </div>
        </div>
        {!shortlet.available && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Unavailable
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-1">{shortlet.name}</h3>
            <p className="text-slate-600">{shortlet.location}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{color: '#9FCC2E'}}>${shortlet.price}</p>
            <p className="text-sm text-slate-500">/night</p>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_: unknown, i: number) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
          </div>
          <span className="ml-2 text-slate-600 text-sm">
            {shortlet.rating} ({shortlet.reviews} reviews)
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {shortlet.amenities.slice(0, expandedAmenities.has(shortlet.id) ? shortlet.amenities.length : 3).map((amenity: string) => (
            <span 
              key={amenity}
              className="px-3 py-1 text-sm rounded-full" style={{backgroundColor: '#F7FDE8', color: '#9FCC2E'}}
            >
              {amenity}
            </span>
          ))}
          {shortlet.amenities.length > 3 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleAmenities(shortlet.id);
              }}
              className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {expandedAmenities.has(shortlet.id) ? 'Show less' : `+${shortlet.amenities.length - 3} more`}
            </button>
          )}
        </div>
        
        <button 
          onClick={() => shortlet.available && onBookNow(shortlet)}
          disabled={!shortlet.available}
          className={`w-full py-3 rounded-xl font-semibold transition-all cursor-pointer ${
            shortlet.available 
              ? 'btn-primary text-white' 
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          {shortlet.available ? 'Book Now' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}