import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] px-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-white/10 text-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300 mb-6 text-center">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-sky-200 mb-2">Quais são as opções de hospedagem?</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Nós oferecemos opções que vão de hotéis de luxo a apartamentos e hostels para todos os orçamentos.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sky-200 mb-2">Como faço para fazer a reserva?</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Basta preencher o formulário na página do destino e nossa equipe entrará em contato para confirmar os detalhes da sua reserva.
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="mt-8 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors font-medium border border-white/10"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
