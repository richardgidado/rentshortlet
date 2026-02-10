export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold gradient-text">AZUL HOMES</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#shortlets" className="text-slate-600 hover:text-lime-600 transition-colors">Shortlets</a>
            <a href="#about" className="text-slate-600 hover:text-lime-600 transition-colors">About</a>
            <a href="#contact" className="text-slate-600 hover:text-lime-600 transition-colors">Contact</a>
            <a href="/admin" className="btn-primary px-6 py-2 rounded-full text-white font-medium">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}