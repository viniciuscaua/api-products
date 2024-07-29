const request = require('supertest');
const app = require('../index'); 

describe('API de Produtos', () => {
    it('deve criar um novo produto', async () => {
        const res = await request(app)
            .post('/produtos')
            .send({ nome: 'Carne', preco: 100 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe('Carne');
        expect(res.body.preco).toBe(100);
    });

    it('deve listar todos os produtos', async () => {
        await request(app)
            .post('/produtos')
            .send({ nome: 'Computador', preco: 900 });
        const res = await request(app).get('/produtos');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('deve obter um produto por ID', async () => {
        const novoProduto = await request(app)
            .post('/produtos')
            .send({ nome: 'Mouse', preco: 50 });
        const res = await request(app).get(`/produtos/${novoProduto.body.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe('Mouse');
        expect(res.body.preco).toBe(50);
    });

    it('deve atualizar um produto por ID', async () => {
        const produto = await request(app)
            .post('/produtos')
            .send({ nome: 'Mesa', preco: 400 });
        const res = await request(app)
            .put(`/produtos/${produto.body.id}`)
            .send({ nome: 'Produto Atualizado', preco: 500 });
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe('Produto Atualizado');
        expect(res.body.preco).toBe(500);
    });

    it('deve deletar um produto por ID', async () => {
        const produto = await request(app)
            .post('/produtos')
            .send({ nome: 'Ventilador', preco: 140 });
        const res = await request(app).delete(`/produtos/${produto.body.id}`);
        expect(res.statusCode).toBe(204);
        const checkRes = await request(app).get(`/produtos/${produto.body.id}`);
        expect(checkRes.statusCode).toBe(404);
    });
});
