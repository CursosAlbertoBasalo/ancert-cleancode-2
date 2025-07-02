# Reglas para la Gestión de Datos

El objetivo de estas reglas es conseguir que nuestro código maneje los datos de forma clara, robusta y con sentido de dominio. Una buena gestión de datos es fundamental para crear código que represente fielmente los conceptos del negocio.

## Principios Fundamentales

1.  **Evita el Uso Excesivo de Primitivas**:
    - El uso excesivo de tipos primitivos dificulta la comprensión del dominio y puede llevar a errores.
    - **Mal**: `const cardNumber = "1234123412341234"; const cardValidUntil = "12/29";`
    - **Bien**: `const card = new CardVO(new CardNumber("1234123412341234"), "12/29", 123);`

2.  **Define la Forma de tus Datos con DTOs**:
    - Los DTOs (Data Transfer Objects) definen la estructura de los datos que se transfieren, tanto entre cliente y servidor como dentro de la aplicación.
    - Son útiles como contratos de datos, pero no incorporan validaciones ni reglas de negocio.
    - **Ejemplo**: `interface ClientDTO { name: string; country: string; city: string; }`

3.  **Utiliza Objetos de Valor (Value Objects) para Garantizar Validez**:
    - Los VO son inmutables y encapsulan reglas que aseguran la validez de los datos.
    - Proporcionan métodos para representar y manipular los datos de forma segura.
    - **Ejemplo**: `new CardNumber("1234123412341234").getMaskedNumber() // "**** **** **** 1234"`

## Evolución de los Datos

1.  **Entidades: Más Allá de los Datos**:
    - Las entidades no solo contienen datos, sino que también implementan lógica de negocio asociada a ellos.
    - Encapsulan los datos y exponen operaciones relevantes del dominio.
    - **Ejemplo**: `card.isExpired()` en lugar de comparar fechas directamente.

2.  **Composición sobre Herencia**:
    - Prefiere la composición sobre la herencia para crear estructuras más flexibles y menos acopladas.
    - **Mal**: `class EmpleadoExtension extends Persona { ... }`
    - **Bien**: `class EmpleadoComposed implements IPersona { constructor(persona: Persona, salario: number) { ... } }`

3.  **Agregados para Mantener la Consistencia**:
    - Los agregados son conjuntos de entidades que se tratan como una unidad.
    - Definen límites claros y garantizan que las reglas del negocio se cumplan.
    - Proporcionan acceso controlado a las entidades que contienen.
    - **Ejemplo**: `clientAggregate.getPreferredCard()` en lugar de acceder directamente a la propiedad.

## Directrices Adicionales

1.  **Validación en el Punto de Creación**:
    - Valida los datos en el momento de su creación para garantizar que siempre estén en un estado válido.
    - **Ejemplo**: `if (amount < 0) { throw new Error("Amount cannot be negative"); }`

2.  **Inmutabilidad para Mayor Seguridad**:
    - Haz que tus objetos de valor y entidades sean inmutables siempre que sea posible.
    - Usa `readonly` para las propiedades que no deben cambiar después de la creación.
    - **Ejemplo**: `public readonly name: string;`

3.  **Oculta los Detalles de Implementación**:
    - No expongas directamente las estructuras de datos internas. Proporciona métodos que abstraigan la manipulación de esos datos.
    - **Mal**: `client.cards.push(newCard);`
    - **Bien**: `client.addCard(newCard, isPreferred);`

4.  **Respeta las Relaciones entre Entidades**:
    - Asegúrate de que las relaciones entre entidades se mantengan consistentes.
    - Usa agregados para garantizar que las reglas de negocio que abarcan múltiples entidades se cumplan.
    - **Ejemplo**: `clientPaymentsAggregate.performPayment(payment)` en lugar de manipular pagos y tarjetas por separado.
