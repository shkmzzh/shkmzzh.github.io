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
      content: '周末在咖啡馆边写代码边享受阳光，生活与工作的完美平衡。代码即艺术。',
      images: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224d10?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      ],
      timestamp: '2024-06-10 14:30',
      likes: 28,
      comments: 5,
      liked: false,
      tags: ['生活', '咖啡', '编程']
    },
    {
      id: 2,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '今天完成了新项目的重构，使用 React 18 的最新特性，性能提升了 40%！',
      images: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop'
      ],
      timestamp: '2024-06-09 10:15',
      likes: 35,
      comments: 8,
      liked: false,
      tags: ['React', 'Performance']
    },
    {
      id: 3,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '参加了线上技术分享会，学到了很多关于 WebAssembly 的知识。前端的世界真是无止境！',
      images: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'
      ],
      timestamp: '2024-06-08 16:45',
      likes: 18,
      comments: 6,
      liked: false,
      tags: ['Learning', 'WebAssembly']
    },
    {
      id: 4,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '今天在图书馆度过了整个下午，学习新技术栈，记录灵感。知识就是力量。',
      images: [
        'https://images.unsplash.com/photo-1507842072343-583f20270319?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop'
      ],
      timestamp: '2024-06-07 09:20',
      likes: 22,
      comments: 7,
      liked: false,
      tags: ['学习', '灵感']
    },
    {
      id: 5,
      avatar: '👨‍💻',
      name: '萧家萧飞',
      content: '周末与朋友游览城市风景，记录生活中的美好时刻。工作再忙也要享受生活。',
      images: [
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop'
      ],
      timestamp: '2024-06-06 20:10',
      likes: 42,
      comments: 12,
      liked: false,
      tags: ['生活', '旅行', '摄影']
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
    <main className="py-16 md:py-24">
      <Card>
        <article className="p-8 md:p-12">
          <header className="mb-12">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              生活动态
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              分享前端开发的日常与生活中的美好时刻
            </p>
          </header>

          {/* Moments List */}
          <div className="space-y-8">
            {moments.map((moment) => (
              <div
                key={moment.id}
                className="pb-8 border-b border-gray-200 dark:border-gray-800 last:border-b-0 last:pb-0 group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    {moment.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {moment.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {moment.timestamp}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {moment.content}
                </p>

                {/* Images Gallery */}
                {moment.images.length > 0 && (
                  <div className={`mb-4 grid gap-2 ${
                    moment.images.length === 1 ? 'grid-cols-1' :
                    moment.images.length === 2 ? 'grid-cols-2' :
                    moment.images.length === 3 ? 'grid-cols-3' :
                    'grid-cols-3'
                  }`}>
                    {moment.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
                      >
                        <img
                          src={img}
                          alt={`Moment ${moment.id} Image ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
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
                        className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-3 text-sm">
                  <button
                    onClick={() => toggleLike(moment.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                      moment.liked
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{moment.liked ? '❤️' : '🤍'}</span>
                    <span className="font-medium">{moment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                    <span>💬</span>
                    <span className="font-medium">{moment.comments}</span>
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
