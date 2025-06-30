package org.notariado;
 
public class CaesarCipherKata {
 
  public static void main(String[] args) {
    String textoSinCifrar = args[0];
    int desplazamiento = Integer.parseInt(args[1]);
    String textoCifrado = cifrarCadena(textoSinCifrar, desplazamiento);
    System.out.println("Texto sin cifrar:   "+textoSinCifrar);
    System.out.println("Texto cifrado:      "+textoCifrado);
  }
 
  private static String cifrarCadena(String textoSinCifrar, int desplazamiento) {
    char[] caracteresCifrados = new char[textoSinCifrar.length()];
    for(int i = 0; i<textoSinCifrar.length();i++) {
      caracteresCifrados[i] = siguienteCaracter(textoSinCifrar.charAt(i),desplazamiento);
    }
    return new String(caracteresCifrados);
  }
  private static char siguienteCaracter(char caracterACifrar, int desplazamiento) {
    char caracterCifrado = caracterACifrar;
    boolean esMinuscula = caracterACifrar >= 'a' && caracterACifrar <= 'z';
    boolean esMayuscula = caracterACifrar >= 'A' && caracterACifrar <= 'Z';
    if(esMinuscula){
      int rango = 'z' - 'a' + 1;
      caracterCifrado = cifrarCaracterEnBaseARango(caracterACifrar, desplazamiento, 'a', rango);
    } else if(esMayuscula){
      int rango = 'Z' - 'A' + 1;
      caracterCifrado = cifrarCaracterEnBaseARango(caracterACifrar, desplazamiento, 'A', rango);
    }
    return caracterCifrado;
  }
 
  private static char cifrarCaracterEnBaseARango(char caracterACifrar, int cifradoCesar, char base, int rango) {
    int nuevaPosicion = (((caracterACifrar - base + cifradoCesar) % rango) + rango) % rango;
    return (char) (base + nuevaPosicion);
  }
 
}