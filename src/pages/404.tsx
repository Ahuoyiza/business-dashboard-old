import PageNotFound from 'components/errors/page-not-found';

const Custom404Page = () => {
  return <PageNotFound />;
};

Custom404Page.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default Custom404Page;
