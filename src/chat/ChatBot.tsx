import { useEffect, useRef } from "react";

export const ChatBot = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Inicializando Chatbot de San Juan Tahitic...");

    // Eliminar cualquier instancia previa del chatbot si recargas o cambias de ruta
    const existingChatbot = document.querySelector('df-messenger');
    if (existingChatbot) existingChatbot.remove();

    // Crear el elemento del chatbot
    const dfMessenger = document.createElement('df-messenger');
    dfMessenger.setAttribute('intent','WELCOME');
    dfMessenger.setAttribute('chat-title', 'ChatBot San Juan Tahitic');
    dfMessenger.setAttribute('agent-id', 'cffb89d6-39c8-4cd1-995b-811e3f753ec6');
    dfMessenger.setAttribute('language-code', 'es'); // o 'nah' si tu agente lo soporta
    dfMessenger.setAttribute('chat-icon', '/images/icon-chatbot.svg'); // 👈 tu ícono personalizado completo (transparente o redondo)
    dfMessenger.setAttribute('chat-opening-text', '¡Tlazocamatl! ¿Ken timotazneki? Nimitzmacas tlatolmej ipan San Juan Tahitic.');
    dfMessenger.setAttribute('wait-open', 'true');
    dfMessenger.setAttribute('max-query-length', '-1');
    

    // Añadir al contenedor
    if (chatContainerRef.current) {
      chatContainerRef.current.appendChild(dfMessenger);
      console.log("Chatbot insertado en el DOM");
    }

    // Cargar el script del widget si no existe
    let script = document.querySelector('script[src*="dialogflow-console"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      script.onload = () => console.log("Dialogflow Messenger cargado correctamente");
      document.body.appendChild(script);
    }

    // Limpieza
    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={chatContainerRef}
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        background: "linear-gradient(to bottom right, #ecfdf5, #fef3c7)",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px", color: "#781d04", fontWeight: 600 }}>
        Cargando ChatBot...
      </div>
    </div>
  );
};
