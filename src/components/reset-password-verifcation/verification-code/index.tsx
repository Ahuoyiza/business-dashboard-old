import { CSSProperties, FC } from 'react';
import dynamic from 'next/dynamic';
const ReactCodeInput = dynamic(import('react-code-input'));

const inputStyle: CSSProperties = {
  margin: '4px',
  width: '2.575rem',
  height: '2.575rem',
  borderRadius: '7px',
  fontSize: '1.2rem',
  fontWeight: '500',
  textAlign: 'center',
  backgroundColor: 'white',
  color: 'black',
  border: '2px solid #D8D8D8',
  outline: 'none',
};

const inputStyleInvalid: CSSProperties = {
  margin: '4px',
  width: '2.575rem',
  height: '2.575rem',
  borderRadius: '7px',
  fontSize: '1.2rem',
  fontWeight: '500',
  textAlign: 'center',
  backgroundColor: 'white',
  color: 'red',
  border: '2px solid red',
};

const props = {
  inputStyle,
  inputStyleInvalid,
};

interface Props {
  onChange: (text: string) => void;
}

const VerificationCode: FC<Props> = ({ onChange }) => {
  return (
    <ReactCodeInput
      name="email-verification-code"
      inputMode="numeric"
      fields={6}
      {...props}
      onChange={onChange}
    />
  );
};

export default VerificationCode;
