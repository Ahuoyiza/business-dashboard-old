import { FC } from 'react';
import { NextSeo } from 'next-seo';

interface Props {
  title: string;
  description?: string;
}

const Seo: FC<Props> = ({ title = undefined, description = '' }) => {
  return <NextSeo title={title} description={description} />;
};

export default Seo;
