const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {id: uuid(), title, url, techs, likes:0};

  repositories.push(repository);

  return res.json(repository);

});

app.get('/repositories', (req, res) => {
  return res.json(repositories);
});

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const { title, url, techs} = req.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0 ) {
    return res.status(400).json({error: 'Repository not Found'})
  }

  const repository = {
    id,
    title,
    url,
    techs
  }

  repositories[repositoryIndex] = repository;

  return res.json(repository);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0 ) {
    return res.status(400).json({error: 'Repository not Found'})
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0 ) {
    return res.status(400).json({error: 'Repository not Found'});
  }

  repositories[repositoryIndex].likes++;

  return res.json(repositories[repositoryIndex]);
});

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
});