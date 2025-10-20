# Testing Guide

## 🧪 Testing Strategy

This project uses a comprehensive testing approach to ensure code quality and reliability.

## 📚 Tech Stack

- **Vitest** — Fast unit test runner
- **React Testing Library** — Component testing
- **jsdom** — DOM simulation
- **@testing-library/user-event** — User interaction simulation

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test File
```bash
npm test -- src/__tests__/components/FAQItem.test.tsx
```

## 📁 Test Structure

```
src/
├── __tests__/
│   ├── components/      # Component tests
│   │   └── FAQItem.test.tsx
│   ├── lib/            # Utility function tests
│   └── api/            # API route tests
├── components/
│   └── FAQItem.tsx
└── ...
```

## ✍️ Writing Tests

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const { user } = render(<MyComponent />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### API Route Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/contact/route';

describe('Contact API', () => {
  it('validates required fields', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

### Utility Function Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { formatPhone } from '@/lib/utils';

describe('formatPhone', () => {
  it('formats Russian phone numbers', () => {
    expect(formatPhone('79858757592')).toBe('+7 (985) 875-75-92');
  });

  it('handles invalid input', () => {
    expect(formatPhone('invalid')).toBe('');
  });
});
```

## 🎯 Testing Best Practices

### 1. **Test Behavior, Not Implementation**
```typescript
// ✅ Good: Test what the user sees
it('displays error message on invalid input', () => {
  render(<LoginForm />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Email is required')).toBeInTheDocument();
});

// ❌ Bad: Test internal state
it('sets error state', () => {
  const { result } = renderHook(() => useState(''));
  expect(result.current[0]).toBe('');
});
```

### 2. **Use Accessible Queries**
```typescript
// ✅ Good: Accessible queries
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');
screen.getByPlaceholderText('Enter your name');

// ❌ Bad: Implementation-specific queries
screen.getByClassName('submit-btn');
screen.getByTestId('email-input');
```

### 3. **Test User Interactions**
```typescript
it('submits form on enter key', async () => {
  const user = userEvent.setup();
  render(<SearchForm />);
  
  const input = screen.getByRole('textbox');
  await user.type(input, 'test query{Enter}');
  
  expect(screen.getByText('Results for: test query')).toBeInTheDocument();
});
```

### 4. **Mock External Dependencies**
```typescript
import { vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test' }),
  })
);

it('fetches data successfully', async () => {
  // ... test using mocked fetch
});
```

### 5. **Test Accessibility**
```typescript
it('has proper ARIA attributes', () => {
  render(<Accordion />);
  const button = screen.getByRole('button');
  
  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
});
```

## 📊 Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| **Overall** | 80%+ | TBD |
| **Components** | 85%+ | TBD |
| **Utilities** | 90%+ | TBD |
| **API Routes** | 75%+ | TBD |

## 🔍 What to Test

### ✅ Must Test
- User interactions (clicks, typing, navigation)
- Form validation and submission
- API endpoints (success and error cases)
- Error boundaries and fallbacks
- Accessibility (ARIA, keyboard navigation)
- Conditional rendering
- Data fetching and loading states

### ⚠️ Nice to Test
- Animation states
- Responsive behavior
- Theme switching
- Internationalization

### ❌ Don't Test
- Third-party library internals
- Next.js framework code
- Styling (use visual regression testing instead)
- Environment-specific behavior

## 🐛 Debugging Tests

### Enable Debug Output
```typescript
import { render, screen } from '@testing-library/react';
import { debug } from '@testing-library/react';

it('debugs component', () => {
  render(<MyComponent />);
  screen.debug(); // Prints DOM
});
```

### Use --ui Flag
```bash
npm test -- --ui
```

### Check Query Results
```typescript
// See all matching elements
screen.getAllByRole('button').forEach(button => {
  console.log(button.textContent);
});
```

## 🚫 Common Pitfalls

### 1. **Not Waiting for Async Updates**
```typescript
// ❌ Bad
it('loads data', () => {
  render(<DataComponent />);
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});

// ✅ Good
it('loads data', async () => {
  render(<DataComponent />);
  expect(await screen.findByText('Data loaded')).toBeInTheDocument();
});
```

### 2. **Testing Implementation Details**
```typescript
// ❌ Bad
expect(component.state.count).toBe(5);

// ✅ Good
expect(screen.getByText('Count: 5')).toBeInTheDocument();
```

### 3. **Not Cleaning Up**
```typescript
// ✅ Good: Automatic cleanup with afterEach
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

## 📈 CI/CD Integration

Tests run automatically on:
- Every push to `main`
- Every pull request
- Before deployment

See `.github/workflows/ci.yml` for configuration.

## 🔗 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://testing-library.com/docs/queries/about#priority)

---

**Last Updated:** January 2025  
**Maintainer:** [@borisgraudt](https://github.com/borisgraudt)

