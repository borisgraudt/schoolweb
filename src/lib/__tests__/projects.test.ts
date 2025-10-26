import { describe, it, expect } from 'vitest';
import { projects } from '../projects';

describe('projects', () => {
  it('exports projects array', () => {
    expect(Array.isArray(projects)).toBe(true);
  });

  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required properties', () => {
    projects.forEach(project => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('image');
      expect(project).toHaveProperty('type');
      
      expect(typeof project.id).toBe('string');
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(typeof project.image).toBe('string');
      expect(typeof project.type).toBe('string');
    });
  });

  it('project titles are not empty', () => {
    projects.forEach(project => {
      expect(project.title.trim()).not.toBe('');
    });
  });

  it('project types are valid', () => {
    projects.forEach(project => {
      expect(['science', 'art']).toContain(project.type);
    });
  });
});
