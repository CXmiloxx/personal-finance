/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiSend, FiX, FiTrash2 } from 'react-icons/fi';

export default function TransactionForm({ onSubmit, initialData, onCancel }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcript, setTranscript] = useState(initialData?.message || '');
  const recognitionRef = useRef(null);

  // Verificar si el navegador soporta reconocimiento de voz
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const startRecording = () => {
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece;
        } else {
          interimTranscript += transcriptPiece;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleClear = () => {
    setTranscript('');
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleSend = async () => {
    if (!transcript.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ message: transcript.trim() });
      onCancel();
    } catch (error) {
      console.error('Error al guardar la transacción:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col h-[400px] max-h-[70vh] bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 flex flex-col justify-center items-center mb-6">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center mb-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="animate-pulse text-red-500">
                  <FiMic className="w-7 h-7" />
                </span>
                <span className="text-blue-700 dark:text-blue-200 font-semibold">
                  Escuchando...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full">
          <textarea
            className="w-full min-h-[120px] max-h-[200px] resize-none rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-lg text-gray-900 dark:text-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Habla o escribe aquí tu transacción..."
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            disabled={isSubmitting}
            spellCheck={false}
            autoFocus
          />
        </div>
        <div className="flex w-full justify-end mt-2">
          {transcript && (
            <motion.button
              type="button"
              onClick={handleClear}
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition shadow-sm"
              title="Limpiar texto"
            >
              <FiTrash2 className="w-4 h-4" />
              Limpiar
            </motion.button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-blue-100 dark:border-gray-700 pt-4">
        <motion.button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm
            ${isRecording
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          disabled={isSubmitting}
        >
          {isRecording ? (
            <>
              <FiMicOff className="w-5 h-5" />
              Detener
            </>
          ) : (
            <>
              <FiMic className="w-5 h-5" />
              Grabar
            </>
          )}
        </motion.button>
        <motion.button
          type="button"
          onClick={handleSend}
          disabled={isSubmitting || !transcript.trim()}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSend className="w-5 h-5" />
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </motion.button>
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="ml-auto flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-semibold transition-colors shadow-sm"
        >
          <FiX className="w-5 h-5" />
          Cancelar
        </motion.button>
      </div>
    </motion.div>
  );
}