import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DestinationCard({ destino, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl glass transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(138,180,248,0.3)]"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={destino.imagem} 
          alt={destino.nome} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
          <MapPin size={14} className="text-sky-400" />
          <span className="text-xs font-medium text-white">{destino.nome.split(',')[0]}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
          {destino.nome}
        </h3>
        <p className="text-sm text-gray-300 mb-6 line-clamp-2">
          {destino.descricao}
        </p>
        
        <Link 
          to={`/destination/${destino.id}`}
          className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-white/10 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg"
        >
          Planejar Viagem
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
