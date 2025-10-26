import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkipToContent from '../SkipToContent';

describe('SkipToContent', () => {
  it('renders skip to content link', () => {
    render(<SkipToContent />);
    
    const link = screen.getByRole('link', { name: /перейти к основному содержимому/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has correct styling classes', () => {
    render(<SkipToContent />);
    
    const link = screen.getByRole('link', { name: /перейти к основному содержимому/i });
    expect(link).toHaveClass('sr-only', 'focus:not-sr-only');
  });
});
