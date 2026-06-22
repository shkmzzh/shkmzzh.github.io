import React from 'react';
import Layout from '@/components/Layout';
import { ReactElement } from 'react';
import Card from '@/components/Card';

export default function Home() {
  const skills = [
    'React', 'TypeScript', 'Next.js', 'Vue.js',
    'Tailwind CSS', 'HTML/CSS', 'JavaScript', 'Node.js',
    'Git', 'REST API', 'Responsive Design', 'Web Performance'
  ];

  const experience = [
    {
      period: '2021 - 至今',
      position: '前端工程师',
      company: '科技创新公司',
      description: '负责企业级应用的前端开发，使用 React 和 TypeScript 构建高效的用户界面，参与性能优化和代码审查。'
    },
    {
      period: '2020 - 2021',
      position: '初级前端开发',
      company: '互联网初创公司',
      description: '参与多个产品的前端开发，学习现代前端框架和工具链，完成 HTML/CSS/JavaScript 基础工作。'
    }
  ];

  return (
    <main className="py-16 md:py-24">
      <Card>
        <article className="p-8 md:p-12 space-y-16">
          {/* Hero Section */}
          <header className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-100">
                萧家萧飞
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 tracking-wide">
                前端开发工程师 / 创意编程者
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-gray-900 via-gray-400 to-transparent dark:from-gray-100 dark:via-gray-600 opacity-20"></div>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl">
              热爱前端开发与产品设计。专注于用代码创造优雅的用户界面和沉浸式体验。
              对新技术保持好奇，在不断探索中寻求卓越。
            </p>
          </header>

          {/* About Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100">关于我</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                我是一名充满热情的前端工程师，相信代码可以成为艺术。
                专注于使用现代技术栈（React、TypeScript、Next.js）开发高性能、可维护的网络应用。
              </p>
              <p className="leading-relaxed">
                在工作之外，我喜欢探索设计美学、分享技术见解、参与开源项目。
                如果你有想法或合作机会，欢迎随时交流。
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100">技能</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100">经历</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="pb-8 border-b border-gray-200 dark:border-gray-800 last:border-b-0 last:pb-0">
                  <div className="space-y-2 mb-4">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exp.company} · {exp.period}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100">联系</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="mailto:shkmzzh@example.com"
                className="group p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  邮箱
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  shkmzzh@example.com
                </p>
              </a>

              <a
                href="https://github.com/shkmzzh"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  GitHub
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  github.com/shkmzzh
                </p>
              </a>
            </div>
          </section>
        </article>
      </Card>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
