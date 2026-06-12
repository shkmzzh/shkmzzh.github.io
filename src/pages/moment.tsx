import Layout from '@/components/Layout';
import { ReactElement, useState } from 'react';
import Card from '@/components/Card';

interface Moment {
  id: number;
  avatar: string;
  name: string;
  content: string;
  images: { src: string; live?: string }[];
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
      avatar: '✨',
      name: '青春物语',
      content: '冬天的樱花树下，雪花飘落。回忆起那些青涩而珍贵的时光，和她在一起的每一刻都闪闪发光。',
      images: [
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop' },
      ],
      timestamp: '2024-06-15 18:30',
      likes: 156,
      comments: 28,
      liked: false,
      tags: ['青春猪头少年', '回忆', '樱花']
    },
    {
      id: 2,
      avatar: '🎭',
      name: '第二人生',
      content: '又一次重新开始，回到高中时代。珍惜每一个能改变的时刻，去弥补曾经的遗憾。这一次，我们不会再错过。',
      images: [
        { src: 'https://images.unsplash.com/photo-1516414447565-b46a149bff3b?w=800&h=800&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=800&fit=crop' },
      ],
      timestamp: '2024-06-14 15:45',
      likes: 203,
      comments: 35,
      liked: false,
      tags: ['ReLife', '重生', '青春']
    },
    {
      id: 3,
      avatar: '⚔️',
      name: '问剑之行',
      content: '穿越诡异的副本世界，一步步提升实力。剑来剑往，修行的路上充满了未知的冒险和惊喜。',
      images: [
        { src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=800&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1518611505868-48510c2e2e3f?w=800&h=800&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=800&fit=crop' },
      ],
      timestamp: '2024-06-13 12:20',
      likes: 287,
      comments: 42,
      liked: false,
      tags: ['剑来', '冒险', '修行']
    },
    {
      id: 4,
      avatar: '🌙',
      name: '夜间时光',
      content: '在寂静的夜晚，思考人生的意义。那些深夜的对话，那些星空下的约定，都成了心中最温暖的回忆。',
      images: [
        { src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=800&fit=crop' },
      ],
      timestamp: '2024-06-12 21:10',
      likes: 178,
      comments: 31,
      liked: false,
      tags: ['夜景', '独白', '思考']
    },
    {
      id: 5,
      avatar: '🎪',
      name: '日常碎片',
      content: '学校的走廊、教室里的欢笑、食堂排队的时刻...这些再普通不过的日常，却都闪闪发光。',
      images: [
        { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=800&h=800&fit=crop' },
      ],
      timestamp: '2024-06-11 16:40',
      likes: 312,
      comments: 58,
      liked: false,
      tags: ['日常', '校园', '青春']
    }
  ]);

  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image?: string }>({ isOpen: false });

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

  const openLightbox = (image: string) => {
    setLightbox({ isOpen: true, image });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false });
  };

  return (
    <main className="py-16 md:py-24">
      <Card>
        <article className="p-8 md:p-12">
          <header className="mb-12">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              动漫时光
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              在这些精彩的故事中，探寻属于我们的青春与冒险
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
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700 rounded-full flex items-center justify-center text-xl flex-shrink-0 font-bold text-white">
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
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed italic">
                  "{moment.content}"
                </p>

                {/* Images Gallery */}
                {moment.images.length > 0 && (
                  <div className={`mb-4 grid gap-2 ${
                    moment.images.length === 1 ? 'grid-cols-1 max-w-md' :
                    moment.images.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {moment.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => openLightbox(img.src)}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer group/img border border-gray-300 dark:border-gray-700"
                      >
                        <img
                          src={img.src}
                          alt={`Moment ${moment.id} Image ${idx + 1}`}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                        {/* Live Photo indicator */}
                        {img.live && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded font-medium">
                            Live
                          </div>
                        )}
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
                        className="text-xs px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium"
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
                        ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{moment.liked ? '💖' : '🤍'}</span>
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
            <p className="text-sm">还有更多的故事在等待被诉说... 🌟</p>
          </div>
        </article>
      </Card>

      {/* Lightbox Modal */}
      {lightbox.isOpen && lightbox.image && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur"
              aria-label="Close"
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={lightbox.image}
              alt="Full screen preview"
              className="w-full h-full object-contain animate-in fade-in zoom-in duration-300"
            />
          </div>
        </div>
      )}
    </main>
  );
}

Moment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
