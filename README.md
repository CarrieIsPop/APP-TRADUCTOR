# 🌐 Traductor IA PWA (React + Vite)

Una Aplicación Web Progresiva (PWA) de traducción inteligente y en tiempo real. Este proyecto captura texto escrito o dictado por voz, lo traduce utilizando el modelo más avanzado de **Google Gemini AI** (gemini-3.5-flash), y permite escuchar la traducción con la pronunciación y acento nativo correcto.

## ✨ Características Principales (Features)

* **🎙️ Entrada Inteligente de Voz:** Integración nativa de `Web Speech API` para dictado en tiempo real sin librerías de terceros.
* **🧠 Traducción Contextual IA:** Potenciado por el SDK de Google Generative AI, asegurando traducciones perfectas con gramática y puntuación correcta, no solo traducciones literales.
* **🔊 Síntesis de Voz Nativa:** Reproducción del texto traducido con el acento exacto del idioma destino usando `speechSynthesis`.
* **💾 Historial Offline:** Guarda automáticamente las últimas 5 traducciones en el `LocalStorage` del dispositivo. Un toque restaura la traducción completa.
* **📱 PWA Ready:** Diseño *card-based* responsivo, instalable en cualquier dispositivo móvil o de escritorio como una aplicación nativa (funciona offline en su capa visual).

## 🛠️ Tecnologías Utilizadas

* **Core:** React.js, JavaScript moderno (ES6+), HTML5, CSS3.
* **Build Tool:** Vite (con React Compiler preconfigurado).
* **PWA:** `vite-plugin-pwa` para generación de Service Workers y Manifest.
* **Inteligencia Artificial:** `@google/generative-ai` (Gemini 3.5 Flash).