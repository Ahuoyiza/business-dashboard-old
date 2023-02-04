import { useRouter } from 'next/router';
import { X_API_KEY, API_URL } from '../../../constants';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

interface SignupContextInterface {
  formData: any;
  updateFormData: (data: any) => void;
  businessTypes: any[];
}

const defaultValue = { formData: {}, updateFormData: () => {}, businessTypes: [] };

export const SignupContext = createContext<
  SignupContextInterface | { formData: {}; updateFormData: () => {}; businessTypes: [] }
>(defaultValue);

type SignupProviderProps = {
  children: ReactNode;
};

const SignupProvider: FC<SignupProviderProps> = ({ children }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [businessTypes, setBusinessTypes] = useState([]);

  const updateFormData = (data: any): void => {
    setFormData((prev: any) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    const fetchCompanyTypes = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'X-API-KEY': X_API_KEY,
        },
      };
      try {
        const response = await fetch(`${API_URL}/business_type`, requestOptions);
        const data = await response.json();
        if (data.status) {
          const { payload } = data;
          const { table_data } = payload;
          setBusinessTypes(table_data);
        }
      } catch {}
    };
    fetchCompanyTypes();
  }, []);

  return (
    <SignupContext.Provider value={{ formData, updateFormData, businessTypes }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignUpForm = () => useContext(SignupContext);

export default SignupProvider;
