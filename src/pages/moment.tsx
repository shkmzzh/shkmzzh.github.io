import Layout from '@/components/Layout';
import { ReactElement } from 'react';

export default function Moment() {
  return <div className={`flex`}>我的龙虾是个蠢蛋🦞 </div>;
}

Moment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
