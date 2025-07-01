import { generateSlug, saveObjectToJsonFile } from "./sluggish.clean";

// Ejemplos de uso de la librería
function runExamples() {
  // Ejemplo 1: Generar slug con preservación de mayúsculas
  const obj = { name: "Hello World!" };
  try {
    const slug: string = generateSlug(obj, { property: "name", preserveCase: true });
    console.log("Ejemplo 1 - Slug con mayúsculas:", slug); // "Hello-World!"
    const savedPath = saveObjectToJsonFile(obj, { slug, directory: "./data" });
    console.log("Archivo guardado en:", savedPath);
  } catch (error) {
    console.error("Error en ejemplo 1:", error);
  }

  // Ejemplo 2: Generar slug usando una propiedad diferente
  const articleObj = { title: "My Article Title" };
  try {
    const articleSlug: string = generateSlug(articleObj, { property: "title" });
    console.log("Ejemplo 2 - Slug de artículo:", articleSlug); // "my-article-title"
    const savedPath = saveObjectToJsonFile(articleObj, { slug: articleSlug, directory: "./data" });
    console.log("Archivo guardado en:", savedPath);
  } catch (error) {
    console.error("Error en ejemplo 2:", error);
  }

  // Ejemplo 3: Generar slug con timestamp
  try {
    const timestampSlug: string = generateSlug(obj, { addTimestamp: true });
    console.log("Ejemplo 3 - Slug con timestamp:", timestampSlug);
  } catch (error) {
    console.error("Error en ejemplo 3:", error);
  }

  // Ejemplo 4: Generar slug con hash aleatorio
  try {
    const hashSlug: string = generateSlug(obj, { addRandomHash: true });
    console.log("Ejemplo 4 - Slug con hash:", hashSlug);
  } catch (error) {
    console.error("Error en ejemplo 4:", error);
  }

  // Ejemplo 5: Manejo de errores cuando la propiedad no existe
  const invalidObj = { id: 123 };
  try {
    const invalidSlug: string = generateSlug(invalidObj);
    console.log("Este código no debería ejecutarse");
  } catch (error) {
    console.error("Ejemplo 5 - Error esperado:", error.message);
  }
}

// Ejecutar ejemplos
runExamples();
