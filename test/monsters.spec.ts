import { spec } from 'pactum';
import { Character } from '../types/character';
import { BASE_URL } from '../config/apiConfig';

describe('Testes dos Endpoints de Monstros', () => {
  describe('GET /monsters/names/:page', () => {
    it('Deve retornar uma lista de nomes de monstros da página 1', async () => {
      await spec()
        .get(`${BASE_URL}/monsters/names/1`)
        .expectStatus(200)
        .expectJsonLike(['Aboleth']);
    });

    it('Deve retornar 500 para uma página inexistente', async () => {
      await spec().get(`${BASE_URL}/monsters/names/999`).expectStatus(500);
    });
  });

  describe('GET /monsters/:name', () => {
    it('Deve retornar os detalhes do monstro "Aboleth"', async () => {
      const expectedMonster: Character = {
        name: 'Aboleth',
        strength: 21,
        dexterity: 9,
        hit_points: 135,
        armor_class: 17
      };

      await spec()
        .get(`${BASE_URL}/monsters/aboleth`)
        .expectStatus(200)
        .expectJsonMatch(expectedMonster);
    });

    it('Deve retornar 500 para um monstro inexistente', async () => {
      await spec()
        .get(`${BASE_URL}/monsters/monstro-inexistente`)
        .expectStatus(500);
    });
  });
});
