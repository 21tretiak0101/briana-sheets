export function debounce(callback, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      callback(...args);
    };
    timeout = setTimeout(later, wait);
  };
}
