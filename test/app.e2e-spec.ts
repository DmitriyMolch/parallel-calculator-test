import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Evaluates correctly', () => {
    it('valid expression', () => {
      const expression = '(1-1)2+3*(1-3+4)+10/2';
      const expected = { result: 11 };

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(200)
        .expect(expected);
    });

    it('valid expression with white spaces', () => {
      const expression = ' ( 1 - 1 ) * 2 + 3 * ( 1 - 3 + 4 ) + 10 / 2 ';
      const expected = { result: 11 };

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(200)
        .expect(expected);
    });

    it('valid expression with float numbers', () => {
      const expression = '(1.11-1.11)*2.1+3.12*(1.1-2.8+4.1)+10.2/2.2-0.1';
      const expected = { result: 12.024363636363637 };

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(200)
        .expect(expected);
    });

    it('valid expression with negative numbers', () => {
      const expression = '(-1-1)*2+3*(1-3+4)+(-10)/2';
      const expected = { result: -3 };

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(200)
        .expect(expected);
    });
  });

  describe('Fails on', () => {
    it('empty expression', () => {
      const expression = '';

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: ['expression should not be empty'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('null expression', () => {
      const expression = null;

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: [
            'expression should not be empty',
            'string expression should contain only numbers "0-9", parenthesis "()"  and operators "+-*/"',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('undefined expression', () => {
      const expression = undefined;

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: [
            'expression should not be empty',
            'string expression should contain only numbers "0-9", parenthesis "()"  and operators "+-*/"',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('wrong type expression', () => {
      const expression = 1;

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: [
            'string expression should contain only numbers "0-9", parenthesis "()"  and operators "+-*/"',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('expression with letters', () => {
      const expression = 'wrong+(1-1)*2+3*(1-3+4)+10/2';

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: [
            'string expression should contain only numbers "0-9", parenthesis "()"  and operators "+-*/"',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('expression with broken parenthesis', () => {
      const expression = '1-1)*2+3*(1-3+4)+10/2';

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: ['parenthesis syntax is incorrect'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('expression with operator after open parenthesis', () => {
      const expression = '(*1-1)*2+3*(1-3+4)+10/2';

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: ['parenthesis syntax is incorrect'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('expression with operator before close parenthesis', () => {
      const expression = '(*1-1)*2+3*(1-3+4)+10/2';

      return request(app.getHttpServer())
        .post('/evaluate')
        .send({ expression })
        .expect(400)
        .expect({
          message: ['parenthesis syntax is incorrect'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});
