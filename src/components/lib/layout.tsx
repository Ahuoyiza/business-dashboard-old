import { useRouter } from 'next/router';
import Script from 'next/script';
import { FC, ReactNode, useEffect, useState } from 'react';
import BusinessAuthProvider, { useAuth } from './auth';
import BusinessSideBar from './business-side-bar';
import Header from './header';
import Loader from './loader';
import LogoutAfterInactivity from './logout-after-inactivity';

export type LayoutProps = {
  hideSideBar?: boolean;
  isAuthenticated?: boolean;
  disableLogoutAfterTimeout?: boolean;
  children?: ReactNode;
};

/**
 * The Layout component provides the sidebar (optional) and header to all pages.
 * It also redirects authenticated pages the login page
 */
const Layout: FC<LayoutProps> = ({
  children,
  hideSideBar = false,
  isAuthenticated = false,
  disableLogoutAfterTimeout,
}) => {
  return (
    <BusinessAuthProvider>
      <BusinessLayout hideSideBar={hideSideBar} isAuthenticated={isAuthenticated}>
        {children}
      </BusinessLayout>
      <LogoutAfterInactivity after={10} disabled={disableLogoutAfterTimeout} />
    </BusinessAuthProvider>
  );
};

const BusinessLayout: FC<LayoutProps> = ({
  children,
  hideSideBar = false,
  isAuthenticated = false,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const { user, isLoggingIn } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    setIsRendered(true);
    return () => setIsRendered(false);
  }, []);

  if (isRendered && isAuthenticated && !isLoggingIn && !user) push('/login');

  return (
    <>
      <div className="flex h-screen flex-col overflow-y-hidden bg-daabo-white [--gutter:1rem] sm:[--gutter:2rem] md:[--gutter:6rem] xl:[--gutter:9.4rem]">
        <Header />
        <div className="relative flex h-full w-full overflow-y-auto">
          {!hideSideBar && <BusinessSideBar />}
          {isRendered ? (
            isAuthenticated && isLoggingIn ? (
              <Loader />
            ) : (
              <main
                className={`ml-gutter h-full w-full pr-gutter md:ml-8 ${
                  hideSideBar && 'md:ml-gutter'
                }`}
              >
                {children}
              </main>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <IntercomScript />
    </>
  );
};

const IntercomScript: FC = ({}) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Script
      id="intercom-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          //Set up Intercom
          var APP_ID = "tc5otjr7";
          (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
          
          // launch intercom
          window.Intercom('boot', {
            app_id: APP_ID,
            email: '${user.email}',
            user_id: '${user.id}',          
         });
          `,
      }}
    />
  );
};

export default Layout;
