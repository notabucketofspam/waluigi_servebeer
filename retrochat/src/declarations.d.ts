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

