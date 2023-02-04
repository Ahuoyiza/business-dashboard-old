import throwDevOrProd from 'utils/throwDevOrProd';
import request from '../request';

export const loginWithEmail = async (email: string, password: string): Promise<string> => {
  try {
    const response = await request.post('/auth', { email, password });
    const { data } = response;
    if (data && data.status) {
      return data.payload.token;
    }

    throw new Error('Login failed');
  } catch (error: any) {
    if (process.env.NODE_ENV == 'development') throw error;
    else throw new Error('Login failed');
  }
};

export interface CompanySignUpData {
  email: string;
  companyName: string;
  phoneNumber: string;
  password: string;
  address: string;
  businessTypeId: string;
  cacNumber: string;
  isCompany: true;
  referral?: {
    code: string;
    hash: string;
  };
}

export const signUp = async (userData: CompanySignUpData) => {
  const payload = {
    email: userData.email,
    company_name: userData.companyName,
    phone_number: userData.phoneNumber,
    password: userData.password,
    address: userData.address,
    business_type_id: userData.businessTypeId,
    cac_number: userData.cacNumber,
    is_company: userData.isCompany,
    r: userData.referral?.code,
    c: userData.referral?.hash,
  };

  try {
    const response = await request.post(`/signup`, payload);
    const { data } = response;
    if (data && data.status) {
      return { success: true };
    }

    throw new Error('Sign up failed');
  } catch (error) {
    throwDevOrProd(error, new Error('Sign up failed'));
  }
};
