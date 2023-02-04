import { FC } from 'react';
import routes from 'routes';

const Footer: FC = () => {
  return (
    <div className="flex items-center justify-center gap-14 bg-daabo-black px-gutter py-7 text-xs font-medium text-daabo-white">
      <a href={routes.ABOUT} className="hover:underline">
        About Daabo
      </a>
      <a href={routes.PRIVACY_POLICY} className="hover:underline">
        Privacy Policy
      </a>
      <a href={routes.TERMS_OF_SERVICE} className="hover:underline">
        Terms of Service
      </a>
      <a href={routes.HELP_SUPPORT} className="hover:underline">
        Talk to us
      </a>
    </div>
  );
};

export default Footer;
