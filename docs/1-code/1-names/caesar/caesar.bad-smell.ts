// Caesar cipher with terrible naming and style violations

const tmp1 = 26; // bad: magic number without descriptive name
const tmp2 = 97; // bad: magic number
const tmp3 = 65; // bad: magic number

// bad: function name doesn't start with verb, poor naming
export function caesar(s: string, n: number): string {
  let result = ""; // bad: not descriptive
  for (let i = 0; i < s.length; i++) {
    // bad: single letter variable abuse
    const c = s[i]; // bad: single letter variable
    const code = c.charCodeAt(0); // bad: generic technical term

    // bad: no function extraction, complex logic inline
    if (code >= 97 && code <= 122) {
      // bad: magic numbers
      const pos = code - 97; // bad: magic number
      const newpos = (pos + n) % 26; // bad: magic numbers
      result += String.fromCharCode(97 + newpos); // bad: magic number
    } else if (code >= 65 && code <= 90) {
      // bad: magic numbers, duplicate logic
      const pos = code - 65; // bad: magic number
      const newpos = (pos + n) % 26; // bad: magic numbers
      result += String.fromCharCode(65 + newpos); // bad: magic number
    } else {
      result += c; // bad: inconsistent variable naming
    }
  }
  return result;
}

// bad: meaningless function name, no verb
export function test(): void {
  // bad: using console.log in production code without proper logging
  console.log(caesar("hal", 1)); // bad: magic number
  console.log(caesar("xyz", 1)); // bad: magic number
  console.log(caesar("abc", 2)); // bad: magic number
  console.log(caesar("abc", 26)); // bad: magic number
}

// bad: alternative implementation with even worse practices
export function caesarCipher2(txt: string, shift: number): string {
  // bad: different name for same concept, synonym usage
  let output = ""; // bad: inconsistent naming (result vs output)
  let j = 0; // bad: meaningless iterator name

  while (j < txt.length) {
    // bad: while loop when for would be clearer
    const ch = txt.charAt(j); // bad: abbreviated variable name
    const ascii = ch.charCodeAt(0); // bad: technical jargon as variable name

    // bad: negative boolean logic, hard to read conditions
    const notLowercase = !(ascii >= 97 && ascii <= 122); // bad: magic numbers
    const notUppercase = !(ascii >= 65 && ascii <= 90); // bad: magic numbers

    if (!notLowercase) {
      // bad: double negative, confusing logic
      // bad: complex calculation without explanation
      output += String.fromCharCode(((ascii - 97 + shift) % 26) + 97);
    } else if (!notUppercase) {
      // bad: double negative
      // bad: duplicated logic with magic numbers
      output += String.fromCharCode(((ascii - 65 + shift) % 26) + 65);
    } else {
      output += ch;
    }
    j++; // bad: inconsistent increment style
  }

  return output;
}

// bad: function name doesn't describe what it does
export function doStuff(input: string, amount: number): string {
  // bad: unclear variable names, no intention revealing
  const data = input.split("");
  const processed = data.map((item, idx) => {
    // bad: generic names
    if (item.match(/[a-z]/)) {
      // bad: regex without explanation
      return String.fromCharCode(((item.charCodeAt(0) - 97 + amount) % 26) + 97);
    } else if (item.match(/[A-Z]/)) {
      // bad: duplicated pattern
      return String.fromCharCode(((item.charCodeAt(0) - 65 + amount) % 26) + 65);
    }
    return item;
  });

  return processed.join("");
}
