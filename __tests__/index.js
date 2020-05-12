import { prefers, setPrefers } from '../src';

function mockMatchMedia(property, value) {
  global.matchMedia = (media) => {
    return { matches: media === `(prefers-${property}: ${value})` };
  };
}

const storage = new Map();
global.localStorage = {
  getItem: (key) => storage.get(key) || null,
  setItem: (key, value) => storage.set(key, value),
  clear: storage.clear(),
};

describe('prefers', () => {
  beforeEach(() => {
    localStorage.clear();
    global.window = true;
  });

  it('should include a prefers function', () => {
    expect(typeof prefers).toBe('function');
  });

  it('should include a setPrefers function', () => {
    expect(typeof prefers).toBe('function');
  });

  it('should not break with server side rendering', () => {
    delete global.window;
    expect(prefers()).toBe(null);
  });

  describe('color-scheme', () => {
    it('should match the light color scheme', () => {
      mockMatchMedia('color-scheme', 'light');
      expect(prefers('color-scheme')).toBe('light');
      expect(prefers('color-scheme', 'light')).toBe(true);
    });
    it('should match the dark color scheme', () => {
      mockMatchMedia('color-scheme', 'dark');
      expect(prefers('color-scheme')).toBe('dark');
      expect(prefers('color-scheme', 'dark')).toBe(true);
    });
    it('should match the no-preference color scheme', () => {
      mockMatchMedia('color-scheme', 'no-preference');
      expect(prefers('color-scheme')).toBe('no-preference');
      expect(prefers('color-scheme', 'no-preference')).toBe(true);
    });
    it("should optionally fallback if there's no preference", () => {
      mockMatchMedia('color-scheme', 'no-preference');
      expect(prefers('color-scheme', 'light', true)).toBe(true);
      mockMatchMedia('color-scheme', 'dark');
      expect(prefers('color-scheme', 'light', true)).toBe(false);
    });
    it('should respect manually set preference', () => {
      setPrefers('color-scheme', 'dark');
      mockMatchMedia('color-scheme', 'light');
      expect(prefers('color-scheme')).toBe('dark');
      expect(prefers('color-scheme', 'dark')).toBe(true);
    });
    it('should remove preference provided false', () => {
      mockMatchMedia('color-scheme', 'light');
      setPrefers('color-scheme', 'dark');
      expect(prefers('color-scheme')).toBe('dark');
      setPrefers('color-scheme', false);
      expect(prefers('color-scheme')).toBe('light');
    });
  });

  describe('reduced-*', () => {
    it('should match the reduced motion', () => {
      mockMatchMedia('reduced-motion', 'reduce');
      expect(prefers('reduced-motion')).toBe(true);
    });
    it('should respect manually set preference', () => {
      setPrefers('reduced-motion', 'reduce');
      mockMatchMedia('reduced-motion', 'reduce');
      expect(prefers('reduced-motion')).toBe(true);
    });
  });
});
