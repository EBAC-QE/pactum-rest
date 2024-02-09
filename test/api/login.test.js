const { spec } = require('pactum')

it('API - deve autenticar o usuario corretamente', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .expectStatus(200)
        .expectJson('success', true)
});