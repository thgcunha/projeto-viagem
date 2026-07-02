import { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowLeft, Send } from 'lucide-react';
import { destinations } from '../data/destinations';
import FAQModal from '../components/FAQModal';

export default function Destination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destino = destinations.find(d => d.id === id);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  // Form State
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataRetorno, setDataRetorno] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState(1);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!destino) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nome || !dataInicio || !dataRetorno || !email) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    const start = new Date(dataInicio);
    const end = new Date(dataRetorno);

    if (start >= end) {
      setErrorMessage('A data de retorno deve ser posterior à data de início.');
      return;
    }

    // Se passou na validação, navega para o checkout passando os dados
    navigate('/checkout', {
      state: {
        destino,
        nome,
        dataInicio,
        dataRetorno,
        numeroPessoas,
        email
      }
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Media */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover hidden sm:block scale-105 animate-[pulse_20s_ease-in-out_infinite]"
        >
          <source src={destino.video} type="video/mp4" />
        </video>
        <img 
          src={destino.imagem} 
          alt={destino.nome} 
          className="absolute top-0 left-0 w-full h-full object-cover block sm:hidden" 
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 pt-24 pb-12 min-h-screen flex flex-col items-center">
        
        {/* Floating FAQ Button */}
        <button 
          onClick={() => setIsFAQOpen(true)}
          className="fixed top-24 right-6 p-3 bg-sky-500 hover:bg-sky-400 text-white rounded-full shadow-[0_0_20px_rgba(56,189,248,0.4)] backdrop-blur-sm transition-all hover:scale-110 z-40 border border-sky-400/30"
          aria-label="Perguntas Frequentes"
        >
          <HelpCircle size={28} />
        </button>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-2xl animate-glow mb-6 leading-tight">
            {destino.title}
          </h1>
          
          <div className="glass p-6 md:p-8 rounded-2xl mt-4">
            <h2 className="text-2xl font-semibold text-sky-300 mb-4">Sobre a Viagem</h2>
            <p className="text-lg leading-relaxed text-gray-200">
              {destino.sobre}
            </p>
          </div>
        </motion.div>

        {/* Reservation Form */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md glass-dark p-8 rounded-3xl shadow-2xl border border-white/10 relative"
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Reserve sua viagem</h2>

            {/* Error Message Tooltip */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/90 text-white text-sm p-3 rounded-lg text-center mb-4 border border-red-400 backdrop-blur-sm shadow-lg"
              >
                {errorMessage}
              </motion.div>
            )}

            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
              <input 
                type="text" 
                id="nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João da Silva"
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="data_inicio" className="block text-sm font-medium text-gray-300 mb-1">Data de Início</label>
                <input 
                  type="date" 
                  id="data_inicio" 
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="data_retorno" className="block text-sm font-medium text-gray-300 mb-1">Data de Retorno</label>
                <input 
                  type="date" 
                  id="data_retorno" 
                  value={dataRetorno}
                  onChange={(e) => setDataRetorno(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="numero_pessoas" className="block text-sm font-medium text-gray-300 mb-1">Número de Pessoas</label>
              <select 
                id="numero_pessoas"
                value={numeroPessoas}
                onChange={(e) => setNumeroPessoas(Number(e.target.value))}
                className="w-full p-3 bg-[#1a1f2e] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all outline-none"
              >
                {[1,2,3,4,5,6,7].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Pessoa' : 'Pessoas'}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com" 
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all outline-none placeholder:text-gray-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 p-4 mt-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:-translate-y-1"
            >
              <Send size={18} />
              Enviar Reserva
            </button>
          </form>
        </motion.section>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Link to="/">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:-translate-x-1">
              <ArrowLeft size={18} />
              Voltar para Home
            </button>
          </Link>
        </motion.div>
      </div>

      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
    </div>
  );
}
