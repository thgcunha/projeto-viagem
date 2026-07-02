import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, CheckCircle, ArrowLeft, Armchair } from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  const [linhaAerea, setLinhaAerea] = useState('');
  const [classeViagem, setClasseViagem] = useState('');
  const [bagagemExtra, setBagagemExtra] = useState(false);
  const [precoTotal, setPrecoTotal] = useState(0);

  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [assentoSelecionado, setAssentoSelecionado] = useState(null);
  const [erroAssento, setErroAssento] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  const ocupados = [3, 6, 12, 18];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.state) {
      navigate('/');
    } else {
      setFormData(location.state);
    }
  }, [location, navigate]);

  useEffect(() => {
    let base = 0;
    switch (linhaAerea) {
      case 'LATAM': base += 500; break;
      case 'Gol': base += 480; break;
      case 'Azul': base += 520; break;
      case 'United Airlines': base += 800; break;
      case 'Emirates': base += 1200; break;
    }
    switch (classeViagem) {
      case 'Economica': base += 0; break;
      case 'Executiva': base += 400; break;
      case 'Primeira Classe': base += 1000; break;
    }
    if (bagagemExtra) {
      base += 150;
    }
    setPrecoTotal(base);
  }, [linhaAerea, classeViagem, bagagemExtra]);

  if (!formData) return null;

  const handleConfirmarReserva = () => {
    if (!assentoSelecionado) {
      setErroAssento(true);
      return;
    }
    setErroAssento(false);
    setReservaConfirmada(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto glass-dark p-8 rounded-3xl shadow-2xl border border-white/10"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">
              Detalhes da Sua Viagem
            </h1>
            <p className="text-sm text-gray-400 mt-2">Personalize o seu voo para {formData.destino.nome}</p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-sm font-medium mb-2 text-gray-300">Escolha a Linha Aérea</label>
              <select 
                value={linhaAerea}
                onChange={(e) => setLinhaAerea(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition-all outline-none"
              >
                <option value="" className="bg-gray-800">Selecione uma companhia</option>
                <option value="LATAM" className="bg-gray-800">LATAM</option>
                <option value="Gol" className="bg-gray-800">Gol</option>
                <option value="Azul" className="bg-gray-800">Azul</option>
                <option value="United Airlines" className="bg-gray-800">United Airlines</option>
                <option value="Emirates" className="bg-gray-800">Emirates</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium mb-2 text-gray-300">Classe de Viagem</label>
              <select 
                value={classeViagem}
                onChange={(e) => setClasseViagem(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition-all outline-none"
              >
                <option value="" className="bg-gray-800">Selecione uma classe</option>
                <option value="Economica" className="bg-gray-800">Econômica</option>
                <option value="Executiva" className="bg-gray-800">Executiva</option>
                <option value="Primeira Classe" className="bg-gray-800">Primeira Classe</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="bagagem_extra"
                checked={bagagemExtra}
                onChange={(e) => setBagagemExtra(e.target.checked)}
                className="w-5 h-5 rounded border-gray-600 text-sky-500 focus:ring-sky-500 bg-white/5"
              />
              <label htmlFor="bagagem_extra" className="text-sm text-gray-300">Adicionar bagagem extra (+ R$ 150,00)</label>
            </div>

            <div className="py-4 border-t border-b border-white/10 my-6 text-center">
              <p className="text-sm text-gray-400 mb-1">Total Estimado</p>
              <div className="text-3xl font-bold text-green-400">
                R$ {precoTotal.toFixed(2).replace('.', ',')}
              </div>
            </div>

            <button 
              onClick={() => setIsSeatModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 p-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              <Armchair size={20} />
              Selecionar Assento
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <Link to={`/destination/${formData.destino.id}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              Voltar
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Seat Selection Modal */}
      <AnimatePresence>
        {isSeatModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[100] px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass border border-white/10 text-white rounded-3xl p-6 sm:p-8 w-full max-w-md relative shadow-2xl"
            >
              {!reservaConfirmada && (
                <button 
                  onClick={() => setIsSeatModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              )}
              
              <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">
                {reservaConfirmada ? "Reserva Confirmada!" : "Escolha seu Assento"}
              </h2>

              {!reservaConfirmada ? (
                <>
                  <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-2 justify-center mb-6">
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((num) => {
                      const isOcupado = ocupados.includes(num);
                      const isSelecionado = assentoSelecionado === num;
                      const isCorredor = (num - 1) % 6 === 3;
                      
                      return (
                        <div key={num} className="contents">
                          {isCorredor && <div className="w-2 sm:w-4"></div>}
                          <button
                            disabled={isOcupado}
                            onClick={() => {
                              setAssentoSelecionado(num);
                              setErroAssento(false);
                            }}
                            className={`p-2 rounded-lg text-xs font-bold transition-all relative group
                              ${isOcupado ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50' : 
                                isSelecionado ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.6)] ring-2 ring-green-300 transform scale-110' : 
                                'bg-sky-900 text-sky-100 hover:bg-sky-600 hover:shadow-lg hover:-translate-y-1'}
                            `}
                          >
                            A{num}
                            {!isOcupado && !isSelecionado && (
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none">
                                Selecionar
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {erroAssento && (
                    <p className="text-red-400 text-sm text-center mb-4 animate-pulse">Por favor, selecione um assento.</p>
                  )}

                  <button 
                    onClick={handleConfirmarReserva}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold rounded-xl transition-all shadow-lg"
                  >
                    Confirmar Assento
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="text-green-400 w-10 h-10" />
                  </motion.div>
                  <p className="text-lg text-gray-200 mb-2">Tudo certo com sua viagem, <strong>{formData.nome}</strong>!</p>
                  <p className="text-sm text-gray-400 mb-8">O assento <strong>A{assentoSelecionado}</strong> foi reservado para você.</p>
                  
                  <Link 
                    to="/"
                    className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300"
                  >
                    Voltar ao Início
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
