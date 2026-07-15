/// <reference types="vite/client" />

declare module '98.css?raw' {
  const content: string;
  export default content;
}

// Keep generic handlers too
declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*?inline' {
  const content: string;
  export default content;
}


/**Here's a list of all of the DOM elements that are expected to exist on the page*/
interface LivekitDOMElements {
  "loadactiverooms": HTMLButtonElement;
  "leave-btn": HTMLButtonElement;
  "join-btn": HTMLButtonElement;
  "room-list-container": HTMLDivElement;
  "participant-list": HTMLUListElement;
  "lobby-view": HTMLDivElement;
  "active-call-view": HTMLDivElement;
  "roomcode-input": HTMLInputElement;
  "audio-container": HTMLDivElement;
  "current-room-title": HTMLSpanElement;
}

/**some extraneous DOM elements*/
interface ExtraneousDOMElements {
  "livekit-platter": HTMLDivElement;
  "everyone-is-here": HTMLDivElement;
}

/**and some stuff that is created by this module*/
interface CreatedDOMElements {
  "metallik": HTMLMetaElement;
}

