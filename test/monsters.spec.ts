import { spec } from 'pactum';

const BASE_URL = 'https://dnd-combat-api-7f3660dcecb1.herokuapp.com/';

describe('GET /monsters/:page', () => {
  it('Deve retornar uma lista de nomes de monstros da página 1', async () => {
    await spec()
      .get(`${BASE_URL}/monsters/1`)
      .expectStatus(200)
      .expectJsonLike(["Aboleth"]);
  });
});
