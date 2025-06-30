package org.notariado;
 
public class CaesarCipherKata {
 
  public static final int DESPLAZAMIENTO_CARACTERES = 1;
  public static void main(String[] args) {
    String textoSinCifrar = args[0];
    final int CIFRADO_CESAR = DESPLAZAMIENTO_CARACTERES;
    String textoCifrado = cifrarCadena(textoSinCifrar, CIFRADO_CESAR);
    System.out.println("Texto sin cifrar:   "+textoSinCifrar);
    System.out.println("Texto cifrado:      "+textoCifrado);
  }
 
  private static String cifrarCadena(String textoSinCifrar, int cifradoCesar) {
    char[] caracteresCifrados = new char[textoSinCifrar.length()];
    for(int i = 0; i<textoSinCifrar.length();i++) {
      caracteresCifrados[i] = siguienteCaracter(textoSinCifrar.charAt(i),cifradoCesar);
    }
    return new String(caracteresCifrados);
  }
  private static char siguienteCaracter(char caracterACifrar, int cifradoCesar) {
    char caracterCifrado = caracterACifrar;
    if(caracterACifrar >= 'a' && caracterACifrar <= 'z'){
      int rango = 'z' - 'a' + 1;
      caracterCifrado = cifrarCaracterEnBaseARango(caracterACifrar, cifradoCesar, 'a', rango);
    } else if(caracterACifrar >= 'A' && caracterACifrar <= 'Z'){
      int rango = 'Z' - 'A' + 1;
      caracterCifrado = cifrarCaracterEnBaseARango(caracterACifrar, cifradoCesar, 'A', rango);
    }
    return caracterCifrado;
  }
 
  private static char cifrarCaracterEnBaseARango(char caracterACifrar, int cifradoCesar, char base, int rango) {
    int nuevaPos = (((caracterACifrar - base + cifradoCesar) % rango) + rango) % rango;
    return (char) (base + nuevaPos);
  }
 
}