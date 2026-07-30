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
    <header className="site-header">
      <div className="site-header__brand">
        <Link href="/" className="identity-link" aria-label="返回首页">
          <span className="identity-mark" aria-hidden="true">
            <svg viewBox="0 0 56 56" fill="none">
              <path d="M9 19V12.5L15.5 6H40.5L47 12.5V43.5L40.5 50H15.5L9 43.5V37" />
              <path d="M16 28H40" />
              <path d="M28 16V40" />
              <path d="M19 18L37 38" />
              <path d="M37 18L19 38" />
              <circle cx="28" cy="28" r="5.5" />
            </svg>
          </span>
          <span className="identity-copy">
            <span className="identity-kicker">NEURAL PORTFOLIO</span>
            <span className="identity-name">shkmzzh</span>
          </span>
        </Link>
      </div>

      <div className="site-header__controls">
        <ul className="nav-console">
          {navList.map((item) => {
            const isActive = linkStyleId === item.id;
            return (
              <li key={item.id}>
                <Link
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  href={item.link}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setLinkStyleId(item.id)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle></ThemeToggle>
      </div>
    </header>
  );
}
