import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ThemeToggle from '@/components/ThemeToggle';

const navList = [
  { id: 1, label: '关于我', link: '/' },
  { id: 2, label: '生活动态', link: '/moment' },
  { id: 3, label: '留言', link: '/comment' },
];

export default function Header() {
  const router = useRouter();
  const [linkStyleId, setLinkStyleId] = useState(1);

  useEffect(() => {
    const currentPath = router.pathname;
    const activeLink = navList.find((item) => item.link === currentPath);
    if (activeLink) {
      setLinkStyleId(activeLink.id);
    }
  }, [router.pathname]);

  return (
    <header className="md:flex md:justify-between overflow-hidden md:items-center md:h-header py-5 md:py-0">
      <div className="text-center md:mr-20">
        <Link href="/" className="inline-flex items-center gap-3 cursor-pointer group">
          {/* 艺术感 Logo - 水墨风格 */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* 水墨背景圆形 */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* 外圆 */}
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              {/* S形笔画 - 水墨风 */}
              <path
                d="M 24 8 Q 16 16 24 24 Q 32 32 24 40"
                stroke="url(#logoGrad)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="text-gray-800 dark:text-gray-200 transition-colors"
              />
              {/* 点缀 */}
              <circle cx="24" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
              <circle cx="24" cy="36" r="1.5" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>

          {/* 文字 Logo - 优雅字体 */}
          <span className="hidden sm:inline-block">
            <span className="block text-sm font-light tracking-widest text-gray-500 dark:text-gray-400 uppercase">
              portfolio
            </span>
            <span className="block text-xl font-serif font-light text-gray-900 dark:text-gray-100 leading-none">
              shkmzzh
            </span>
          </span>
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <ul className="flex justify-center items-center gap-x-3 gap-y-2 mt-10 md:mt-0">
          {navList.map((item) => {
            const isActive = linkStyleId === item.id;
            return (
              <li
                key={item.id}
                onClick={() => setLinkStyleId(item.id)}
                className={`
                  whitespace-nowrap text-center inline-block px-3 py-2 text-sm font-medium
                  transition-all duration-200 relative
                  ${isActive
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }
                `}
              >
                <Link className="whitespace-nowrap" href={item.link}>
                  {item.label}
                </Link>
                {/* 下划线动效 */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-800 dark:via-gray-200 to-transparent
                  transition-all duration-300
                  ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                `}></div>
              </li>
            );
          })}
        </ul>
        <ThemeToggle></ThemeToggle>
      </div>
    </header>
  );
}
