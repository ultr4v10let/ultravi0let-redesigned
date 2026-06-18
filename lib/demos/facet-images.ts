const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/bmp",
  "image/svg+xml",
  "image/heic",
  "image/heif",
]);

export const FACET_IMAGE_ACCEPT =
  "image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif,image/bmp,image/svg+xml,image/heic,image/heif,image/*";

export class FacetImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FacetImageError";
  }
}

function isImageFile(file: File) {
  if (file.type && ACCEPTED_MIME.has(file.type)) return true;
  return /\.(jpe?g|png|gif|webp|avif|bmp|svg|heic|heif)$/i.test(file.name);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new FacetImageError("Could not read this image file."));
    img.src = src;
  });
}

function canvasToDataUrl(canvas: HTMLCanvasElement, mime: string, quality: number) {
  if (mime === "image/png") return canvas.toDataURL("image/png");
  return canvas.toDataURL("image/jpeg", quality);
}

export async function processImageFile(
  file: File,
  options: { maxWidth: number; maxHeight: number; quality?: number } = {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.82,
  }
): Promise<string> {
  if (!isImageFile(file)) {
    throw new FacetImageError("Please choose a JPG, PNG, GIF, WebP, or other image file.");
  }

  if (file.size > 12 * 1024 * 1024) {
    throw new FacetImageError("Image is too large. Please use a file under 12 MB.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const { maxWidth, maxHeight, quality = 0.82 } = options;
    const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height);
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new FacetImageError("Could not process this image.");

    ctx.drawImage(img, 0, 0, width, height);

    const outputMime =
      file.type === "image/png" || file.type === "image/gif" || file.type === "image/svg+xml"
        ? "image/png"
        : "image/jpeg";

    return canvasToDataUrl(canvas, outputMime, quality);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function isDataImage(src: string) {
  return src.startsWith("data:image/");
}
