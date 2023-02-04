import Button from 'components/lib/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const EmailConfirmation: FC = () => {
  const router = useRouter();

  const next = (): void => {
    router.push('/reset_password_verification');
  };
  return (
    <div className="flex flex-col items-center self-center">
      <div className="mt-[2.063rem] text-center">
        <p className="text-[1.313rem] font-semibold">Email Sent</p>
        <h1 className="mx-auto mt-[0.813rem] w-[15.625rem] text-[1rem] font-semibold text-daabo-grey sm:mx-0 sm:w-full sm:text-[1.313rem]">
          We have sent a verification code to your email address
        </h1>
      </div>
      <div className="mt-[4.688rem]">
        <p className="text-daabo-grey">
          Did not receive the email?{' '}
          <Link href="/reset_password">
            <a className="font-semibold text-red-600">Resend code</a>
          </Link>
        </p>
      </div>
      <div className="mt-[8.688rem]">
        <Button onClick={next} className="h-[2.813rem] w-[10.938rem]">
          next
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmation;
