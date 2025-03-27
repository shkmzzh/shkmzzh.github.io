import Layout from '@/components/Layout';
import { ReactElement } from 'react';
import Card from '@/components/Card';
import Giscus from '@giscus/react';

export default function Comment() {
  return (
    <main className='py-10 md:py-20'>
      <Card>
        <article className="p-4 md:p-6">
          <header className="mb-10 ">
            <h1 className="text-2xl md:text-3xl ">评论留言</h1>
          </header>
          <Giscus
            id="comments"
            repo="shkmzzh/Discussion"
            repoId="R_kgDOMnKBsg"
            category="Announcements"
            categoryId="DIC_kwDOMnKBss4Ch3mF"
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="zh-CN"
            loading="lazy"
          />
        </article>
      </Card>
    </main>
  );
}

Comment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
