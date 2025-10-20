import { describe, it, expect } from 'vitest';
import { contactSchema } from '../contactSchema';

describe('contactSchema', () => {
  it('validates correct data', () => {
    const validData = {
      applicantName: 'Иван Иванов',
      class: 7,
      parentName: 'Петр Иванов',
      email: 'test@example.com',
      phone: '+7 (985) 123 45 67',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const invalidData = {
      applicantName: 'Иван Иванов',
      class: 7,
      parentName: 'Петр Иванов',
      email: 'invalid-email',
      phone: '+7 (985) 123 45 67',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('email');
    }
  });

  it('rejects empty applicant name', () => {
    const invalidData = {
      applicantName: '',
      class: 7,
      parentName: 'Петр Иванов',
      email: 'test@example.com',
      phone: '+7 (985) 123 45 67',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('validates phone number format', () => {
    const validData = {
      applicantName: 'Иван Иванов',
      class: 7,
      parentName: 'Петр Иванов',
      email: 'test@example.com',
      phone: '+7 (123) 456 78 90',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone format', () => {
    const invalidData = {
      applicantName: 'Иван Иванов',
      class: 7,
      parentName: 'Петр Иванов',
      email: 'test@example.com',
      phone: '89858757592', // Wrong format
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects invalid class number', () => {
    const invalidData = {
      applicantName: 'Иван Иванов',
      class: 15, // Invalid class
      parentName: 'Петр Иванов',
      email: 'test@example.com',
      phone: '+7 (985) 123 45 67',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects class below minimum', () => {
    const invalidData = {
      applicantName: 'Иван Иванов',
      class: 3, // Below minimum
      parentName: 'Петр Иванов',
      email: 'test@example.com',
      phone: '+7 (985) 123 45 67',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

