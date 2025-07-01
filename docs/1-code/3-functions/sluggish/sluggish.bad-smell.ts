// Bad implementation with code smells
// Long functions, mixed responsibilities, poor naming

export function generateSlugWithEverything(
  obj: any,
  prop?: string,
  caseFlag?: boolean,
  ts?: boolean,
  hash?: boolean,
): any {
  // Long function that does too many things
  // Poor parameter names and mixed responsibilities

  let p = prop || "name"; // Unclear variable name

  // No early validation
  if (!obj) {
    return new Error("Object is required");
  }

  let val = obj[p]; // Another unclear name

  if (val === undefined || val === null) {
    return new Error(`Property '${p}' not found in object`);
  }

  // Complex nested logic in one place
  let result = String(val);

  // Magic strings and unclear transformations
  result = result
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  if (!caseFlag) {
    // Confusing boolean logic
    result = result.toLowerCase();
  }

  // Nested conditionals making the function hard to follow
  if (ts) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Manual date formatting instead of using proper methods
    let monthStr = month < 10 ? "0" + month : month.toString();
    let dayStr = day < 10 ? "0" + day : day.toString();

    result = result + "-" + year + "-" + monthStr + "-" + dayStr;
  } else if (hash) {
    // Unclear variable names and magic numbers
    let h = "";
    let chars = "0123456789abcdef";
    for (let i = 0; i < 4; i++) {
      h += chars[Math.floor(Math.random() * chars.length)];
    }
    result = result + "-" + h;
  }

  return result;
}

// Alternative bad implementation with even more problems
export function makeSlug(data: any, options: any = {}): any {
  // Terrible function that violates multiple principles

  if (data == null) return null; // Using null instead of proper error handling

  let prop = options.prop || options.property || "name";
  let preserve = options.preserve || options.preserveCase || false;
  let addTS = options.ts || options.timestamp || options.addTimestamp || false;
  let addH = options.h || options.hash || options.addRandomHash || false;

  // Too many ways to specify the same option (inconsistent API)

  let value = data[prop];
  if (!value) {
    throw new Error("No value found"); // Mixing error handling styles
  }

  value = value.toString();

  // Doing everything in one massive expression
  let slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-");

  if (preserve) {
    // Inconsistent - redoing work
    slug = value
      .trim()
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-{2,}/g, "-");
  }

  if (addTS && addH) {
    // Poor handling of conflicting options
    slug += "-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4);
  } else if (addTS) {
    slug += "-" + new Date().toISOString().split("T")[0];
  } else if (addH) {
    slug += "-" + Math.random().toString(16).substr(2, 4);
  }

  // Side effect hidden in the function
  console.log(`Generated slug: ${slug}`);

  return slug;
}
