const express = require('express');
const cors = require('cors');

// Start up express server.
const app = express();
const port = 5000;

const { Task } = require('./db');
const { Http404 } = require('./errors');

// Set up CORS since the client is on a different port.
app.use(cors());
app.use(express.json());

// List tasks
app.get('/api/tasks', (req, res) => {
  const { status } = req.query;

  Task.findAll({
    where: {
      ...(status ? { status } : undefined),
    },
  })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.json({ error: err.message, code: err.code || 500 });
    });
});

// Create a task
app.post('/api/tasks', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  Task.create({ name })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json({ error: err.message, code: err.code || 500 });
    });
});

// Update a task
app.patch('/api/tasks/:id', (req, res) => {
  const changes = req.body;
  if (Object.keys(changes).length === 0) {
    return res.status(400).json({ error: 'No updates provided' });
  }

  Task.findByPk(req.params.id)
    .then((task) => {
      if (!task) {
        throw new Http404('No task found');
      }

      return task.update(changes).then((updatedTask) => res.json(updatedTask));
    })
    .catch((err) => {
      res.json({ error: err.message, code: err.code || 500 });
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
