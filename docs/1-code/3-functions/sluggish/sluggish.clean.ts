import { writeFileSync } from "fs";
import { join } from "path";

// Definición clara de la interfaz de opciones
interface SlugOptions {
  property?: string;
  preserveCase?: boolean;
  addTimestamp?: boolean;
  addRandomHash?: boolean;
}

/**
 * Genera un slug amigable para URLs a partir de una propiedad de un objeto.
 * @param obj - El objeto que contiene la propiedad a convertir en slug.
 * @param options - Opciones de configuración para la generación del slug.
 * @returns Un string con formato de slug.
 * @throws Error si la propiedad especificada no se encuentra en el objeto.
 */
export function generateSlug(obj: Record<string, any>, options: SlugOptions = {}): string {
  const property = options.property || "name";
  const value = extractValue(obj, property);

  return buildSlug(value, options);
}

// Efecto: guarda el objeto en un archivo JSON usando el slug como nombre

/**
 * Guarda un objeto en un archivo JSON usando el slug como nombre de archivo.
 * @param obj - El objeto a guardar
 * @param options - Opciones: slug (obligatorio), directory (opcional)
 * @returns La ruta del archivo creado
 * @throws Error si ocurre un problema al escribir el archivo
 */
export function saveObjectToJsonFile(
  obj: Record<string, any>,
  options: { slug: string; directory?: string },
): string {
  const directory = options.directory || ".";
  const filePath = join(directory, `${options.slug}.json`);

  try {
    writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf-8");
    return filePath;
  } catch (err) {
    throw new Error("Error writing file: " + (err as Error).message);
  }
}

// Pure function - extracts and validates the value from object
function extractValue(obj: Record<string, any>, property: string): string {
  if (!obj.hasOwnProperty(property) || obj[property] === undefined) {
    throw new Error(`Property '${property}' not found in object`);
  }

  return String(obj[property]);
}

// Pure function - builds the final slug with all transformations and suffixes
function buildSlug(value: string, options: SlugOptions): string {
  const slug = transformToSlug(value, options.preserveCase);

  if (options.addTimestamp) {
    return addTimestampSuffix(slug);
  }

  if (options.addRandomHash) {
    return addHashSuffix(slug);
  }

  return slug;
}

// Pure function - adds timestamp suffix with proper formatting
function addTimestampSuffix(slug: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${slug}-${year}-${month}-${day}`;
}

// Pure function - adds random hash suffix with validation
function addHashSuffix(slug: string): string {
  const characters = "0123456789abcdef";
  let hash = "";

  for (let i = 0; i < 4; i++) {
    hash += characters[Math.floor(Math.random() * characters.length)];
  }

  return `${slug}-${hash}`;
}

// Pure function - transforms text to URL-friendly slug with case handling
function transformToSlug(text: string, preserveCase: boolean = false): string {
  const cleanText = text
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen

  return preserveCase ? cleanText : cleanText.toLowerCase();
}

// Para ejemplos de uso, ver el archivo examples.ts
