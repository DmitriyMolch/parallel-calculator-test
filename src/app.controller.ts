import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EvaluateReqDto, EvaluateResDto } from './evaluate.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('evaluate')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Validator status object.',
    type: EvaluateResDto,
  })
  @UsePipes(
    new ValidationPipe({ transform: false, disableErrorMessages: false }),
  )
  evaluate(@Body() body: EvaluateReqDto): EvaluateResDto {
    return { result: this.appService.evaluate(body.expression) };
  }
}
