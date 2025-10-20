# Contributing Guidelines

Thank you for your interest in contributing to this project! This is a production application for a real educational organization, so we maintain high standards for code quality and reliability.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/schoolweb.git
   cd schoolweb
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Add your credentials
   ```
5. **Run development server:**
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### Before Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make sure everything works:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

### Making Changes

1. Write clean, readable code
2. Follow existing code style
3. Add comments for complex logic
4. Update documentation if needed

### Testing Your Changes

```bash
# Lint your code
npm run lint

# Check types
npm run type-check

# Build the project
npm run build

# Run tests (if available)
npm test
```

### Committing

We use conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
perf: performance improvements
test: add tests
chore: maintenance tasks
```

Example:
```bash
git commit -m "feat: add teacher search functionality"
```

### Submitting a Pull Request

1. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request on GitHub
3. Describe your changes clearly
4. Wait for review

## 🎯 Code Standards

### TypeScript

- Use strict TypeScript
- Define types for all props
- Avoid `any` type
- Use interfaces for object shapes

### React

- Use functional components
- Use hooks appropriately
- Keep components small and focused
- Extract reusable logic into custom hooks

### Styling

- Use Tailwind CSS utilities
- Follow Swiss Design principles
- Maintain consistent spacing
- Ensure mobile responsiveness

### Performance

- Optimize images
- Lazy load components when appropriate
- Minimize bundle size
- Use memoization when needed

## 🔒 Security

- Never commit sensitive data
- Use environment variables for secrets
- Validate all user inputs
- Follow OWASP best practices

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style
- [ ] All tests pass
- [ ] No linter errors
- [ ] TypeScript compiles without errors
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

## 🐛 Bug Reports

When reporting bugs, include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

## 💡 Feature Requests

When suggesting features:

- Explain the use case
- Describe expected behavior
- Consider implementation complexity
- Align with project goals

## 📞 Questions?

For questions about the project:
- Open an issue on GitHub
- Email: boris.graudt@gmail.com

## 📄 License

By contributing, you agree that your contributions will be part of this project under the same license.

---

Thank you for contributing! 🙏

