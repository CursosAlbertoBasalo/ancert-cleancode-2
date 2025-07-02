// Una versión "sucia" de un blockchain en TypeScript, con varios "malos olores" de código:

// Primitive Obsession: Uso directo de primitivas en lugar de objetos de dominio
// Long Methods: Métodos que hacen demasiadas cosas
// Feature Envy: Métodos que manipulan más datos de otras clases que de la propia
// Shotgun Surgery: Cambios repetidos en múltiples lugares
// Global Variables: Variables compartidas por diferentes partes del código
// Comments: Comentarios que compensan nombres poco descriptivos
// Nested Conditionals: Estructuras if-else profundamente anidadas
// Side Effects: Funciones que modifican estado fuera de su ámbito
// Poor Naming: Nombres cortos, abreviados o técnicos
// Data Clumps: Datos que siempre aparecen juntos pero no están encapsulados
// Inconsistent Styles: Mezcla de estilos de nombrado (camelCase y snake_case)
// Temporal Coupling: Dependencias no evidentes en el orden de ejecución

// Global variables (smell: avoiding encapsulation)
let currentTimestamp = new Date();
let validationFlag = true;

// Magic numbers and strings (smell: no named constants)
const GENESIS_HASH = "0";
const GENESIS_IDX = 0;

/**
 * Block object (smell: using primitive types directly)
 */
class BadBlock {
  // (smell: public properties without encapsulation)
  public idx: number; // (smell: non-descriptive name)
  public ts: number; // (smell: abbreviation, non-descriptive name)
  public d: string; // (smell: single-letter name)
  public prevHash: string; // (smell: inconsistent naming style)
  public blockHash: string; // (smell: inconsistent naming style)

  // (smell: constructor with too many parameters, no validation)
  constructor(idx: number, ts: number, d: string, prevHash: string, blockHash: string) {
    this.idx = idx;
    this.ts = ts;
    this.d = d;
    this.prevHash = prevHash;
    this.blockHash = blockHash;
  }

  // (smell: inconsistent method naming, not verb-based)
  hash(): string {
    // (smell: magic calculation with no explanation)
    return this.idx + this.d.length + this.prevHash;
  }

  // (smell: method doing too many things)
  validate(previousBlock: BadBlock): boolean {
    // (smell: complex, nested validation logic)
    if (this.idx != previousBlock.idx + 1) {
      validationFlag = false; // (smell: side effect on global variable)
      return false;
    } else {
      if (this.prevHash != previousBlock.blockHash) {
        validationFlag = false; // (smell: another side effect)
        return false;
      } else {
        if (this.blockHash != this.idx + this.d.length + this.prevHash) {
          validationFlag = false; // (smell: yet another side effect)
          return false;
        } else {
          return true;
        }
      }
    }
  }
}

/**
 * The blockchain class (smell: giant class doing too much)
 */
class BadBlockchain {
  // (smell: public properties with no encapsulation)
  public chain: BadBlock[] = [];
  public timestamp: number = 0;

  constructor() {
    // (smell: direct property manipulation without getters/setters)
    this.chain = [];
    this.timestamp = Date.now();

    // (smell: direct business logic in constructor)
    this.createGenesisBlock();
  }

  // (smell: method with multiple responsibilities)
  createGenesisBlock(): BadBlock {
    // (smell: repeated calculation logic)
    const hash = GENESIS_IDX + 0 + GENESIS_HASH; // (smell: magic number)

    // (smell: directly instantiating without factory method)
    let genesis = new BadBlock(GENESIS_IDX, Date.now(), "", GENESIS_HASH, hash);

    // (smell: direct array manipulation)
    this.chain.push(genesis);

    // (smell: side effect)
    currentTimestamp = new Date();

    // (smell: unnecessary return)
    return genesis;
  }

  // (smell: inconsistent function style, snake_case vs camelCase)
  add_block(data: string): boolean {
    // (smell: function doing too many things)
    const prev = this.chain[this.chain.length - 1];
    const newIdx = prev.idx + 1;
    const timestamp = Date.now(); // (smell: direct use of timestamp)
    const prevHash = prev.blockHash;

    // (smell: repeated calculation logic)
    const hash = newIdx + data.length + prevHash;

    // (smell: direct instantiation)
    const newBlock = new BadBlock(newIdx, timestamp, data, prevHash, hash);

    // (smell: direct array manipulation)
    this.chain.push(newBlock);

    // (smell: timestamp manipulation as side effect)
    currentTimestamp = new Date();
    this.timestamp = currentTimestamp.getTime();

    // (smell: unnecessary boolean return)
    return true;
  }

  // (smell: method name doesn't indicate boolean return)
  validity(): boolean {
    // (smell: complex method with poor structure)

    // (smell: redundant variable)
    const chainLength = this.chain.length;

    // (smell: unnecessary null check in a constructor-initialized array)
    if (this.chain === null || chainLength <= 0) {
      console.log("Empty blockchain"); // (smell: logging in business logic)
      return false;
    }

    // (smell: special case not clearly separated)
    if (chainLength === 1) {
      if (this.chain[0].idx === GENESIS_IDX) {
        return true;
      } else {
        console.log("Invalid genesis block"); // (smell: more logging)
        return false;
      }
    }

    // (smell: complex validation logic with side effects)
    for (let i = 1; i < chainLength; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // (smell: validationFlag modified as side effect)
      if (!current.validate(previous)) {
        console.log("Invalid block at index " + i); // (smell: string concatenation)
        return false;
      }
    }

    // (smell: global variable check)
    if (!validationFlag) {
      console.log("Some blocks failed validation checks");
      return false;
    }

    return true;
  }

  // (smell: method that exposes internal data structure)
  getFullChain(): BadBlock[] {
    // (smell: returning direct reference to internal data)
    return this.chain;
  }

  // (smell: utility method that doesn't belong in this class)
  printBlockchain(): void {
    // (smell: mixing presentation with business logic)
    console.log("Blockchain created at: " + this.timestamp);
    for (let i = 0; i < this.chain.length; i++) {
      console.log("Block #" + this.chain[i].idx + ": " + this.chain[i].d);
    }
  }
}

// Example usage with "smelly" patterns
var bc = new BadBlockchain(); // (smell: var instead of const or let)

// (smell: using function as a procedure with side effects)
function addMultipleBlocks() {
  // (smell: side effects)
  bc.add_block("First block data");
  bc.add_block("More data here");

  // (smell: unnecessary global leakage)
  // @ts-ignore
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.blockchain = bc;
  }

  // (smell: logging inside a function)
  console.log("Added blocks");
}

// (smell: non-idiomatic control flow)
if (1 == 1) {
  // (smell: always true condition)
  addMultipleBlocks();
}

// (smell: direct access to global variable)
console.log("Is valid: " + bc.validity());

// (smell: function that does too much and has poor name)
function doStuff(data: string) {
  // (smell: mixed responsibilities)
  if (data) {
    bc.add_block(data);
  }

  bc.printBlockchain();

  // (smell: deep property access)
  for (var i = 0; i < bc.chain.length; i++) {
    // (smell: direct property manipulation)
    bc.chain[i].ts = Date.now();
  }
}

// (smell: unused function)
function calculateStuff() {
  // (smell: unused variables)
  var temp = 0;
  var result = "";

  // (smell: unnecessary loop)
  for (var i = 0; i < 10; i++) {
    temp += i;
  }
}

// (smell: unnecessary call)
doStuff("Final block");

// (smell: global namespace pollution)
// @ts-ignore
if (typeof global !== "undefined") {
  // @ts-ignore
  global.blockchain = bc;
}
