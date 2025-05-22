'use client';
import { useState, useEffect } from 'react';
import LightIcon from '@/assets/light.svg';
import DarkIcon from '@/assets/dark.svg';

export default function ThemeToggle() {
  const detectSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // 默认先用 light 占位
  const [isMounted, setIsMounted] = useState(false); // 控制是否挂载完成

  // 初次挂载时再读取 localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial =
      stored === 'light' || stored === 'dark' ? stored : detectSystemTheme();
    setTheme(initial);
    setIsMounted(true);
  }, []);

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

  useEffect(() => {
    if (!isMounted) return;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const sys = detectSystemTheme();
      applyTheme(sys);
      setTheme(sys);
      localStorage.setItem('theme', sys);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isMounted]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  if (!isMounted) return null; // SSR 阶段避免渲染

  return (
    <div onClick={toggleTheme} className='p-1 bg-color ml-3'>
      {theme === 'dark' ? <DarkIcon /> : <LightIcon />}
    </div>
  );
}
