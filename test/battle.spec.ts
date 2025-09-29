import { spec } from 'pactum';
import { Character } from '../types/character';
import { BASE_URL } from '../config/apiConfig';

describe('Teste dos Endpoints de Batalha', () => {
  describe('POST /battle/:monster', () => {
    it('Deve simular e retornar batalha vencida pelo usuário quando o monstro é fraco', async () => {
      const userCharacter: Character = {
        name: 'Aragorn',
        strength: 21,
        dexterity: 13,
        hitPoints: 30,
        armorClass: 17
      };

      await spec()
        .post(`${BASE_URL}/battle/goblin`)
        .withJson(userCharacter)
        .expectStatus(200)
        .expectJsonLike({
          winner: 'Aragorn',
          battleLog: ['The battle begins!']
        });
    });

    it('Deve simular e retornar uma batalha vencida pelo monstro quando o personagem é fraco', async () => {
      const weakCharacter: Character = {
        name: 'Frodo',
        strength: 5,
        dexterity: 10,
        hitPoints: 10,
        armorClass: 12
      };

      await spec()
        .post(`${BASE_URL}/battle/adult-white-dragon`)
        .withJson(weakCharacter)
        .expectStatus(200)
        .expectJsonLike({
          winner: 'Adult White Dragon',
          battleLog: ['The battle begins!']
        });
    });

    it('Deve retornar 400 para um personagem inválido', async () => {
      const invalidCharacter = {
        name: 'Personagem Inválido',
        strength: 15,
        dexterity: 14,
        hitPoints: 0,
        armorClass: 16
      };

      await spec()
        .post(`${BASE_URL}/battle/goblin`)
        .withJson(invalidCharacter)
        .expectStatus(400);
    });
  });
});
