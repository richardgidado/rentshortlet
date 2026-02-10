import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Starting contact form submission...');
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // EmailJS configuration - same as BookingModal
    const serviceId = 'service_gmx0l6n';
    const templateId = 'template_oqt7v55';
    const publicKey = 'ZUW_svgen2b3a2GG2';
    
    try {
      console.log('EmailJS credentials configured for contact form');
      
      // Template parameters for the contact email (using booking template variables)
      const templateParams = {
        to_email: 'gidzdaquan@gmail.com',
        property_name: `Contact Message from ${formData.name}`,
        property_location: 'General Inquiry',
        property_price: 'Contact Form',
        guest_name: formData.name,
        guest_email: formData.email,
        guest_phone: formData.message, // Store the contact message here
        check_in: 'N/A',
        check_out: 'N/A',
        guests: 1,
        subject: `Contact Form - ${formData.name}`,
        reply_to: formData.email
      };
      
      console.log('Template parameters:', templateParams);
      
      // Validate EmailJS credentials
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS credentials not properly configured');
      }
      
      console.log('Sending contact email via EmailJS...');
      
      // Send email using EmailJS with timeout
      const emailPromise = emailjs.send(serviceId, templateId, templateParams, publicKey);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout')), 30000)
      );
      
      const result = await Promise.race([emailPromise, timeoutPromise]);
      
      console.log('Contact email sent successfully:', result);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset isSubmitting after success message is shown
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('idle');
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
      let errorMessage = 'Failed to send contact message. ';
      
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
      
      console.error(errorMessage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-slate-600">
            Get in touch with our team for any questions or assistance
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-18">Get in Touch</h3>
              <div className="space-y-4 ">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9FCC2E'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-600">gidzdaquan@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9FCC2E'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-slate-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9FCC2E'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-slate-600">123 Business Ave, Suite 100<br />Miami, FL 33101</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent" style={{"--tw-ring-color": "#9FCC2E"} as any}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent" style={{"--tw-ring-color": "#9FCC2E"} as any}
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent" style={{"--tw-ring-color": "#9FCC2E"} as any}
                    required
                  ></textarea>
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl">
                    ✅ Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                    ❌ Failed to send your message. Please try again or contact support.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full btn-primary py-3 rounded-xl text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : submitStatus === 'success' ? (
                    'Message Sent Successfully'
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
              
              <div className="mt-4 text-xs text-slate-500 text-center">
                Your message will be sent directly to our team via email for immediate response.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}