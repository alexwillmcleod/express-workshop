import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// POST - Create todo route
// Body parameters: title and description
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (title == null || description == null)
    return res
      .status(400)
      .send('Must have `title` and `description` in request body');

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
    },
  });
  return res.status(200).json(todo);
});

// GET - Get todos
router.get('/', async (req, res) => {
  const todos = await prisma.todo.findMany();
  return res.status(200).json(todos);
});

// DELETE - Remove a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (id == null)
    return res
      .status(400)
      .send('Required parameter `id` is missing in request');
  const todo = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  return res.status(200).json(todo);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (id == null)
    return res
      .status(400)
      .send('Required parameter `id` is missing in request');
  if (title == null || description == null)
    return res
      .status(400)
      .send('Required fields in body `title` and `description` are missing');
  const todo = await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      description,
    },
  });
  return res.status(200).json(todo);
});

export default router;
