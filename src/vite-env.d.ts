/// <reference types="vite/client" />

// Extender los elementos intrínsecos de JSX para DialogFlow
declare namespace JSX {
  interface IntrinsicElements {
    'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'chat-title'?: string;
      'agent-id'?: string;
      'language-code'?: string;
      'max-query-length'?: number;
      'request-timeout-ms'?: number;
    };
  }
}