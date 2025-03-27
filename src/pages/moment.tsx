import Layout from '@/components/Layout';
import { ReactElement } from 'react';

export default function Moment() {
  return <div className={`flex`}>我叫牛马怀，是个老瓢虫🐞 </div>;
}

Moment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
