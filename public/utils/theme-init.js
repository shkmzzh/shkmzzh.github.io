export function getThemeInitScript() {
  return `
    (function() {
      try {
        const stored = localStorage.getItem('theme');
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = stored === 'dark' || stored === 'light' ? stored : system;
        document.documentElement.className = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (_) {}
    })();
  `;
}
