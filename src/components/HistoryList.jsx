export const HistoryList = ({ historial, alSeleccionarItem }) => {
  if (historial.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 shadow-xl mt-5 transition-colors duration-300">
      <h3 className="m-0 mb-4 text-base text-gray-900 dark:text-white font-bold">🕒 Últimas Traducciones</h3>
      {historial.map((item) => (
        <div 
          key={item.id} 
          onClick={() => alSeleccionarItem(item)}
          className="border-b border-gray-100 dark:border-gray-700 pb-3 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
        >
          <p className="m-0 mb-1 text-xs text-gray-400 dark:text-gray-500 font-bold">{item.langOrigen} ➔ {item.langDestino}</p>
          <p className="m-0 mb-1 text-sm text-gray-800 dark:text-gray-200">{item.origen}</p>
          <p className="m-0 text-sm text-blue-500 dark:text-blue-400 font-medium">{item.destino}</p>
        </div>
      ))}
    </div>
  );
};