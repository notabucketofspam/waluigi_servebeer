// Tell TypeScript that ANY import ending in ?raw returns a standard string
declare module '*?raw' {
  const content: string;
  export default content;
}

// While we are here, let's add ?inline just in case you ever need it again
declare module '*?inline' {
  const content: string;
  export default content;
}
