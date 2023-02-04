import PageNotFound from 'components/errors/page-not-found';
import ServerError from 'components/errors/server-error';
import ErrorFallback from 'components/errors/app-error-boundary/error-fallback';

const Error = ({ statusCode }: { statusCode: number }) => {
  if (statusCode === 404) return <PageNotFound />;
  else if (statusCode === 500) return <ServerError />;
  return <ErrorFallback />;
};

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default Error;
