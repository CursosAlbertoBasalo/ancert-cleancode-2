# Reglas para la Simplicidad del Código

El objetivo de estas reglas es escribir código simple, legible y mantenible. La simplicidad es fundamental para el Código Limpio y reduce la complejidad cognitiva necesaria para entender y modificar el software.

## Principios Fundamentales

1. **Escribe Expresiones Simples**:
   - Divide expresiones complejas en múltiples líneas con variables intermedias descriptivas.
   - **Mal**: `if (amount > 0 && amount <= maxWithdrawal && atmBalance >= amount && amount % 5 === 0) { ... }`
   - **Bien**:

     ```typescript
     const isPositiveAmount = amount > 0;
     const isWithinLimit = amount <= maxWithdrawal;
     const hasEnoughBalance = atmBalance >= amount;
     const isValidDenomination = amount % 5 === 0;

     if (isPositiveAmount && isWithinLimit && hasEnoughBalance && isValidDenomination) { ... }
     ```

2. **Salidas Tempranas para Casos Inválidos**:
   - Valida condiciones de entrada al inicio y retorna inmediatamente en casos de error.
   - **Mal**: Anidar toda la lógica dentro de un `if` gigante
   - **Bien**:
     ```typescript
     function withdraw(amount: number): WithdrawResult {
       if (amount <= 0) return { error: "Invalid amount" };
       if (amount > maxWithdrawal) return { error: "Amount exceeds limit" };
       // ... resto de la lógica
     }
     ```

3. **Evita Anidamiento Profundo**:
   - Mantén el nivel de anidamiento al mínimo (máximo 3 niveles).
   - Usa salidas tempranas, extracción de métodos y inversión de condiciones.

## Reglas de Control de Flujo

1. **Condiciones Positivas y Simples**:
   - Escribe condiciones que sean fáciles de leer y entender.
   - **Mal**: `if (!isNotAvailable && !isEmpty) { ... }`
   - **Bien**: `if (isAvailable && hasContent) { ... }`

2. **Evita Declaraciones `else` Cuando Sea Posible**:
   - Usa salidas tempranas en lugar de bloques `else`.
   - **Mal**:
     ```typescript
     if (isValid) {
       process();
     } else {
       handleError();
     }
     ```
   - **Bien**:
     ```typescript
     if (!isValid) {
       handleError();
       return;
     }
     process();
     ```

3. **No Uses Operadores Ternarios Anidados**:
   - Los operadores ternarios anidados son difíciles de leer.
   - **Mal**: `result = a > b ? (c > d ? x : y) : (e > f ? z : w);`
   - **Bien**: Usa múltiples `if` statements o extrae a una función.

## Reglas de Estructura

1. **Bloques Pequeños y Simples**:
   - Mantén los bloques de código entre 1-4 líneas.
   - Si un bloque es más largo, considera extraerlo a una función separada.

2. **Funciones con Una Sola Responsabilidad**:
   - Cada función debe hacer una sola cosa y hacerla bien.
   - **Mal**: Una función que valida, calcula y formatea el resultado
   - **Bien**: Funciones separadas para `validate()`, `calculate()`, `format()`

3. **Complejidad Ciclomática Baja**:
   - Mantén la complejidad ciclomática por debajo de 10 (preferiblemente bajo 5).
   - Cuenta cada `if`, `while`, `for`, `case`, `catch`, etc. como +1 de complejidad.

## Directrices para Variables Temporales

1. **Usa Variables Intermedias para Claridad**:
   - Asigna resultados de cálculos complejos a variables con nombres descriptivos.
   - **Ejemplo**:
     ```typescript
     const remainingAmount = requestedAmount;
     const billsToDispense = calculateOptimalBills(remainingAmount);
     const totalBillsNeeded = billsToDispense.reduce((sum, count) => sum + count, 0);
     ```

2. **Evita Variables Temporales Innecesarias**:
   - No crees variables que solo se usan una vez y no añaden claridad.
   - **Mal**: `const temp = getValue(); return temp;`
   - **Bien**: `return getValue();`
