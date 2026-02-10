export default function AboutSection() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, imageSrc: string) => {
    console.log(`Image failed to load: ${imageSrc}`);
    e.currentTarget.style.display = 'none';
  };

  const handleImageLoad = (imageSrc: string) => {
    console.log(`Image loaded: ${imageSrc}`);
  };

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About GIDADO HOMES
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Your Gateway to Extraordinary Stays
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              At &nbsp; <span className='gradient-text'>GIDADO HOMES </span>, we believe that every journey deserves an exceptional home base. 
              Our carefully curated collection of shortlet accommodations ensures that whether 
              you're traveling for business or leisure, you'll find a perfect space that feels 
              just like home.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              From oceanfront villas to urban penthouses, each property is personally inspected 
              and verified to meet our high standards of quality, comfort, and style.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">6+</p>
                <p className="text-slate-600">Properties</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">1+</p>
                <p className="text-slate-600">Cities</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">98%</p>
                <p className="text-slate-600">Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 h-96">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/image1.jpg"
                alt="AZUL HOMES Property 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => handleImageError(e, '/image1.jpg')}
                onLoad={() => handleImageLoad('/image1.jpg')}
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/image2.jpg"
                alt="AZUL HOMES Property 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => handleImageError(e, '/image2.jpg')}
                onLoad={() => handleImageLoad('/image2.jpg')}
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/image3.jpg"
                alt="AZUL HOMES Property 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => handleImageError(e, '/image3.jpg')}
                onLoad={() => handleImageLoad('/image3.jpg')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}