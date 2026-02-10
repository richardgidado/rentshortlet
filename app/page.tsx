'use client';

import { useState } from 'react';
import { mockShortlets } from '../lib/constants';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturedShortlets from '../components/FeaturedShortlets';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

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

interface BookingForm {
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  phone: string;
}

export default function Home() {
  const [selectedShortlet, setSelectedShortlet] = useState<Shortlet | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expandedAmenities, setExpandedAmenities] = useState<Set<number>>(new Set());
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    phone: ''
  });

  const handleBookNow = (shortlet: Shortlet) => {
    setSelectedShortlet(shortlet);
    setIsBookingModalOpen(true);
  };

  const toggleAmenities = (propertyId: number) => {
    const newExpanded = new Set(expandedAmenities);
    if (newExpanded.has(propertyId)) {
      newExpanded.delete(propertyId);
    } else {
      newExpanded.add(propertyId);
    }
    setExpandedAmenities(newExpanded);
  };

  const handleBookingSubmit = () => {
    // Note: EmailJS handling is now done in BookingModal component
    // This function just does cleanup after successful submission
    
    console.log('Booking submitted successfully - EmailJS will handle the email sending');
    
    // Reset form and close modal after a short delay
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setSelectedShortlet(null);
      setBookingForm({
        email: '',
        checkIn: '',
        checkOut: '',
        guests: 2,
        name: '',
        phone: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <Navigation />
      <HeroSection />
      <FeaturedShortlets
        expandedAmenities={expandedAmenities}
        onToggleAmenities={toggleAmenities}
        onBookNow={handleBookNow}
      />
      <AboutSection />
      <WhyChooseUs />
      <ContactSection />
      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        selectedShortlet={selectedShortlet}
        bookingForm={bookingForm}
        onBookingFormChange={setBookingForm}
        onBookingSubmit={handleBookingSubmit}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
