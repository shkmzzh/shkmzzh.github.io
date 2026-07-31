import React from 'react';
import Layout from '@/components/Layout';
import { ReactElement } from 'react';
import Card from '@/components/Card';
import PortalCanvas from '@/components/PortalCanvas';

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

  const metrics = [
    { value: '12', label: '核心技能' },
    { value: '02', label: '项目阶段' },
    { value: '24h', label: '保持在线' },
  ];

  const focusAreas = [
    '界面工程',
    '动效体验',
    '性能优化',
    '产品设计',
  ];

  const characterShots = [
    {
      title: 'Portal Run',
      caption: '跨维度传送门启动，能量流被重新调校成蓝色实验室频段。',
      image: 'https://assets-cache0.moviebreak.de/system/bilder/story/photo/63e3f25d6e733314b6890000/3jTgoDLnaXfSjr5jCeOgSevFoqH.jpg',
    },
    {
      title: 'Dimension Signal',
      caption: '瑞克和莫蒂式冒险信号，带一点荒诞、一点高能。',
      image: 'https://estaticos.elcolombiano.com/binrepository/604x770/0c167/780d565/none/11101/HWSH/rym_45546321_20240709203744.jpg',
    },
    {
      title: 'Morty Alert',
      caption: '实验室警报已经响起，下一秒可能就要掉进别的宇宙。',
      image: 'https://www.tvguide.com/a/img/hub/2013/12/11/96f8ec1f-afc9-40e0-9202-b5c1a08f1329/dtaXBmaTqDEjJxb_1oUo7_W8mIQUl2gH.jpg',
    },
  ];

  return (
    <main className="home-page">
      <Card>
        <article className="home-panel">
          <section className="hero-grid" aria-label="个人介绍">
            <div className="hero-copy">
              <div className="status-row">
                <span className="status-dot" aria-hidden="true"></span>
                <span>DIMENSION C-137 / FRONTEND LAB ONLINE</span>
              </div>

              <div className="hero-title-group">
                <p className="hero-kicker">Interdimensional Tech Portfolio</p>
                <h1 className="hero-title">
                  萧家萧飞
                </h1>
                <p className="hero-subtitle">
                  前端开发工程师 / 跨维度界面实验员
                </p>
              </div>

              <p className="hero-description">
                把个人主页改造成一间漂浮在多元宇宙里的前端实验室：
                绿色传送门、故障网格、疯狂科学仪表和可交互界面一起运行。
              </p>

              <div className="hero-actions" aria-label="联系方式">
                <a href="mailto:shkmzzh@example.com" className="command-button command-button--primary">
                  启动联系
                </a>
                <a
                  href="https://github.com/shkmzzh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="command-button"
                >
                  访问 GitHub
                </a>
              </div>
            </div>

            <div className="holo-dashboard" aria-hidden="true">
              <div className="holo-dashboard__frame">
                <div className="holo-dashboard__scan"></div>
                <div className="portal-stage">
                  <PortalCanvas />
                </div>
              </div>
            </div>
          </section>

          <section className="section-block dimension-gallery">
            <header className="section-heading">
              <span>00</span>
              <h2>跨维度影像档案</h2>
            </header>

            <div className="character-grid">
              {characterShots.map((shot) => (
                <figure className="character-card" key={shot.title}>
                  <div className="character-image">
                    <img src={shot.image} alt={shot.title} loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                  <figcaption>
                    <span>{shot.title}</span>
                    <p>{shot.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="metric-grid" aria-label="状态概览">
            {metrics.map((metric) => (
              <div className="metric-tile" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </section>

          <section className="section-block">
            <header className="section-heading">
              <span>01</span>
              <h2>关于我</h2>
            </header>

            <div className="about-grid">
              <div className="copy-stack">
                <p>
                  我是一名充满热情的前端工程师，相信代码可以成为艺术。
                  专注于使用现代技术栈（React、TypeScript、Next.js）开发高性能、可维护的网络应用。
                </p>
                <p>
                  在工作之外，我喜欢探索设计美学、分享技术见解、参与开源项目。
                  如果你有想法或合作机会，欢迎随时交流。
                </p>
              </div>

              <div className="mission-panel">
                {focusAreas.map((item, index) => (
                  <div className="mission-item" key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-block">
            <header className="section-heading">
              <span>02</span>
              <h2>技能矩阵</h2>
            </header>

            <div className="skill-grid">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="skill-tile"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{skill}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="section-block">
            <header className="section-heading">
              <span>03</span>
              <h2>经历轨道</h2>
            </header>

            <div className="timeline">
              {experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-node" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <div className="timeline-meta">{exp.company} / {exp.period}</div>
                    <h3>{exp.position}</h3>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section-block contact-section">
            <header className="section-heading">
              <span>04</span>
              <h2>通讯链路</h2>
            </header>

            <div className="contact-grid">
              <a
                href="mailto:shkmzzh@example.com"
                className="contact-tile"
              >
                <span>MAIL</span>
                <strong>shkmzzh@example.com</strong>
              </a>

              <a
                href="https://github.com/shkmzzh"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-tile"
              >
                <span>GITHUB</span>
                <strong>github.com/shkmzzh</strong>
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
