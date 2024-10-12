const regexp = /[\d\s]/; //digit or white space

// This logic can be extended in multiple ways
export function checkParenthesis(expression: string): boolean {
  let balance = 0;

  for (let i = 0; i < expression.length; ++i) {
    const char = expression[i];
    if (char === '(') {
      const nextChar = expression[i + 1];
      balance++; // Increment balance for open parentheses.
      if (!regexp.test(nextChar)) return false; // Return false if has incorrect symbols
    } else if (char === ')') {
      const prevChar = expression[i - 1];
      if (!regexp.test(prevChar)) return false; // Return false if has incorrect symbols
      balance--; // Decrement balance for closed parentheses.
    }

    // If balance is negative, there are more closing parentheses than opening.
    if (balance < 0) return false;
  }

  // Balance should be zero for properly matched parentheses.
  return balance === 0;
}
