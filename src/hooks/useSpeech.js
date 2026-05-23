import { useState } from 'react';

export const useSpeech = () => {
  const [escuchando, setEscuchando] = useState(false);

  const escucharVoz = (onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Navegador no compatible con voz.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;

    recognition.onstart = () => setEscuchando(true);
    recognition.onresult = (event) => {
      onResult(event.results[0][0].transcript);
      setEscuchando(false);
    };
    recognition.onerror = () => setEscuchando(false);
    recognition.onend = () => setEscuchando(false);
    
    recognition.start();
  };

  const hablarTexto = (texto, idioma = 'es-ES') => {
    if (!texto) return;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = idioma;
    window.speechSynthesis.speak(utterance);
  };

  return { escuchando, escucharVoz, hablarTexto };
};