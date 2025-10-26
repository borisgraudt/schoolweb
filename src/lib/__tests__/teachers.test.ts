import { describe, it, expect } from 'vitest';
import teachers from '../teachers';

describe('teachers', () => {
  it('exports teachers array', () => {
    expect(Array.isArray(teachers)).toBe(true);
  });

  it('has at least one teacher', () => {
    expect(teachers.length).toBeGreaterThan(0);
  });

  it('each teacher has required properties', () => {
    teachers.forEach(teacher => {
      expect(teacher).toHaveProperty('name');
      expect(teacher).toHaveProperty('image');
      expect(teacher).toHaveProperty('description');
      
      expect(typeof teacher.name).toBe('string');
      expect(typeof teacher.image).toBe('string');
      expect(typeof teacher.description).toBe('string');
    });
  });

  it('teacher names are not empty', () => {
    teachers.forEach(teacher => {
      expect(teacher.name.trim()).not.toBe('');
    });
  });

  it('teacher images are valid paths', () => {
    teachers.forEach(teacher => {
      expect(teacher.image).toMatch(/^\/images\/.+/);
    });
  });
});
