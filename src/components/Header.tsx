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

  // 使用 useEffect 在组件加载时根据当前路径设置活动链接
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
        <Link
          className="inline-block cursor-pointer text-current logo"
          href={'/'}
        >
          <span className="leading-6 md:leading-7 tracking-wide inline-block px-3">
            shkmzzh
          </span>
        </Link>
      </div>

      <div className='flex justify-center items-center'>
        <ul className="flex justify-center items-center gap-x-3 gap-y-2 mt-10 md:mt-0">
          {navList.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => setLinkStyleId(item.id)}
                style={
                  linkStyleId === item.id ? { textDecorationLine: 'none' } : {}
                }
                className="whitespace-nowrap text-center inline-block px-1 bg-color text-sm underline underline-offset-4"
              >
                <Link className="whitespace-nowrap" href={item.link}>
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
