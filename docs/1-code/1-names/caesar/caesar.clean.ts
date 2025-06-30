/**
 * Caesar Cipher implementation with clean code practices
 * Shifts each letter in the alphabet by a specified number of positions
 */

const ALPHABET_SIZE = 26;
const LOWERCASE_A_CHAR_CODE = 97;
const UPPERCASE_A_CHAR_CODE = 65;

/**
 * Applies Caesar cipher encryption to a given text
 * @param plainText - The text to encrypt
 * @param shiftAmount - Number of positions to shift each letter
 * @returns The encrypted text
 */
export function encryptWithCaesarCipher(plainText: string, shiftAmount: number): string {
  return plainText
    .split("")
    .map((character) => shiftCharacter(character, shiftAmount))
    .join("");
}

function shiftCharacter(character: string, shiftAmount: number): string {
  if (isLowercaseLetter(character)) {
    return shiftLowercaseLetter(character, shiftAmount);
  }

  if (isUppercaseLetter(character)) {
    return shiftUppercaseLetter(character, shiftAmount);
  }

  return character;
}

function isLowercaseLetter(character: string): boolean {
  const charCode = character.charCodeAt(0);
  // Check if character code is within the lowercase ASCII range (a-z)
  return charCode >= LOWERCASE_A_CHAR_CODE && charCode <= LOWERCASE_A_CHAR_CODE + ALPHABET_SIZE - 1;
}

function isUppercaseLetter(character: string): boolean {
  const charCode = character.charCodeAt(0);
  const minUppercaseCode = UPPERCASE_A_CHAR_CODE;
  const maxUppercaseCode = UPPERCASE_A_CHAR_CODE + ALPHABET_SIZE - 1;
  return charCode >= minUppercaseCode && charCode <= maxUppercaseCode;
}

function shiftLowercaseLetter(letter: string, shiftAmount: number): string {
  const currentPosition = letter.charCodeAt(0) - LOWERCASE_A_CHAR_CODE;
  const newPosition = calculateNewPosition(currentPosition, shiftAmount);
  return String.fromCharCode(LOWERCASE_A_CHAR_CODE + newPosition);
}

function shiftUppercaseLetter(letter: string, shiftAmount: number): string {
  const currentPosition = letter.charCodeAt(0) - UPPERCASE_A_CHAR_CODE;
  const newPosition = calculateNewPosition(currentPosition, shiftAmount);
  return String.fromCharCode(UPPERCASE_A_CHAR_CODE + newPosition);
}

function calculateNewPosition(currentPosition: number, shiftAmount: number): number {
  // Normalizes shift to handle values greater than alphabet size,
  // then applies modulo to wrap around the alphabet (e.g., z+1 = a)
  const normalizedShift = shiftAmount % ALPHABET_SIZE;
  return (currentPosition + normalizedShift) % ALPHABET_SIZE;
}

// Example usage demonstrating the acceptance criteria
export function demonstrateUsage(): void {
  console.log("Caesar Cipher Examples:");
  console.log(`"hal" with shift 1: ${encryptWithCaesarCipher("hal", 1)}`); // Expected: "ibm"
  console.log(`"xyz" with shift 1: ${encryptWithCaesarCipher("xyz", 1)}`); // Expected: "yza"
  console.log(`"abc" with shift 2: ${encryptWithCaesarCipher("abc", 2)}`); // Expected: "cde"
  console.log(`"abc" with shift 26: ${encryptWithCaesarCipher("abc", 26)}`); // Expected: "abc"
}
