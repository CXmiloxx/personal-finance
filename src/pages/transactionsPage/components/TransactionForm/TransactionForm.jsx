/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiSend, FiX, FiTrash2 } from 'react-icons/fi';

export default function TransactionForm({ onSubmit, initialData, onCancel }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcript, setTranscript] = useState(initialData?.message || '');
  const [hasRecorded, setHasRecorded] = useState(false);
  const recognitionRef = useRef(null);

  // Verificar si el navegador soporta reconocimiento de voz
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const startRecording = () => {
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }
    setTranscript('');
    setHasRecorded(false);
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.continuous = true;

    let finalTranscript = '';
    recognition.onresult = (event) => {
      let interimTranscript = '';
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
      setHasRecorded(true);
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
    setHasRecorded(true);
  };

  const handleClear = () => {
    setTranscript('');
    setHasRecorded(false);
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
      className="flex flex-col h-[440px] max-h-[75vh] bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-8 border border-blue-200 dark:border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 flex flex-col justify-center items-center mb-6 w-full">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center mb-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="animate-pulse text-red-500 drop-shadow-lg">
                  <FiMic className="w-10 h-10" />
                </span>
                <span className="text-blue-800 dark:text-blue-200 font-bold text-lg tracking-wide">
                  Escuchando...
                </span>
              </div>
              <div className="w-full text-center text-xs text-gray-500 dark:text-gray-400">
                Habla claramente para registrar tu transacción
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full relative">
          <textarea
            className={`w-full min-h-[120px] max-h-[200px] resize-none rounded-2xl border-2 ${
              isRecording
                ? 'border-red-400 ring-2 ring-red-300'
                : 'border-blue-200 dark:border-gray-700'
            } bg-white dark:bg-gray-800 p-4 text-lg text-gray-900 dark:text-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:italic`}
            placeholder="Habla o escribe aquí tu transacción..."
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            disabled={isSubmitting || isRecording}
            spellCheck={false}
            autoFocus
          />
          {isRecording && (
            <div className="absolute top-2 right-4 flex items-center gap-1 text-xs text-red-500 font-semibold animate-pulse">
              <FiMic className="w-4 h-4" />
              Grabando...
            </div>
          )}
        </div>
        <div className="flex w-full justify-between mt-3">
          {transcript && (
            <motion.button
              type="button"
              onClick={handleClear}
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition shadow-sm"
              title="Limpiar texto"
              disabled={isRecording || isSubmitting}
            >
              <FiTrash2 className="w-4 h-4" />
              Limpiar
            </motion.button>
          )}
          <div className="flex-1" />
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-blue-100 dark:border-gray-700 pt-6">
        <motion.button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-md text-base
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
          disabled={
            isSubmitting ||
            isRecording ||
            !transcript.trim()
          }
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-md text-base
            ${
              isRecording
                ? 'bg-blue-300 text-white opacity-60 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <FiSend className="w-5 h-5" />
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </motion.button>
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="ml-auto flex items-center gap-2 px-5 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-semibold transition-colors shadow-md text-base"
        >
          <FiX className="w-5 h-5" />
          Cancelar
        </motion.button>
      </div>
    </motion.div>
  );
}