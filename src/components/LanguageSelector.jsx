export const LanguageSelector = ({ idiomaOrigen, setIdiomaOrigen, idiomaDestino, setIdiomaDestino, codigos }) => {
  return (
    <div className="flex gap-3 mb-4 items-center">
      <select 
        value={idiomaOrigen} 
        onChange={(e) => setIdiomaOrigen(e.target.value)}
        className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        {Object.keys(codigos).map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </select>
      <span className="text-xl text-gray-400 dark:text-gray-500">➔</span>
      <select 
        value={idiomaDestino} 
        onChange={(e) => setIdiomaDestino(e.target.value)}
        className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        {Object.keys(codigos).map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </select>
    </div>
  );
};