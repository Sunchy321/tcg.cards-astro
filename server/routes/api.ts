import { Hono } from 'hono';
import type { User } from '../../src/types';

const api = new Hono();

// GET /api/hello
api.get('/hello', (c) => {
  return c.json({
    message: 'Hello from API endpoint!',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/users - Get user list
api.get('/users', (c) => {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  return c.json({
    success: true,
    data: users,
  });
});

// GET /api/users/:id - Get single user
api.get('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({
      success: false,
      error: 'Invalid user ID',
    }, 400);
  }

  const user: User = {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
  };

  return c.json({
    success: true,
    data: user,
  });
});

// POST /api/users - Create new user
api.post('/users', async (c) => {
  try {
    const body = await c.req.json<Partial<User>>();

    // Validate input
    if (!body.name || !body.email) {
      return c.json({
        success: false,
        error: 'Name and email are required',
      }, 400);
    }

    // Create new user (mock)
    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: body.name,
      email: body.email,
    };

    return c.json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    }, 201);
  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid request body',
    }, 400);
  }
});

// PUT /api/users/:id - Update user
api.put('/users/:id', async (c) => {
  const id = parseInt(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({
      success: false,
      error: 'Invalid user ID',
    }, 400);
  }

  try {
    const body = await c.req.json<Partial<User>>();

    const updatedUser: User = {
      id,
      name: body.name || `User ${id}`,
      email: body.email || `user${id}@example.com`,
    };

    return c.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid request body',
    }, 400);
  }
});

// DELETE /api/users/:id - Delete user
api.delete('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({
      success: false,
      error: 'Invalid user ID',
    }, 400);
  }

  return c.json({
    success: true,
    message: `User ${id} deleted successfully`,
  });
});

export default api;
