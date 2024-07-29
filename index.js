const express = require('express');
const app = express();

app.use(express.json());

let produtos = [];

// Criar um novo produto
app.post('/produtos', (req, res) => {
    const produto = req.body;
    produto.id = produtos.length + 1;
    produtos.push(produto);
    res.status(201).json(produto);
});

// Listar todos os produtos
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

// Obter um produto específico por ID
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// Atualizar um produto existente por ID
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos[index] = { id, ...req.body };
        res.status(200).json(produtos[index]);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// Deletar um produto por ID
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    produtos = produtos.filter(p => p.id !== id);
    res.status(204).send();
});

module.exports = app;
