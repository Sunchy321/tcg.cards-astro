# Contributing Guide

Thank you for your interest in this project! This guide will help you get started with development quickly.

## 🚀 Before You Start

1. Fork this repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `bun install`
4. Create new branch: `git checkout -b feature/your-feature`

## 📋 Development Standards

### Code Style

- Use TypeScript
- Follow ESLint rules
- Use meaningful variable and function names
- Add appropriate comments

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code formatting adjustments
refactor: Refactor code
test: Add tests
chore: Build/tool changes
```

Examples:
```
feat(api): Add user authentication endpoint
fix(service): Fix incorrect status check return
docs: Update deployment guide
```

## 🔧 Development Workflow

### 1. Adding New API Endpoints

Add or modify routes in the `server/routes/` directory:

```typescript
// server/routes/api.ts
api.get('/new-endpoint', (c) => {
  return c.json({
    success: true,
    data: 'your data'
  });
});
```

### 2. Adding Type Definitions

Add types in `src/types.ts`:

```typescript
export interface YourType {
  id: number;
  name: string;
}
```

### 3. Testing Your Changes

```bash
# Start backend
bun run dev:worker

# Test in another terminal
curl http://localhost:8787/your-endpoint

# Or run test suite
bun run test:api
```

### 4. Update Documentation

If your changes affect how users use the project, update relevant documentation:
- README.md - Main features
- DEVELOPMENT.md - Development related
- DEPLOYMENT.md - Deployment related

## 🧪 Testing

### Adding API Tests

Add test cases in `scripts/test-api.ts`:

```typescript
const tests = [
  ['GET', '/your-endpoint'],
  ['POST', '/your-endpoint', { data: 'test' }],
];
```

### Running Tests

```bash
bun run test:api
```

## 📝 Pull Request Process

1. Ensure code passes all tests
2. Update related documentation
3. Push to your fork
4. Create Pull Request to main repository's `main` branch
5. Explain in PR description:
   - Purpose of changes
   - Implementation approach
   - Testing status
   - Related issues (if any)

### PR Template

```markdown
## Description
Briefly describe your changes

## Change Type
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Performance optimization
- [ ] Code refactor

## Testing Status
- [ ] Local tests passed
- [ ] Added corresponding test cases
- [ ] Updated documentation

## Screenshots (if applicable)
Add screenshots to help explain

## Related Issue
Closes #123
```

## 🏗️ Project Structure

```
src/
├── pages/          # Astro frontend pages
├── types.ts        # TypeScript type definitions
└── worker.ts       # Workers entry point

server/
├── index.ts        # Hono main app
└── routes/         # API routes
    ├── api.ts      # API endpoints
    └── service.ts  # Service endpoints

scripts/
└── test-api.ts     # Test script
```

## 💡 Best Practices

### API Design

1. **RESTful Style**
   - GET - Retrieve resources
   - POST - Create resources
   - PUT - Update resources
   - DELETE - Delete resources

2. **Unified Response Format**
```typescript
{
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
```

3. **Error Handling**
```typescript
try {
  // Processing logic
} catch (error) {
  return c.json({
    success: false,
    error: error.message
  }, 500);
}
```

### TypeScript

1. **Use Type Definitions**
```typescript
interface User {
  id: number;
  name: string;
}

api.get('/users/:id', async (c): Promise<User> => {
  // ...
});
```

2. **Avoid any**
Use specific types instead of `any`

### Performance

1. **Caching Strategy**
```typescript
return c.json(data, 200, {
  'Cache-Control': 'public, max-age=3600'
});
```

2. **Avoid Blocking Operations**
Use async/await for asynchronous operations

## 🐛 Reporting Bugs

Found a bug? Please create an Issue including:

1. Bug description
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Environment info (OS, Node version, etc.)
6. Screenshots or error logs

## 💬 Discussion

Have ideas or suggestions? Feel free to:
1. Create an Issue for discussion
2. Join Discord channel (if available)
3. Send email

## 📄 License

By contributing code, you agree that your contributions will be released under the MIT License.

## 🙏 Acknowledgments

Thanks to all developers who have contributed to this project!

---

**Happy coding!** 🎉
