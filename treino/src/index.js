const express = require('express');
const app = express();
const { ligar } = require('./config/connector');
const cors = require('cors');
const PORT = 3000;
const rotas = require('./users/root');
const rotastarefas = require('./tarefas/tarefasrotas');
const errorhandler = require('./middleware/errorhandler');


ligar();

app.use(cors());
app.use(express.json());

app.use('/users', rotas);
app.use('/tarefas', rotastarefas);
app.use(errorhandler);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));