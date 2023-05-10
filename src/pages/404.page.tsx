import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/',
      fallback: true,
      permanent: true,
    },
  };
};

export default getStaticProps;