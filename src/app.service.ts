import { Injectable } from '@nestjs/common';
import { checkParenthesis } from './helpers';

type Operator = '+' | '-' | '*' | '/';

const operators: Record<Operator, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function tokenize(expression: string): string[] {
  // Regex to match numbers (including decimals and negatives), operators, and parentheses
  return expression.match(/(\d+(\.\d+)?|[\+\-\*\/\(\)])/g) || [];
}

function parseExpression(tokens: string[]): number {
  let value = parseTerm(tokens);
  while (tokens.length && (tokens[0] === '+' || tokens[0] === '-')) {
    const operator = tokens.shift() as Operator;
    const nextValue = parseTerm(tokens);
    value = operators[operator](value, nextValue);
  }
  return value;
}

function parsePrimary(tokens: string[]): number {
  const token = tokens.shift();
  if (token === '(') {
    const value = parseExpression(tokens);
    tokens.shift();
    return value;
  }
  return parseFloat(token as string);
}

function parseTerm(tokens: string[]): number {
  let value = parsePrimary(tokens);
  while (tokens.length && (tokens[0] === '*' || tokens[0] === '/')) {
    const operator = tokens.shift() as Operator;
    const nextValue = parsePrimary(tokens);
    value = operators[operator](value, nextValue);
  }
  return value;
}

@Injectable()
export class AppService {
  evaluate(expression: string): number {
    if (
      !expression ||
      typeof expression !== 'string' ||
      !checkParenthesis(expression)
    ) {
      throw new Error('Expression format is incorrect');
    }

    // Can use here simple javascript "eval" function to simplify the logic
    const tokens = tokenize(expression);
    return parseExpression(tokens);
  }
}
