import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>('system');

  // 初始化主题，从 localStorage 获取或者使用默认值
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'system';
    setTheme(storedTheme);
  }, []);

  // 检测系统主题
  const detectSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme(detectSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // 应用主题
  const applyTheme = (appliedTheme: string) => {
    if ((document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        document.documentElement.className = appliedTheme;
        document.documentElement.style.colorScheme = appliedTheme
      });
    } else {
      document.documentElement.className = appliedTheme;
      document.documentElement.style.colorScheme = appliedTheme
    }
  };

  // 更新主题
  useEffect(() => {
    const appliedTheme = theme === 'system' ? detectSystemTheme() : theme;
    applyTheme(appliedTheme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 切换主题：dark -> light -> system
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : prev === 'light' ? 'system' : 'dark'));
  };

  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  );
}
