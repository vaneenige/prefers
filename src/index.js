const options = {
  'color-scheme': ['light', 'dark', 'no-preference'],
  'reduced-*': ['reduce', 'no-preference'],
};

function match(p, v) {
  return matchMedia(`(prefers-${p}: ${v})`).matches;
}

function setPrefers(property, value) {
  localStorage[value === false ? 'removeItem' : 'setItem'](`prefers-${property}`, value);
}

function prefers(property, value, fallback) {
  if (typeof window === 'undefined') return null;
  const reduced = property.indexOf('reduced') !== -1;
  // See if a preference is manually set
  const preference = localStorage.getItem(`prefers-${property}`);
  // If preference is set, return wether it matches
  if (preference !== null) {
    if (reduced) return true;
    if (value === undefined) return preference;
    return preference === value;
  }
  // Check all options to see which one matches
  const p = options[reduced ? 'reduced-*' : property].find((option) => match(property, option));
  // If reduced return boolean
  if (reduced) return p === 'reduce';
  // If value is empty, just return the match
  if (value === undefined) return p;
  // If match equals the value return ture
  if (p === value) return true;
  // If it should fallback to the value and no preference is set, return true
  return fallback && p === 'no-preference';
}

export { prefers, setPrefers };

