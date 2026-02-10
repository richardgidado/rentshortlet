import { mockShortlets } from '../lib/constants';
import ShortletCard from './ShortletCard';

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

interface FeaturedShortletsProps {
  expandedAmenities: Set<number>;
  onToggleAmenities: (propertyId: number) => void;
  onBookNow: (shortlet: Shortlet) => void;
}

export default function FeaturedShortlets({ 
  expandedAmenities, 
  onToggleAmenities, 
  onBookNow 
}: FeaturedShortletsProps) {
  return (
    <section id="shortlets" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Shortlets
          </h2>
          <p className="text-xl text-slate-600">
            Handpicked accommodations for your perfect stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockShortlets.map((shortlet: typeof mockShortlets[0], index: number) => (
            <ShortletCard
              key={shortlet.id}
              shortlet={shortlet}
              expandedAmenities={expandedAmenities}
              onToggleAmenities={onToggleAmenities}
              onBookNow={onBookNow}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}