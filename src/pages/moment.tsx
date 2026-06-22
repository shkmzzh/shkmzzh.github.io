import Layout from '@/components/Layout';
import { ReactElement, useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import defaultMomentsData from '@/data/moments.json';

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

// Default moments imported from JSON file at build time — works on static hosting
const DEFAULT_MOMENTS: Moment[] = defaultMomentsData as Moment[];

export default function Moment() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [isDev, setIsDev] = useState(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image?: string }>({ isOpen: false });

  // Form / Dialog States
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form Fields
  const [avatar, setAvatar] = useState('👨‍💻');
  const [name, setName] = useState('萧家萧飞');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [imagesInput, setImagesInput] = useState('');

  // Uploading State
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development');
    loadMoments();
  }, []);

  // Load moments: localStorage first (for user edits), then JSON file (imported at build time)
  const loadMoments = () => {
    const stored = localStorage.getItem('moments_data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMoments(parsed);
          return;
        }
      } catch {
        // ignore parse error
      }
    }
    setMoments(DEFAULT_MOMENTS);
  };

  // Persist moments: write to JSON file API (dev) + localStorage (production fallback)
  const saveMoments = async (newMoments: Moment[]) => {
    setMoments(newMoments);

    // Always save to localStorage as fallback
    localStorage.setItem('moments_data', JSON.stringify(newMoments));

    // In dev mode, also persist to the JSON file via API
    if (process.env.NODE_ENV === 'development') {
      try {
        await fetch('/api/moments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ moments: newMoments }),
        });
      } catch (err) {
        console.error('Failed to persist moments to JSON file:', err);
      }
    }
  };

  const isMediaVideo = (src: string) => {
    const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg', '.m4v'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext)) || src.startsWith('data:video/');
  };

  // Check if a file path is a local upload (under /uploads/)
  const isLocalUpload = (src: string) => {
    return src.startsWith('/uploads/');
  };

  // Delete a file from the server
  const deleteUploadedFile = async (filePath: string) => {
    if (!isLocalUpload(filePath)) return;
    try {
      await fetch('/api/delete-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }),
      });
    } catch (err) {
      console.error('Failed to delete file:', filePath, err);
    }
  };

  const toggleLike = (id: number) => {
    const updated = moments.map(moment =>
      moment.id === id
        ? {
            ...moment,
            liked: !moment.liked,
            likes: moment.liked ? moment.likes - 1 : moment.likes + 1
          }
        : moment
    );
    saveMoments(updated);
  };

  const openLightbox = (image: string) => {
    setLightbox({ isOpen: true, image });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确认删除这条动态吗？')) return;

    const momentToDelete = moments.find(m => m.id === id);

    // Delete associated uploaded files first
    if (momentToDelete) {
      for (const img of momentToDelete.images) {
        if (isLocalUpload(img.src)) {
          await deleteUploadedFile(img.src);
        }
      }
    }

    const updated = moments.filter(m => m.id !== id);
    saveMoments(updated);
  };

  const openCreateForm = () => {
    setFormMode('create');
    setEditingId(null);
    setAvatar('👨‍💻');
    setName('萧家萧飞');
    setContent('');
    setTagsInput('');
    setImagesInput('');
    setShowForm(true);
  };

  const openEditForm = (moment: Moment) => {
    setFormMode('edit');
    setEditingId(moment.id);
    setAvatar(moment.avatar);
    setName(moment.name);
    setContent(moment.content);
    setTagsInput((moment.tags || []).join(', '));
    setImagesInput(moment.images.map(img => img.src).join('\n'));
    setShowForm(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const response = await fetch('/api/upload/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            filedata: base64String,
          }),
        });

        const result = await response.json();
        if (response.ok && result.url) {
          uploadedUrls.push(result.url);
        } else {
          alert(`文件 ${file.name} 上传失败: ${result.error || '未知错误'}`);
        }
      }

      if (uploadedUrls.length > 0) {
        setImagesInput(prev => {
          const trimmed = prev.trim();
          return trimmed ? `${trimmed}\n${uploadedUrls.join('\n')}` : uploadedUrls.join('\n');
        });
      }
    } catch (error: any) {
      alert('上传发生错误: ' + error.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedTags = tagsInput
      .split(/[,，]/)
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const formattedImages = imagesInput
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)
      .map(src => ({ src }));

    let updated: Moment[];

    if (formMode === 'create') {
      const newMoment: Moment = {
        id: Date.now(),
        avatar,
        name,
        content,
        images: formattedImages,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        likes: 0,
        comments: 0,
        liked: false,
        tags: formattedTags
      };
      updated = [newMoment, ...moments];
    } else if (formMode === 'edit' && editingId !== null) {
      updated = moments.map(m =>
        m.id === editingId
          ? {
              ...m,
              avatar,
              name,
              content,
              images: formattedImages,
              tags: formattedTags
            }
          : m
      );
    } else {
      return;
    }

    // If editing, check for removed images and delete them
    if (formMode === 'edit' && editingId !== null) {
      const oldMoment = moments.find(m => m.id === editingId);
      if (oldMoment) {
        const oldSrcs = oldMoment.images.map(img => img.src);
        const newSrcs = formattedImages.map(img => img.src);
        const removedSrcs = oldSrcs.filter(src => !newSrcs.includes(src));
        for (const src of removedSrcs) {
          if (isLocalUpload(src)) {
            await deleteUploadedFile(src);
          }
        }
      }
    }

    saveMoments(updated);
    setShowForm(false);
  };

  return (
    <>
      <main className="py-12 md:py-20 animate-fade-in">
        <Card>
          <article className="p-6 sm:p-10 md:p-16">
            <header className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-50">
                  生活动态
                </h1>
                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-light">
                  分享前端开发的日常与生活中的美好时刻
                </p>
                <div className="h-0.5 w-24 bg-gradient-to-r from-[var(--accent-color)] to-transparent opacity-65 rounded-full"></div>
              </div>

              {/* Dev Mode Controls */}
              {isDev && (
                <button
                  onClick={openCreateForm}
                  className="self-start sm:self-center px-5 py-2.5 bg-[var(--accent-color)] text-white hover:bg-[var(--accent-color)]/90 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-[var(--accent-color)]/20 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>➕</span> 发布动态 (Dev)
                </button>
              )}
            </header>

            {/* Moments List */}
            <div className="space-y-12">
              {moments.map((moment) => (
                <div
                  key={moment.id}
                  className="pb-10 border-b border-gray-100 dark:border-gray-900 last:border-b-0 last:pb-0 group relative"
                >
                  {/* Dev Actions inside group */}
                  {isDev && (
                    <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={() => openEditForm(moment)}
                        className="p-1.5 text-xs text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-900 rounded-lg transition-all duration-300"
                        title="编辑"
                      >
                        ✏️ 编辑
                      </button>
                      <button
                        onClick={() => handleDelete(moment.id)}
                        className="p-1.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 border border-transparent hover:border-red-200 dark:hover:border-red-900 rounded-lg transition-all duration-300"
                        title="删除"
                      >
                        🗑️ 删除
                      </button>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg shadow-sm">
                      {moment.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                        {moment.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-light">
                        {moment.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-5">
                    {moment.content}
                  </p>

                  {/* Images/Videos Gallery */}
                  {moment.images.length > 0 && (
                    <div className={`mb-5 grid gap-3 ${
                      moment.images.length === 1 ? 'grid-cols-1 max-w-xl' :
                      moment.images.length === 2 ? 'grid-cols-2' :
                      'grid-cols-3'
                    }`}>
                      {moment.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-safe-color/20 group/img"
                        >
                          {isMediaVideo(img.src) ? (
                            <video
                              src={img.src}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          ) : (
                            <>
                              <img
                                src={img.src}
                                alt={`Moment ${moment.id} Image ${idx + 1}`}
                                className="w-full h-full object-cover cursor-pointer"
                                loading="lazy"
                                onClick={() => openLightbox(img.src)}
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {moment.tags && moment.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {moment.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-[var(--accent-light)] text-[var(--accent-color)] rounded-lg font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 text-xs sm:text-sm">
                    <button
                      onClick={() => toggleLike(moment.id)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-all duration-300 ${
                        moment.liked
                          ? 'text-red-500 border-red-100 bg-red-50/50 dark:border-red-950/30 dark:bg-red-950/10'
                          : 'text-gray-500 border-gray-100 dark:border-gray-800 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-light)]'
                      }`}
                    >
                      <span className="scale-110">{moment.liked ? '❤️' : '🤍'}</span>
                      <span className="font-semibold">{moment.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 px-3.5 py-1.5 text-gray-500 border border-gray-100 dark:border-gray-800 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-light)] rounded-xl transition-all duration-300">
                      <span className="scale-110">💬</span>
                      <span className="font-semibold">{moment.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Elegant Footer state */}
            <div className="mt-16 text-center text-gray-400 dark:text-gray-500">
              <p className="text-xs tracking-widest uppercase">更多精彩内容敬请期待 · Keep Exploring</p>
            </div>
          </article>
        </Card>
      </main>

      {/* Global Portal-like Modal Container for Edit/Create Form */}
      {/* Moved outside the Card & main elements to prevent transform-centering issues */}
      {showForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-white/10 dark:bg-gray-950/10 animate-fade-in"
          style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
          onClick={() => setShowForm(false)}
        >
          <div 
            className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border border-gray-150 dark:border-gray-850 rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6 flex items-center gap-2">
              <span>📝</span> {formMode === 'create' ? '发布新动态' : '编辑动态'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">头像 Emoji / 文本</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl text-sm focus:border-[var(--accent-color)] outline-none transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">发布人姓名</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl text-sm focus:border-[var(--accent-color)] outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">动态内容</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl text-sm focus:border-[var(--accent-color)] outline-none transition-all duration-300 resize-none"
                  placeholder="分享点什么..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">标签 (用逗号分隔)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl text-sm focus:border-[var(--accent-color)] outline-none transition-all duration-300"
                  placeholder="生活, 学习, 摄影"
                />
              </div>

              {/* Upload Media Section */}
              <div className="p-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-800/80 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">上传媒体图片/视频 (放入项目 public/uploads)</label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3.5 py-1.5 bg-white dark:bg-gray-850 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-150 dark:border-gray-800 rounded-lg text-xs font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {isUploading ? '📤 上传中...' : '📁 选择本地媒体'}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                  />
                </div>
                {isUploading && (
                  <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-color)] animate-[pulse_1s_infinite] w-full"></div>
                  </div>
                )}
                <textarea
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800/60 rounded-xl text-xs focus:border-[var(--accent-color)] outline-none transition-all duration-300 resize-none font-mono"
                  placeholder="媒体 URL 列表 (每行一个)\n支持本地上传后的 /uploads/... 路径"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-900">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-350 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md cursor-pointer"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modern Lightbox Modal */}
      {lightbox.isOpen && lightbox.image && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in"
          style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-[90vh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close button with premium look */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image/Video with smooth load */}
            {isMediaVideo(lightbox.image) ? (
              <video
                src={lightbox.image}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
              />
            ) : (
              <img
                src={lightbox.image}
                alt="Full screen preview"
                className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl transition-all duration-300"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

Moment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};