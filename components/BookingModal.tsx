import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface BookingForm {
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  phone: string;
}

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

interface BookingModalProps {
  isOpen: boolean;
  selectedShortlet: Shortlet | null;
  bookingForm: BookingForm;
  onBookingFormChange: (form: BookingForm) => void;
  onBookingSubmit: () => void;
  onClose: () => void;
}

export default function BookingModal({
  isOpen,
  selectedShortlet,
  bookingForm,
  onBookingFormChange,
  onBookingSubmit,
  onClose
}: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen || !selectedShortlet) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedShortlet) {
      console.error('No selected shortlet');
      return;
    }
    
    console.log('Starting booking submission...');
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // EmailJS configuration
    const serviceId = 'service_gmx0l6n';
    const templateId = 'template_oqt7v55';
    const publicKey = 'ZUW_svgen2b3a2GG2';
    
    try {
      console.log('EmailJS credentials configured');
      
      // Template parameters for the email
      const templateParams = {
        to_email: 'gidzdaquan@gmail.com',
        property_name: selectedShortlet.name,
        property_location: selectedShortlet.location,
        property_price: `${selectedShortlet.price}/night`,
        guest_name: bookingForm.name,
        guest_email: bookingForm.email,
        guest_phone: bookingForm.phone || 'Not provided',
        check_in: bookingForm.checkIn,
        check_out: bookingForm.checkOut,
        guests: bookingForm.guests,
        subject: `Booking Request - ${selectedShortlet.name}`,
        reply_to: bookingForm.email
      };
      
      console.log('Template parameters:', templateParams);
      
      // Validate EmailJS credentials
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS credentials not properly configured');
      }
      
      console.log('Sending email via EmailJS...');
      
      // Send email using EmailJS with timeout
      const emailPromise = emailjs.send(serviceId, templateId, templateParams, publicKey);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout')), 30000)
      );
      
      const result = await Promise.race([emailPromise, timeoutPromise]);
      
      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      
      // Optional: Call onBookingSubmit for any additional logic (e.g., analytics)
      onBookingSubmit();
      
      // Reset isSubmitting after success message is shown
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('idle');
      }, 1000);
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('EmailJS Error Details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        serviceId,
        templateId
      });
      
      setSubmitStatus('error');
      setIsSubmitting(false);
      
      // Show specific error message
      let errorMessage = 'Failed to send booking request. ';
      
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage += 'The request timed out. Please try again.';
        } else if (error.message.includes('credentials')) {
          errorMessage += 'Email service configuration error. Please contact support.';
        } else {
          errorMessage += `Error: ${error.message}`;
        }
      } else {
        errorMessage += 'Please check your internet connection and try again.';
      }
      
      // You can show this errorMessage in the UI if needed
      console.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full animate-fadeInUp max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Book {selectedShortlet.name}</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-gradient-to-r from-lime-400 to-green-400 rounded-xl p-4 text-white mb-4">
            <h4 className="text-lg font-semibold">{selectedShortlet.name}</h4>
            <p className="opacity-90">{selectedShortlet.location}</p>
            <p className="text-sm opacity-75 mt-1">
              ${selectedShortlet.price}/night • {selectedShortlet.rating}★ ({selectedShortlet.reviews} reviews)
            </p>
          </div>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-4 mb-6"
        >
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Booking Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"  // Added name attribute for mailto data
                value={bookingForm.name}
                onChange={(e) => onBookingFormChange({...bookingForm, name: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"  // Added name attribute
                value={bookingForm.email}
                onChange={(e) => onBookingFormChange({...bookingForm, email: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"  // Added name attribute
              value={bookingForm.phone}
              onChange={(e) => onBookingFormChange({...bookingForm, phone: e.target.value})}
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Check-in *</label>
              <input
                type="date"
                name="checkIn"  // Added name attribute
                value={bookingForm.checkIn}
                onChange={(e) => onBookingFormChange({...bookingForm, checkIn: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Check-out *</label>
              <input
                type="date"
                name="checkOut"  // Added name attribute
                value={bookingForm.checkOut}
                onChange={(e) => onBookingFormChange({...bookingForm, checkOut: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Guests</label>
              <select 
                name="guests"  // Added name attribute
                value={bookingForm.guests}
                onChange={(e) => onBookingFormChange({...bookingForm, guests: Number(e.target.value)})}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1,2,3,4,5,6,7,8].map((num: number) => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional hidden inputs for additional data if needed */}
          <input type="hidden" name="shortletName" value={selectedShortlet.name} />
          <input type="hidden" name="location" value={selectedShortlet.location} />
          <input type="hidden" name="pricePerNight" value={selectedShortlet.price} />

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl">
              ✅ Booking request sent successfully!
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              ❌ Failed to send booking request. Please try again or contact support.
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="flex-1 btn-primary py-3 rounded-xl text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : submitStatus === 'success' ? (
                'Sent Successfully'
              ) : (
                'Send Booking Request'
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-slate-500 text-center">
          Your booking request will be sent directly to the property manager via email for immediate processing.
        </div>
        
        {/* Debug test button - remove in production */}
        <div className="mt-2 text-xs text-gray-400 text-center border-t pt-2">
          <button 
            type="button"
            onClick={async () => {
              console.log('Testing EmailJS connection...');
              try {
                const result = await emailjs.send('service_gmx0l6n', 'template_oqt7v55', {
                  to_email: 'gidzdaquan@gmail.com',
                  test_message: 'Test email from AzulHomes'
                }, 'ZUW_svgen2b3a2GG2');
                console.log('✅ EmailJS test successful:', result);
                alert('EmailJS test successful! Check your email.');
              } catch (error) {
                console.error('❌ EmailJS test failed:', error);
                alert('EmailJS test failed. Check console for details.');
              }
            }}
            className="text-red-400 underline hover:text-red-300"
          >
            {/* Test EmailJS */}
          </button>
        </div>
      </div>
    </div>
  );
}