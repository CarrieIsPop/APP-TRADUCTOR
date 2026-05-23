import { useState, useEffect } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import { traducirTexto } from '../services/geminiService';
import { LanguageSelector } from '../components/LanguageSelector';
import { HistoryList } from '../components/HistoryList';

const CODIGOS_VOZ = {
  'Español': 'es-ES',
  'Inglés': 'en-US',
  'Francés': 'fr-FR',
  'Portugués': 'pt-BR'
};

export const Home = () => {
  const [textoOrigen, setTextoOrigen] = useState('');
  const [textoTraducido, setTextoTraducido] = useState(''); 
  const [traduciendo, setTraduciendo] = useState(false);
  const [idiomaOrigen, setIdiomaOrigen] = useState('Español');
  const [idiomaDestino, setIdiomaDestino] = useState('Francés');
  const [historial, setHistorial] = useState([]);
  
  // Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(false);
  
  const { escuchando, escucharVoz, hablarTexto } = useSpeech();

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('traduccionesIA')) || [];
    setHistorial(datosGuardados);
    
    // Revisar si ya tenía el modo oscuro activado antes
    const temaGuardado = localStorage.getItem('temaIA');
    if (temaGuardado === 'dark') setDarkMode(true);
  }, []);

  // Función para cambiar de tema
  const toggleTheme = () => {
    const nuevoTema = !darkMode;
    setDarkMode(nuevoTema);
    localStorage.setItem('temaIA', nuevoTema ? 'dark' : 'light');
  };

  const manejarTraduccion = async () => {
    if (!textoOrigen) return;
    setTraduciendo(true);
    setTextoTraducido('Traduciendo...');
    
    const resultado = await traducirTexto(textoOrigen, idiomaOrigen, idiomaDestino);
    setTextoTraducido(resultado);
    setTraduciendo(false);

    const nuevaTraduccion = {
      id: Date.now(),
      origen: textoOrigen,
      destino: resultado,
      langOrigen: idiomaOrigen,
      langDestino: idiomaDestino
    };

    const nuevoHistorial = [nuevaTraduccion, ...historial].slice(0, 5);
    setHistorial(nuevoHistorial);
    localStorage.setItem('traduccionesIA', JSON.stringify(nuevoHistorial));
  };

  const restaurarTraduccion = (item) => {
    setIdiomaOrigen(item.langOrigen);
    setIdiomaDestino(item.langDestino);
    setTextoOrigen(item.origen);
    setTextoTraducido(item.destino);
  };

  return (
    // El div principal controla el modo oscuro agregando la clase "dark"
    <div className={`${darkMode ? 'dark' : ''}`}>
      
      {/* Fondo de pantalla */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-5 flex flex-col items-center">
        
        {/* Tarjeta Principal */}
        <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 shadow-xl transition-colors duration-300 relative">
          
          {/* Botón de Tema Absoluto en la esquina */}
          <button 
            onClick={toggleTheme}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <h2 className="text-center text-gray-900 dark:text-white mt-0 mb-6 text-2xl font-bold pr-8">✨ Traductor IA</h2>
          
          <LanguageSelector 
            idiomaOrigen={idiomaOrigen}
            setIdiomaOrigen={setIdiomaOrigen}
            idiomaDestino={idiomaDestino}
            setIdiomaDestino={setIdiomaDestino}
            codigos={CODIGOS_VOZ}
          />
          
          <textarea 
            value={textoOrigen}
            onChange={(e) => setTextoOrigen(e.target.value)}
            placeholder={`Escribe o dicta en ${idiomaOrigen}...`}
            className="w-full h-24 p-4 mb-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          
          <div className="flex gap-3 mb-5">
            <button 
              onClick={() => escucharVoz(setTextoOrigen)} 
              className={`flex-1 p-3 rounded-xl font-bold transition-colors ${escuchando ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              {escuchando ? '🎙️...' : '🎤 Dictar'}
            </button>
            
            <button 
              onClick={manejarTraduccion} 
              disabled={traduciendo}
              className="flex-1 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
            >
              {traduciendo ? '⏳...' : '✨ Traducir'}
            </button>
          </div>

          <textarea 
            value={textoTraducido}
            readOnly
            placeholder="Aquí aparecerá la traducción..."
            className="w-full h-24 p-4 mb-5 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white resize-none outline-none transition-colors"
          />

          <button 
            onClick={() => hablarTexto(textoTraducido, CODIGOS_VOZ[idiomaDestino])}
            className="w-full p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
          >
            🔊 Escuchar en {idiomaDestino}
          </button>
        </div>

        <HistoryList historial={historial} alSeleccionarItem={restaurarTraduccion} />
        
      </div>
    </div>
  );
};