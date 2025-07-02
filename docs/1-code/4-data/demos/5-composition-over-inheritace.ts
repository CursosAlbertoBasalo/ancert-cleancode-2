export interface IPersona {
  nombre: string;
  apellido: string;
  edad: number;
}
export class Persona implements IPersona {
  nombre: string;
  apellido: string;
  edad: number;
  constructor(nombre: string = "", apellido: string = "", edad: number = 0) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }
}

export class EmpleadoDuplicado implements IPersona {
  nombre: string;
  apellido: string;
  edad: number;
  salario: number;
  constructor(nombre: string = "", apellido: string = "", edad: number = 0, salario: number = 0) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.salario = salario;
  }
}

export class EmpleadoExtension extends Persona {
  salario: number;

  constructor(nombre: string, apellido: string, edad: number, salario: number) {
    super();
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.salario = salario;
  }
}

// Composición sobre herencia
// Opción preferida y más flexible aunque más verbosa

export class EmpleadoComposed implements IPersona {
  nombre: string;
  apellido: string;
  edad: number;
  //persona: Persona; // Composición
  salario: number;

  constructor(persona: Persona, salario: number) {
    this.nombre = persona.nombre;
    this.apellido = persona.apellido;
    this.edad = persona.edad;
    this.salario = salario;
  }
}

function saludar(algo: IPersona) {
  console.log(`Hola, ${algo.nombre} ${algo.apellido}`);
}
saludar(new Persona("Ana", "Gómez", 25));
saludar(new EmpleadoExtension("Juan", "Pérez", 30, 50000));
saludar(new EmpleadoComposed(new Persona(), 50000));
saludar(new EmpleadoDuplicado("Luis", "Martínez", 28, 60000));
