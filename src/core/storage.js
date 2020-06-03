export function storage(key, data = null) {
  if (!data) {
    const state = localStorage.getItem(key);
    return JSON.parse(state);
  }
  localStorage.setItem(key, JSON.stringify(data));
}
