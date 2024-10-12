import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsNotEmpty, Validate } from 'class-validator';
import { HasBalancedParenthesis } from './has-balanced-parenthesis.validator';

/**
 *
 */
export class EvaluateReqDto {
  @ApiProperty({
    description: 'Evaluation expression',
    example: '(1-1)*2+3*(1-3+4)+10/2',
  })
  @Validate(HasBalancedParenthesis)
  @Matches(/^(\([\d(\.\d+)?+\-*\/\s]*\)|[\d(\.\d+)?+\-*\/\s]*)+$/, {
    message:
      'string expression should contain only numbers "0-9", parenthesis "()"  and operators "+-*/"',
  })
  @IsNotEmpty()
  expression: string;
}

/**
 *
 */
export class EvaluateResDto {
  @ApiProperty({
    description: 'Evaluation result',
    type: Number,
    example: 11,
  })
  result: number;
}
