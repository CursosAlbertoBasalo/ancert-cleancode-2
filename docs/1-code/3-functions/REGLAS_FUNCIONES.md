# Reglas para Funciones Limpias

El objetivo de estas reglas es conseguir que nuestras funciones sean concisas, claras y mantenibles. Las funciones bien diseñadas son fundamentales para escribir Código Limpio y facilitar la comprensión del código.

## Principios Fundamentales

1. **Haz Una Sola Cosa (Single Responsibility)**:
   - Cada función debe hacer exactamente una cosa y hacerla bien.
   - **Mal**: Una función que valida entrada, procesa datos y formatea salida.
   - **Bien**: Funciones separadas para `validateInput()`, `processData()` y `formatOutput()`.

2. **Mantén las Funciones Pequeñas**:
   - Limita el tamaño de las funciones a 9-15 líneas como máximo.
   - Si una función crece más, divídela en subfunciones con nombres descriptivos.
   - **Ejemplo**: En lugar de una función grande `generateSlug()`, usar funciones auxiliares como `extractValue()`, `buildSlug()`, `transformToSlug()`.

3. **Un Solo Nivel de Abstracción**:
   - Todas las operaciones dentro de una función deben estar al mismo nivel conceptual.
   - **Mal**: Mezclar operaciones de bajo nivel (manipular caracteres) con operaciones de alto nivel (validar reglas de negocio).
   - **Bien**: Mantener separadas las operaciones según su nivel de abstracción.

## Reglas de Argumentos

1. **Reduce los Argumentos**:
   - Ideal: 0-2 argumentos. Evita funciones con más de 3 argumentos.
   - Utiliza objetos para agrupar parámetros relacionados.
   - **Mal**: `function generateSlug(obj, property, preserveCase, addTimestamp, addRandomHash) { ... }`
   - **Bien**: `function generateSlug(obj, options = {}) { ... }`

2. **Evita Argumentos de Bandera**:
   - No uses booleanos como interruptores para diferentes comportamientos.
   - En su lugar, crea funciones separadas o usa un objeto de opciones.
   - **Mal**: `function process(data, isValidated) { ... }`
   - **Bien**: `function processValidated(data) { ... }` y `function processRaw(data) { ... }`

3. **No Modifiques los Argumentos de Entrada**:
   - Trata los parámetros como inmutables para evitar efectos secundarios inesperados.
   - Si necesitas modificar un valor, crea una copia local.
   - **Mal**: `function clean(text) { text = text.toLowerCase(); ... }`
   - **Bien**: `function clean(text) { const cleanedText = text.toLowerCase(); ... }`

## Reglas de Estructura y Flujo

1. **Preguntar o Decir, No Mezcles**:
   - Una función debe recuperar información O realizar una acción, no ambas.
   - **Mal**: `function getAndUpdateUser() { ... }`
   - **Bien**: `function getUser() { ... }` y `function updateUser() { ... }`

2. **Usa Cláusulas de Guarda**:
   - Valida condiciones de entrada al inicio y retorna temprano para casos inválidos.
   - **Mal**:
     ```typescript
     function processData(data) {
       if (isValid(data)) {
         // Muchas líneas de procesamiento
       } else {
         return new Error("Datos inválidos");
       }
     }
     ```
   - **Bien**:
     ```typescript
     function processData(data) {
       if (!isValid(data)) {
         return new Error("Datos inválidos");
       }
       // Procesar datos sin anidamiento
     }
     ```

3. **Evita Efectos Secundarios Ocultos**:
   - Si una función debe tener efectos secundarios (ej. escribir a un archivo), haz que sea obvio por su nombre.
   - **Mal**: `function validateAndSave(data) { ... }` (¿Dónde guarda? ¿Qué efecto tiene?)
   - **Bien**: `function saveObjectToJsonFile(obj, options) { ... }` (Claramente indica que guarda a un archivo)

## Directrices Adicionales

1. **Encapsula Condiciones Complejas**:
   - Extrae condiciones complejas a funciones con nombres descriptivos.
   - **Mal**: `if (value !== null && value !== undefined && value.length > 0) { ... }`
   - **Bien**: `function hasContent(value) { return value !== null && value !== undefined && value.length > 0; }`

2. **Prefiere Funciones Puras**:
   - Las funciones puras son más predecibles, fáciles de probar y entender.
   - Una función pura siempre devuelve el mismo resultado para los mismos argumentos y no tiene efectos secundarios.
   - **Ejemplo**: `function transformToSlug(text, preserveCase) { ... }`

3. **Nombres Descriptivos**:
   - El nombre debe describir exactamente lo que hace la función.
   - Nombres largos descriptivos son mejores que nombres cortos ambiguos.
   - **Mal**: `function process(obj) { ... }`
   - **Bien**: `function generateSlugFromObject(obj) { ... }`

4. **Evita el Uso de Valores Nulos**:
   - Utiliza valores por defecto o cláusulas de guarda en lugar de pasar o devolver null.
   - **Mal**: `if (options === null) { options = {}; }`
   - **Bien**: `function doSomething(options = {}) { ... }`
