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
  
  const { escuchando, escucharVoz, hablarTexto } = useSpeech();

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('traduccionesIA')) || [];
    setHistorial(datosGuardados);
  }, []);

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
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
        
        <h2 style={{ textAlign: 'center', color: '#1a1a1a', marginTop: '0', marginBottom: '20px', fontSize: '22px' }}>✨ Traductor IA</h2>
        
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
          style={{ width: '100%', height: '100px', padding: '15px', marginBottom: '15px', borderRadius: '16px', border: '1px solid #e0e0e0', boxSizing: 'border-box', resize: 'none', fontSize: '16px', outline: 'none' }}
        />
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => escucharVoz(setTextoOrigen)} 
            style={{ flex: 1, padding: '14px', backgroundColor: escuchando ? '#ff4757' : '#f1f2f6', color: escuchando ? 'white' : '#2f3542', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            {escuchando ? '🎙️...' : '🎤 Dictar'}
          </button>
          
          <button 
            onClick={manejarTraduccion} 
            disabled={traduciendo}
            style={{ flex: 1, padding: '14px', backgroundColor: '#007aff', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 122, 255, 0.3)' }}>
            {traduciendo ? '⏳...' : '✨ Traducir'}
          </button>
        </div>

        <textarea 
          value={textoTraducido}
          readOnly
          placeholder="Aquí aparecerá la traducción..."
          style={{ width: '100%', height: '100px', padding: '15px', backgroundColor: '#f8f9fa', marginBottom: '15px', borderRadius: '16px', border: '1px solid #e0e0e0', boxSizing: 'border-box', resize: 'none', fontSize: '16px', outline: 'none', color: '#2f3542' }}
        />

        <button 
          onClick={() => hablarTexto(textoTraducido, CODIGOS_VOZ[idiomaDestino])}
          style={{ width: '100%', padding: '14px', backgroundColor: '#2ed573', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(46, 213, 115, 0.3)' }}>
          🔊 Escuchar en {idiomaDestino}
        </button>
      </div>

      <HistoryList historial={historial} alSeleccionarItem={restaurarTraduccion} />
      
    </div>
  );
};