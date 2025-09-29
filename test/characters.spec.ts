import { spec } from 'pactum';
import { Character } from '../types/character';
import { BASE_URL } from '../config/apiConfig';

describe('Testes dos Endpoints de Personagens', () => {
  describe('GET /characters/example', () => {
    it('Deve retornar um personagem de exemplo', async () => {
      const exampleCharacter: Character = {
        name: 'Kaya',
        strength: 10,
        dexterity: 7,
        hitPoints: 11,
        armorClass: 12
      };

      await spec()
        .get(`${BASE_URL}/characters/example`)
        .expectStatus(200)
        .expectJsonMatch(exampleCharacter);
    });

    it('Deve retornar 405 para um método não permitido', async () => {
      await spec().post(`${BASE_URL}/characters/example`).expectStatus(405);
    });
  });

  describe('POST /characters/check', () => {
    it('Deve retornar 200 e o próprio personagem informado quando seus atributos são válidos', async () => {
      const validCharacter: Character = {
        name: 'Thorin',
        strength: 18,
        dexterity: 14,
        hitPoints: 30,
        armorClass: 16
      };

      await spec()
        .post(`${BASE_URL}/characters/check`)
        .withJson(validCharacter)
        .expectStatus(200)
        .expectJsonMatch(validCharacter);
    });

    it('Deve retornar 400 para um personagem com atributos inválidos', async () => {
      const invalidCharacter = {
        name: 'InvalidCharacter',
        strength: 15,
        dexterity: 14,
        hitPoints: 0,
        armorClass: 16
      };

      await spec()
        .post(`${BASE_URL}/characters/check`)
        .withJson(invalidCharacter)
        .expectStatus(400);
    });
  });
});
