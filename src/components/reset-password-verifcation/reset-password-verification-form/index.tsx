import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import VerificationCode from '../verification-code';
import routes from 'routes';
import Button from 'components/lib/button';
// import { verifyOtp } from 'lib/business/requests/auth';

const ResetPasswordVerificationForm: FC = () => {
  const router = useRouter();
  const [code, setCode] = useState('');
  const email = sessionStorage.getItem('resetPasswordEmail') || '';

  const onSuccess = (data: any): void => {
    if (data && data.status) {
      sessionStorage.setItem('otp', code);
      router.push(routes.CREATE_PASSWORD);
    } else {
      toast.error(data?.message || 'Invalid OTP');
    }
  };

  const onError = (error: Error): void => {
    toast.error(error.message || 'An unexpected error occurred');
  };

  const { mutate, isLoading } = useMutation(
    'reset_password',
    // async () => await verifyOtp(code, email),
    async () => {},
    {
      onError: onError,
      onSuccess: onSuccess,
    }
  );

  const handleSubmit = (): void => {
    if (!(email && code)) {
      toast.error('Enter the OTP sent to your email');
      return;
    }
    mutate();
  };

  return (
    <div className="flex flex-col items-center self-center">
      <div className="mt-[2.063rem] text-center">
        <p className="text-[1.313rem] font-semibold">Verification</p>
        <h1 className="mx-auto mt-[0.813rem] w-[15.625rem] text-[1.313rem] font-semibold text-daabo-grey sm:mx-0 sm:w-full sm:text-[21px]">
          Enter the verification code sent to your email address
        </h1>
      </div>
      <div className="mt-[41px] self-center">
        <div className="relative mb-[37px] flex">
          <VerificationCode onChange={(text) => setCode(text)} />
        </div>
      </div>
      <div className="mt-[41px] self-center">
        <Button onClick={handleSubmit} className="h-[2.813rem] w-[10.875rem]">
          {!isLoading ? 'verify' : 'Loading...'}
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordVerificationForm;
