import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // 检测当前系统主题
  const detectSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  // 主题状态，只会是 'light' 或 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    return (stored === 'light' || stored === 'dark') ? stored : detectSystemTheme();
  });

  // 监听系统主题变化 —— 始终覆盖当前 theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const sys = detectSystemTheme();
      applyTheme(sys);
      setTheme(sys);
      localStorage.setItem('theme', sys);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 应用主题到 <html>
  const applyTheme = (applied: 'light' | 'dark') => {
    if ((document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        document.documentElement.className = applied;
        document.documentElement.style.colorScheme = applied;
      });
    } else {
      document.documentElement.className = applied;
      document.documentElement.style.colorScheme = applied;
    }
  };

  // 初次渲染及 theme 变更时，应用主题并同步到 localStorage
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 切换主题：dark ⇄ light
  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <div>
      <p>当前主题：{theme}</p>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  );
}
