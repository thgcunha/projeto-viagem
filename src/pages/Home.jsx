import { motion } from 'framer-motion';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import { Plane, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover hidden sm:block"
          >
            <source src="https://cdn.coverr.co/videos/coverr-airplane-flying-through-the-clouds-1025/720p.mp4" type="video/mp4" />
          </video>
          <img 
            src="https://w.wallhaven.cc/full/2y/wallhaven-2y5jv9.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover block sm:hidden"
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center justify-center p-4 mb-6 rounded-full glass border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <Plane className="text-sky-400 w-8 h-8 md:w-10 md:h-10 animate-bounce-slow" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Descubra o Seu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-200 animate-glow">
              Próximo Destino
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Planeje viagens inesquecíveis com pacotes exclusivos para os destinos mais cobiçados do mundo.
          </motion.p>

          <motion.a 
            href="#destinos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:-translate-y-1"
          >
            Explorar Destinos
            <ChevronDown size={20} className="animate-bounce" />
          </motion.a>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinos" className="relative z-20 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Destinos em Destaque</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-transparent mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destino, index) => (
            <DestinationCard key={destino.id} destino={destino} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
