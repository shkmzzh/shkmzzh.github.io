import Layout from '@/components/Layout';
import { ReactElement, useState } from 'react';
import Card from '@/components/Card';

interface Moment {
  id: number;
  avatar: string;
  name: string;
  content: string;
  images: string[];
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  tags?: string[];
}

export default function Moment() {
  const [moments, setMoments] = useState<Moment[]>([
    {
      id: 1,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '今天完成了新项目的重构，使用 React 18 的最新特性，性能提升了 40%！🚀',
      images: ['📊'],
      timestamp: '2024-06-10 14:30',
      likes: 12,
      comments: 3,
      liked: false,
      tags: ['React', 'Performance']
    },
    {
      id: 2,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '刚刚发布了个人博客的新版本，支持深色模式和响应式设计。欢迎大家来访问 ✨',
      images: ['🌙', '📱'],
      timestamp: '2024-06-09 10:15',
      likes: 28,
      comments: 8,
      liked: false,
      tags: ['Web Design']
    },
    {
      id: 3,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '参加了线上技术分享会，学到了很多关于 WebAssembly 的知识。前端的世界真是无止境啊！',
      images: ['📚'],
      timestamp: '2024-06-08 16:45',
      likes: 15,
      comments: 5,
      liked: false,
      tags: ['Learning', 'WebAssembly']
    },
    {
      id: 4,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '今天用 TypeScript 重写了一个复杂的状态管理逻辑，代码质量显著提升。类型安全真的很重要！💪',
      images: ['🔧'],
      timestamp: '2024-06-07 09:20',
      likes: 18,
      comments: 4,
      liked: false,
      tags: ['TypeScript', 'Architecture']
    },
    {
      id: 5,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '周末完成了一个有趣的前端小项目，用 Canvas 实现了一个交互式可视化效果。编程就是艺术！🎨',
      images: ['🎨', '✨'],
      timestamp: '2024-06-06 20:10',
      likes: 35,
      comments: 12,
      liked: false,
      tags: ['Canvas', 'Creative']
    }
  ]);

  const toggleLike = (id: number) => {
    setMoments(moments.map(moment =>
      moment.id === id
        ? {
            ...moment,
            liked: !moment.liked,
            likes: moment.liked ? moment.likes - 1 : moment.likes + 1
          }
        : moment
    ));
  };

  return (
    <main className="py-10 md:py-20">
      <Card>
        <article className="p-6 md:p-8">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">生活动态</h1>
            <p className="text-gray-600 dark:text-gray-400">
              分享我的前端开发日常和技术见解
            </p>
          </header>

          {/* Moments List */}
          <div className="space-y-6">
            {moments.map((moment) => (
              <div
                key={moment.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-5 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-lg">
                      {moment.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {moment.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {moment.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-sm md:text-base">
                  {moment.content}
                </p>

                {/* Images/Emojis */}
                {moment.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {moment.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center text-3xl md:text-4xl"
                      >
                        {img}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {moment.tags && moment.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {moment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700 text-sm">
                  <button
                    onClick={() => toggleLike(moment.id)}
                    className={`flex items-center gap-1 px-3 py-2 rounded transition-colors ${
                      moment.liked
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{moment.liked ? '❤️' : '🤍'}</span>
                    <span>{moment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <span>💬</span>
                    <span>{moment.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State Message */}
          <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">更多精彩内容敬请期待... 📝</p>
          </div>
        </article>
      </Card>
    </main>
  );
}

Moment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
