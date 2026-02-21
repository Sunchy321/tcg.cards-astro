# API Reference

This document describes all available API endpoints in detail.

## Basic Information

- **Base URL (Development)**: `http://localhost:8787`
- **Base URL (Production)**: `https://your-worker.workers.dev`
- **Content-Type**: `application/json`
- **Character Encoding**: `UTF-8`

## Table of Contents

- [Root Endpoint](#root-endpoint)
- [API Routes (/api)](#api-routes)
  - [Hello](#hello)
  - [Users](#users)
- [Service Routes (/service)](#service-routes)
  - [Status](#status)
  - [Info](#info)
  - [Ping](#ping)
  - [Echo](#echo)

---

## Root Endpoint

### GET /

Get API server basic information.

**Request Example:**
```bash
curl http://localhost:8787/
```

**Response:**
```json
{
  "status": "ok",
  "message": "Hono API server is running",
  "endpoints": {
    "api": "/api/*",
    "service": "/service/*"
  },
  "timestamp": "2026-02-21T05:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success

---

## API Routes

All API routes start with `/api`.

### Hello

#### GET /api/hello

Simple greeting endpoint for testing API connectivity.

**Request Example:**
```bash
curl http://localhost:8787/api/hello
```

**Response:**
```json
{
  "message": "Hello from API endpoint!",
  "timestamp": "2026-02-21T05:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success

---

### Users

User-related CRUD operation endpoints.

#### GET /api/users

Get user list.

**Request Example:**
```bash
curl http://localhost:8787/api/users
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com"
    },
    {
      "id": 3,
      "name": "Charlie",
      "email": "charlie@example.com"
    }
  ]
}
```

**Status Codes:**
- `200` - Success

---

#### GET /api/users/:id

Get specified user information.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | User ID |

**Request Example:**
```bash
curl http://localhost:8787/api/users/1
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "User 1",
    "email": "user1@example.com"
  }
}
```

**Error Response (Invalid ID):**
```json
{
  "success": false,
  "error": "Invalid user ID"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid user ID)

---

#### POST /api/users

Create new user.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Username |
| email | string | Yes | Email address |

**Request Example:**
```bash
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

**Success Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (Missing Fields):**
```json
{
  "success": false,
  "error": "Name and email are required"
}
```

**Status Codes:**
- `201` - Created Successfully
- `400` - Bad Request (missing required fields or invalid request body)

---

#### PUT /api/users/:id

Update specified user information.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | User ID |

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Username |
| email | string | No | Email address |

**Request Example:**
```bash
curl -X PUT http://localhost:8787/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com"
  }'
```

**Success Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

**Error Response (Invalid ID):**
```json
{
  "success": false,
  "error": "Invalid user ID"
}
```

**Status Codes:**
- `200` - Updated Successfully
- `400` - Bad Request (invalid user ID or request body)

---

#### DELETE /api/users/:id

Delete specified user.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | User ID |

**Request Example:**
```bash
curl -X DELETE http://localhost:8787/api/users/1
```

**Success Response:**
```json
{
  "success": true,
  "message": "User 1 deleted successfully"
}
```

**Error Response (Invalid ID):**
```json
{
  "success": false,
  "error": "Invalid user ID"
}
```

**Status Codes:**
- `200` - Deleted Successfully
- `400` - Bad Request (invalid user ID)

---

## Service Routes

All Service routes start with `/service`, used for system services and health checks.

### Status

#### GET /service/status

Get service health status.

**Request Example:**
```bash
curl http://localhost:8787/service/status
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-21T05:00:00.000Z",
  "environment": "Cloudflare Workers"
}
```

**Status Codes:**
- `200` - Service Healthy

---

### Info

#### GET /service/info

Get service detailed information.

**Request Example:**
```bash
curl http://localhost:8787/service/info
```

**Response:**
```json
{
  "name": "Astro + Hono Service",
  "version": "1.0.0",
  "environment": "Cloudflare Workers",
  "endpoints": {
    "api": "/api/*",
    "service": "/service/*"
  }
}
```

**Status Codes:**
- `200` - Success

---

### Ping

#### GET /service/ping

Quick ping test endpoint.

**Request Example:**
```bash
curl http://localhost:8787/service/ping
```

**Response:**
```json
{
  "pong": true,
  "timestamp": 1708495200000
}
```

**Status Codes:**
- `200` - Success

---

### Echo

#### POST /service/echo

Echo request data for testing.

**Request Body:**
Any JSON data

**Request Example:**
```bash
curl -X POST http://localhost:8787/service/echo \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, World!",
    "data": [1, 2, 3]
  }'
```

**Response:**
```json
{
  "echo": {
    "message": "Hello, World!",
    "data": [1, 2, 3]
  },
  "receivedAt": "2026-02-21T05:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success

---

## Error Responses

All endpoints return a unified error format when errors occur:

```json
{
  "success": false,
  "error": "Error description"
}
```

### Common Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created Successfully |
| 400 | Bad Request (parameter error, validation failed, etc.) |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Current version has no rate limiting, but recommendations:
- Control request frequency reasonably
- Use appropriate caching strategies
- Avoid sending oversized request bodies

Future versions may add rate limiting:
- Free users: 100 requests/minute
- Paid users: 1000 requests/minute

---

## CORS

All endpoints have CORS enabled, supporting cross-origin requests.

**Response Headers:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Authentication

Current version has no authentication implemented.

Future versions will support:
- JWT Token authentication
- API Key authentication
- OAuth 2.0

---

## Example Code

### JavaScript/TypeScript

```typescript
// Get user list
async function getUsers() {
  const response = await fetch('http://localhost:8787/api/users');
  const data = await response.json();
  return data;
}

// Create user
async function createUser(name: string, email: string) {
  const response = await fetch('http://localhost:8787/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });
  const data = await response.json();
  return data;
}
```

### Python

```python
import requests

# Get user list
def get_users():
    response = requests.get('http://localhost:8787/api/users')
    return response.json()

# Create user
def create_user(name, email):
    data = {'name': name, 'email': email}
    response = requests.post('http://localhost:8787/api/users', json=data)
    return response.json()
```

### cURL

```bash
# Get user list
curl http://localhost:8787/api/users

# Create user
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# Update user
curl -X PUT http://localhost:8787/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane"}'

# Delete user
curl -X DELETE http://localhost:8787/api/users/1
```

---

## Testing Tools

Recommended tools for API testing:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [HTTPie](https://httpie.io/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)

Or use the project's built-in test script:
```bash
bun run test:api
```

---

## Changelog

### v1.0.0 (2026-02-21)
- ✅ Initial release
- ✅ API routes (Users CRUD)
- ✅ Service routes (Status, Info, Ping, Echo)
- ✅ CORS support

### Planned
- [ ] Database integration
- [ ] Authentication
- [ ] Rate limiting
- [ ] WebSocket support

---

## Getting Help

- 📖 [Complete Documentation](README.md)
- 🐛 [Report Bug](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

---

**Last Updated**: 2026-02-21
