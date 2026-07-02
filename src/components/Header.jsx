import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark py-4 px-6 border-b-0 border-white/10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center gap-2 group">
          <Plane className="text-sky-400 transform group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-colors">
            TravelPlanner
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
          <a href="/#destinos" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Destinos</a>
        </nav>
      </div>
    </header>
  );
}
