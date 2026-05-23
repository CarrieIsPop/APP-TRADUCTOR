export const LanguageSelector = ({ idiomaOrigen, setIdiomaOrigen, idiomaDestino, setIdiomaDestino, codigos }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
      <select 
        value={idiomaOrigen} 
        onChange={(e) => setIdiomaOrigen(e.target.value)}
        style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f8f9fa', fontSize: '15px', outline: 'none' }}
      >
        {Object.keys(codigos).map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </select>
      <span style={{ fontSize: '20px', color: '#a0a0a0' }}>➔</span>
      <select 
        value={idiomaDestino} 
        onChange={(e) => setIdiomaDestino(e.target.value)}
        style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f8f9fa', fontSize: '15px', outline: 'none' }}
      >
        {Object.keys(codigos).map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </select>
    </div>
  );
};