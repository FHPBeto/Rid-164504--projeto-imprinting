const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// ROTA: Criar Investidor
app.post('/investidores', async (req, res) => {
  const { nome, email, valor } = req.body;
  const novo = await prisma.investidor.create({
    data: { nome, email, valor: String(valor) }
  });
  res.json(novo);
});

// ROTA: Listar todos
app.get('/investidores', async (req, res) => {
  const todos = await prisma.investidor.findMany();
  res.json(todos);
});

// ROTA: Eliminar
app.delete('/investidores/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.investidor.delete({ where: { id: Number(id) } });
  res.json({ message: "Eliminado!" });
});

app.listen(3000, () => console.log("🚀 Servidor Real rodando na porta 3000"));
