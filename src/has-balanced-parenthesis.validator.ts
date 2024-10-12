import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { checkParenthesis } from './helpers';

@ValidatorConstraint({ name: 'hasBalancedParenthesis', async: false })
export class HasBalancedParenthesis implements ValidatorConstraintInterface {
  validate(value: any) {
    // If no value or value is not a string or an empty string then omit check
    return !value || !value?.length ? true : checkParenthesis(value);
  }

  defaultMessage(): string {
    return 'parenthesis syntax is incorrect';
  }
}
