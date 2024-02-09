// test.js
const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')

})

it('API - listagem de usuarios', async () => {
    await spec()
        .get('/api/getUsers')
        .withHeaders("Authorization", token)
        .expectStatus(200)
        .expectJsonMatch({
            users: eachLike({
                "_id": like("657b05fe31b986f1c0a7a053"),
                email: like("cliente@ebac.art.br"),
                profile: {
                    firstName: like("Cliente")
                }
            })
        })
});
