import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative z-20 py-8 mt-auto border-t border-white/10 glass-dark">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <p className="text-sm text-gray-400 mb-6 text-center">
          &copy; 2025 Desenvolvido por Thiago Gonçalves. Todos os direitos reservados.
        </p>
        
        <div className="flex space-x-6">
          <a 
            href="https://wa.me/6284536469" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
          <a 
            href="https://github.com/thgcunha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/thiagogcunha/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
