import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FAQItem from '../FAQItem';

describe('FAQItem', () => {
  const mockQuestion = 'Test Question?';
  const mockAnswer = 'Test answer content.';

  it('renders question correctly', () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} />);
    expect(screen.getByText(mockQuestion)).toBeDefined();
  });

  it('renders button with correct role', () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} />);
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
  });

  it('shows answer when clicked', async () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Wait for animation and check answer is visible
    await waitFor(() => {
      expect(screen.getByText(mockAnswer)).toBeDefined();
    });
  });

  it('button contains the plus icon', () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} />);
    expect(screen.getByText('+')).toBeDefined();
  });
});

