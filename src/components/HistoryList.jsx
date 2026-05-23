export const HistoryList = ({ historial, alSeleccionarItem }) => {
  if (historial.length === 0) return null;

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginTop: '20px', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#1a1a1a' }}>🕒 Últimas 5 Traducciones (Toca para restaurar)</h3>
      {historial.map((item) => (
        <div 
          key={item.id} 
          onClick={() => alSeleccionarItem(item)}
          style={{ borderBottom: '1px solid #f1f2f6', paddingBottom: '12px', marginBottom: '12px', cursor: 'pointer', transition: 'background 0.2s', borderRadius: '8px', padding: '8px' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#a4b0be', fontWeight: 'bold' }}>{item.langOrigen} ➔ {item.langDestino}</p>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#2f3542' }}>{item.origen}</p>
          <p style={{ margin: '0', color: '#007aff', fontSize: '14px', fontWeight: '500' }}>{item.destino}</p>
        </div>
      ))}
    </div>
  );
};