// * Return early for invalid or trivial cases

function isPrime(n: number): boolean {
  if (n <= 0) {
    throw new Error("Number must be greater than 0");
  }
  if (n == 1) {
    return false; // 1 is not prime
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function getFibonacci(n: number): number {
  if (n < 0) {
    throw new Error("Number must be greater or equal to 0");
  }
  if (n === 0 || n === 1) {
    return n; // 0 and 1 are base cases
  }
  return getFibonacci(n - 1) + getFibonacci(n - 2);
}
