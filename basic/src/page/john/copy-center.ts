/**good ol' gemini. always writing things that somehow sometimes do things correctly.*/
async function handleCopyCenter(target_id: string) {
	try {
		const sourceNode = document.getElementById(target_id) as HTMLElement | null;

		if (!sourceNode) {
			throw new Error('Target node not found in the DOM.');
		}

		const rect: DOMRect = sourceNode.getBoundingClientRect();

		// 1. clone that node
		const clone = sourceNode.cloneNode(true) as HTMLElement;
		clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
		clone.style =`
			display: table-cell;
			width: ${rect.width}px;
			height: ${rect.height}px;
			margin: auto;
			padding: 0px 10px 10px 10px;
			vertical-align: middle;
			text-align: center;
			font-size: 18pt;
			font-weight: bold;
			color: black;
			background-color: #F0F0F0;
			user-select: none;
		`;

		// 2. Serialize safely to XML
		const serializedHtml: string = new XMLSerializer().serializeToString(clone);

		// 3. Wrap directly in an SVG
		const svgString: string = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
        <foreignObject width="100%" height="100%" x="0" y="0">
          ${serializedHtml}
        </foreignObject>
      </svg>
    `;

		// 4. Blob him into a URL
		const svgUrl: string = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

		// 5. Draw to Image, then Canvas
		const img = new Image();
		// Crucial: Tell the browser we are requesting this image anonymously 
		// to prevent cross-origin taint flags on Data URIs in some browsers.
		img.crossOrigin = 'anonymous';

		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = () => reject(new Error('SVG failed to load'));
			img.src = svgUrl;
		});

		const canvas = document.createElement('canvas');
		canvas.width = rect.width;
		canvas.height = rect.height;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Failed to get 2D canvas context.');
		}

		// Fill a white background
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0);

		// 6. Export safely to clipboard
		const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
		if (!blob) {
			throw new Error('Canvas export failed to generate a Blob.');
		}

		await navigator.clipboard.write([
			new ClipboardItem({ 'image/png': blob })
		]);

	} catch (err) {
		console.error(err);
	}
}
export { handleCopyCenter };
