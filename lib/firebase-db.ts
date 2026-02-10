 import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';

// Property interface
export interface Property {
  id: string;
  name: string; 
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  available: boolean;
  ownerEmail: string;
  description: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  createdAt: Date;
  updatedAt: Date;
}

// Booking interface
export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  message?: string;
}

export class FirebaseDBService {
  private static readonly PROPERTIES_COLLECTION = 'properties';
  private static readonly BOOKINGS_COLLECTION = 'bookings';

  // ========== PROPERTIES ==========

  // Get all properties
  static async getAllProperties(): Promise<Property[]> {
    try {
      const q = query(
        collection(db, this.PROPERTIES_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Property[];
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw new Error('Failed to fetch properties');
    }
  }

  // Get available properties only
  static async getAvailableProperties(): Promise<Property[]> {
    try {
      const q = query(
        collection(db, this.PROPERTIES_COLLECTION),
        where('available', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Property[];
    } catch (error) {
      console.error('Error fetching available properties:', error);
      throw new Error('Failed to fetch available properties');
    }
  }

  // Get property by ID
  static async getPropertyById(propertyId: string): Promise<Property | null> {
    try {
      const docRef = doc(db, this.PROPERTIES_COLLECTION, propertyId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Property;
      }
      return null;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw new Error('Failed to fetch property');
    }
  }

  // Create new property
  static async createProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.PROPERTIES_COLLECTION), {
        ...propertyData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating property:', error);
      throw new Error('Failed to create property');
    }
  }

  // Update property
  static async updateProperty(propertyId: string, updates: Partial<Property>): Promise<void> {
    try {
      const docRef = doc(db, this.PROPERTIES_COLLECTION, propertyId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating property:', error);
      throw new Error('Failed to update property');
    }
  }

  // Toggle property availability
  static async togglePropertyAvailability(propertyId: string, available: boolean): Promise<void> {
    try {
      const docRef = doc(db, this.PROPERTIES_COLLECTION, propertyId);
      await updateDoc(docRef, {
        available,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error toggling property availability:', error);
      throw new Error('Failed to update property availability');
    }
  }

  // Delete property
  static async deleteProperty(propertyId: string): Promise<void> {
    try {
      const docRef = doc(db, this.PROPERTIES_COLLECTION, propertyId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw new Error('Failed to delete property');
    }
  }

  // ========== BOOKINGS ==========

  // Get all bookings
  static async getAllBookings(): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, this.BOOKINGS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Booking[];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('Failed to fetch bookings');
    }
  }

  // Get bookings by property
  static async getBookingsByProperty(propertyId: string): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, this.BOOKINGS_COLLECTION),
        where('propertyId', '==', propertyId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Booking[];
    } catch (error) {
      console.error('Error fetching bookings by property:', error);
      throw new Error('Failed to fetch property bookings');
    }
  }

  // Create new booking
  static async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.BOOKINGS_COLLECTION), {
        ...bookingData,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }

  // Update booking status
  static async updateBookingStatus(bookingId: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<void> {
    try {
      const docRef = doc(db, this.BOOKINGS_COLLECTION, bookingId);
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw new Error('Failed to update booking status');
    }
  }

  // ========== INITIALIZATION ==========

  // Initialize demo data
  static async initializeDemoData(): Promise<void> {
    try {
      // Check if properties already exist
      const existingProperties = await this.getAllProperties();
      if (existingProperties.length > 0) {
        console.log('Demo data already exists');
        return;
      }

      // Demo properties data
      const demoProperties = [
        {
          name: 'Ocean Villa',
          location: 'Miami Beach, FL',
          price: 299,
          rating: 4.8,
          reviews: 127,
          image: '/ocean-villa.jpg',
          amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Parking'],
          available: true,
          ownerEmail: 'owner@azulhomes.com',
          description: 'Luxury oceanfront villa with stunning views',
          maxGuests: 6,
          bedrooms: 3,
          bathrooms: 2
        },
        {
          name: 'Mountain Retreat',
          location: 'Aspen, CO',
          price: 450,
          rating: 4.9,
          reviews: 89,
          image: '/image1.jpg',
          amenities: ['WiFi', 'Fireplace', 'Ski Storage', 'Hot Tub', 'Kitchen'],
          available: true,
          ownerEmail: 'owner@azulhomes.com',
          description: 'Cozy mountain cabin perfect for skiing trips',
          maxGuests: 8,
          bedrooms: 4,
          bathrooms: 3
        },
        {
          name: 'City Apartment',
          location: 'New York, NY',
          price: 200,
          rating: 4.6,
          reviews: 203,
          image: '/image2.jpg',
          amenities: ['WiFi', 'Kitchen', 'Washer/Dryer', 'Elevator'],
          available: false,
          ownerEmail: 'owner@azulhomes.com',
          description: 'Modern apartment in the heart of Manhattan',
          maxGuests: 4,
          bedrooms: 2,
          bathrooms: 1
        }
      ];

      // Add demo properties
      for (const property of demoProperties) {
        await this.createProperty(property);
      }

      console.log('Demo data initialized successfully');
    } catch (error) {
      console.error('Error initializing demo data:', error);
      throw new Error('Failed to initialize demo data');
    }
  }

  // Real-time listener for properties (optional)
  static subscribeToProperties(callback: (properties: Property[]) => void) {
    const q = query(
      collection(db, this.PROPERTIES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const properties = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Property[];
      
      callback(properties);
    });
  }
}