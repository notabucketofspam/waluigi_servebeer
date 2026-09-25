function inlineComputedStyles(source:HTMLElement, target:HTMLElement) {
  const computed = window.getComputedStyle(source);
  for (let i = 0; i < computed.length; i++) {
    const prop = computed[i];
    if (prop) {
      target.style[prop as any] = computed.getPropertyValue(prop);
    }
  }
  // Repeat for all children
  Array.from(source.children).forEach((child, index) => {
    if (child instanceof HTMLElement && target.children[index] instanceof HTMLElement) {
      inlineComputedStyles(child, target.children[index]);
    }
  });
}
/**good ol' gemini. always writing things that somehow sometimes do things correctly.*/
async function handleCopyCenter(target_id:string) {
  try {
    const sourceNode = document.getElementById(target_id);
    if (!sourceNode) return;
    const rect = sourceNode.getBoundingClientRect();

    // 1. Clone the node and inline its computed styles
    const clone = sourceNode.cloneNode(true) as HTMLElement;
    inlineComputedStyles(sourceNode, clone);

    // Ensure the clone has no margins that might push it out of the SVG box
    clone.style.margin = '0';

    // 2. Wrap the HTML inside an SVG <foreignObject>
    // We must explicitly declare the xhtml namespace for the HTML content
    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${clone.outerHTML}
            </div>
          </foreignObject>
        </svg>
      `;

    // 3. Convert SVG string to a Blob URL instead of a Data URI
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // 4. Load the SVG into an Image object
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        // Crucial: Release the memory once the image is loaded
        URL.revokeObjectURL(svgUrl);
        resolve();
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(svgUrl);
        reject(new Error('Failed to load SVG Blob into Image'));
      };
      img.src = svgUrl;
    });

    // 5. Draw the Image onto a Canvas
    const canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');
    ctx.drawImage(img, 0, 0);

    // 6. Extract the Blob and copy to clipboard
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Failed to create blob');

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);

    // console.log('DOM node successfully copied to clipboard!');

  } catch (err) {
    console.error('Failed to copy node:', err);
  }
}
export { handleCopyCenter }; 
