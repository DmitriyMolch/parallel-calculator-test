import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const error = new Error('Expression format is incorrect');

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Evaluates correctly on', () => {
    it('valid expression', () => {
      const expression = '(1-1)*2+3*(1-3+4)+10/2';
      const expected = { result: 11 };
      expect(appController.evaluate({ expression })).toStrictEqual(expected);
    });

    it('valid expression with white spaces', () => {
      const expression = ' ( 1 - 1 ) * 2 + 3 * ( 1 - 3 + 4 ) + 10 / 2 ';
      const expected = { result: 11 };
      expect(appController.evaluate({ expression })).toStrictEqual(expected);
    });

    it('valid expression with float numbers"', () => {
      const expression = '(1.1-1.1)*2+3*(1-3+4)+10/2';
      const expected = { result: 11 };
      expect(appController.evaluate({ expression })).toStrictEqual(expected);
    });
  });

  describe('Fails on', () => {
    it('empty expression', () => {
      const expression = '';
      try {
        appController.evaluate({ expression });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });

    it('null expression', () => {
      const expression = null;
      try {
        appController.evaluate({ expression });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });

    it('undefined expression', () => {
      const expression = null;
      try {
        appController.evaluate({ expression });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });

    it('wrong type expression', () => {
      const expression = 1;
      try {
        appController.evaluate({ expression: expression as unknown as string });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });

    it('expression contains letters', () => {
      const expression = 'wrong+(1-1)*2+3*(1-3+4)+10/2';
      try {
        appController.evaluate({ expression });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });

    it('expression with broken parenthesis', () => {
      const expression = '1-1)*2+3*(1-3+4)+10/2';
      try {
        appController.evaluate({ expression });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });

    it('expression with operator after open parenthesis', () => {
      const expression = '(*1-1)*2+3*(1-3+4)+10/2';
      try {
        appController.evaluate({ expression });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });

    it('expression with operator before close parenthesis', () => {
      const expression = '(1-1*)*2+3*(1-3+4)+10/2';
      try {
        appController.evaluate({ expression });
      } catch (err) {
        expect(err).toStrictEqual(error);
      }
    });
  });
});
