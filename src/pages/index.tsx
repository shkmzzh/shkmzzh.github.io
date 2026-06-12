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
    <main className="py-10 md:py-20">
      <Card>
        <article className="p-6 md:p-8">
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                XF
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">萧家萧飞</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">前端开发工程师</p>
              </div>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              热爱前端开发，专注于构建高质量的用户界面和优秀的用户体验。
              对新技术保持热情，持续学习和成长。
            </p>
          </header>

          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-600">
              关于我
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              我是一名充满热情的前端工程师，专注于使用现代技术栈（React、TypeScript、Next.js）
              开发高性能、可维护的网络应用。我相信好的代码不仅要功能完整，
              还要易读、易维护、易扩展。
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              在工作之外，我喜欢分享技术知识、学习新兴前端技术、
              并参与开源项目。如果你有任何想法或合作机会，欢迎随时联系我！
            </p>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-600">
              技能标签
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-600">
              工作经历
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap ml-2">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-600">
              联系方式
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">邮箱</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  shkmzzh@example.com
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">GitHub</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  github.com/shkmzzh
                </p>
              </div>
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
