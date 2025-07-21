/**
 * Renders a DOM node to a PNG data‑URL without tainting,
 * by embedding the SVG as a data:image URI.
 */
export async function htmlToPngDataUrl(
  node: HTMLElement,
  width: number,
  height: number
): Promise<string> {
  // 1. Clone & inline computed styles (as before)
  const clone = node.cloneNode(true) as HTMLElement;
  inlineStyles(node, clone);

  // 2. Serialize to SVG string
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        ${new XMLSerializer().serializeToString(clone)}
      </foreignObject>
    </svg>
  `.trim();

  // 3. Turn it into a data URI
  //    * encodeURIComponent will percent‑escape everything that could break
  const svgData = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  // 4. Load that into an Image
  const img = new Image();
  // no crossOrigin needed for data URIs
  await new Promise<void>((res, rej) => {
    img.onload  = () => res();
    img.onerror = e => rej(e);
    img.src     = svgData;
  });

  // 5. Draw & export
  const canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL('image/png');
}

function inlineStyles(source: Element, target: Element) {
  const cs = getComputedStyle(source);
  const ts = (target as HTMLElement).style;
  for (let i = 0; i < cs.length; i++) {
    const prop = cs.item(i)!;
    ts.setProperty(prop, cs.getPropertyValue(prop));
  }
  Array.from(source.children).forEach((c, i) =>
    inlineStyles(c as Element, target.children[i] as Element)
  );
}
