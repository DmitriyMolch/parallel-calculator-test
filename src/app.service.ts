import { Injectable } from '@nestjs/common';
import { checkParenthesis } from './helpers';

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
    try {
      return eval(expression);
    } catch (err) {
      console.error(err);
      throw new Error('Expression format is incorrect');
    }
  }
}
