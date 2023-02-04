import { LayoutProps } from 'components/lib/layout';
import { NextPage } from 'next';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

export type Device = {
  id: string;
  type: 'mobile' | 'laptop';
  name: string;
  make: string;
  isActive: boolean;
};

export type DeviceDetails = {
  system: {
    biosVendor: string;
  };
  motherboard: {
    vendor: string;
    model: string;
  };
  cpu: {
    /**
     * Speed in MHZ
     */
    speed: number;
    coresCount: number;
  };
  ram: {
    /** Ram size in MB */
    size: number;
  };
  tests: {
    headphone?: boolean;
    touchScreen?: boolean;
    pinch?: boolean;
    microphone?: boolean;
    speaker?: boolean;
    frontCamera?: boolean;
    backCamera?: boolean;
    accelerometer?: boolean;
    gps?: boolean;
  };
};

export type ActivityLog = {
  date: Date;
  event: string;
  info: string;
};

export type PlanDetail = {
  plan: string;
  price: number;
  started: Date;
  nextBilling: Date;
  recurring: boolean;
  type: string;
  deviceId: string;
};

export type BillDetail = {
  orderId: string;
  date: string;
  amount: number;
  status: 'pending' | 'failed' | 'complete';
  description?: string;
  platform?: string;
  method?: string;
  email?: string;
};

export type ClaimsAndRepairsDetails = {
  orderId: string;
  date: string;
  device: string;
  issue: string;
  status: 'pending' | 'approved' | 'denied';
  deviceId: string;
  plan: string;
  incidentDate: string;
  occuredBefore: boolean;
  fixedBefore: boolean;
  incidentLocation: string;
  currentLocation: string;
  details: string;
};

type StringFormAction = {
  type:
    | 'SET_DEVICE_NAME'
    | 'SET_INCIDENT'
    | 'SET_INCIDENT_DATE'
    | 'SET_INCIDENT_LOCATION'
    | 'SET_CURRENT_LOCATION'
    | 'SET_DETAILS';
  data: string;
};

type BooleanFormAction = {
  type: 'SET_OCCURED_BEFORE' | 'SET_FIXED_BEFORE';
  data: boolean;
};

type SubmitFormAction = {
  type: 'SUBMIT';
};

type ImageFormAction = {
  type: 'SET_DAMAGE_IMAGE';
  data?: File;
};

export type FormAction = StringFormAction | SubmitFormAction | BooleanFormAction | ImageFormAction;

export type FormState = {
  deviceName: string;
  incident: string;
  incidentDate: string;
  occuredBefore: boolean;
  fixedBefore: boolean;
  incidentLocation: string;
  currentLocation: string;
  details: string;
  damageImage?: File;
};

export interface ReactHookOptions {
  error?: FieldError;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
}

export type NextPageWithLayoutProps = NextPage & {
  layoutProps?: LayoutProps;
};

export type PaymentDetail = {
  id: string;
  userId: string;
  userEmail: string;
  userType: string;
  devicesId: string;
  transactionNumber: string;
  paymentMethod: string;
  receiptRef: string;
  status: string;
  dateCreated: string;
  referenceNumber: string;
  gatewayReference: string;
  paymentStatus: string;
  amount: string;
  transactionMessage: string;
  paymentDate: string | null;
  nextPaymentDate: string | null;
  card: any;
  prevTranxCount: string;
  currentTranxCount: string;
  autoRenew: string;
  paymentChannel: string;
  dateModified: string;
  packagePaymentHistory: PackagePayment[];
};

export type BusinessDevice = {
  id: string;
  userFullName: string;
  userPhoneNumber: string;
  userEmail: string;
  deviceHash: string;
  userId: string;
  companyOrderId: string;
  subscriptionId: string;
  deviceTypeId: string;
  brand: string;
  deviceModel: string;
  imeiNumber: string;
  datePurchased: string;
  deviceCondition: string;
  costOfDevice: string;
  ram: string;
  motherboard: string;
  companyDevicesPath: string | null;
  status: string;
  dateUpdated: string;
  dateCreated: string;
  subscription: Subscription;
  deviceType: DeviceType;
  packagePayment: PackagePayment[];
};

export type Subscription = {
  id: string;
  planId: string;
  subscriptionName: string;
  subscriptionInterval: string;
  subscriptionCode: string;
  percentage: string;
  amount: string | null;
  isDirect: string;
  description: string;
  userType: string;
  status: string;
  dateModified: string;
  dateCreated: string;
  couponCode?: Coupon[];
  plan?: Plan;
};

export type Coupon = {
  id: string;
  code: string;
  discount: string;
  subscriptionId: string;
  maxAmount: string;
  codeType: string;
  status: string;
  dateCreated: string;
};

export type Plan = {
  id: string;
  planName: string;
  status: string;
  dateCreated: string;
  subscription?: Subscription;
};

export type DeviceType = {
  id: string;
  typeName: string;
  deviceCategory: string;
  status: string;
  dateCreated: string;
};

export type PackagePayment = {
  id: string;
  devicesId: string;
  deviceHash: string;
  brand: string;
  typeName: string;
  userId: string;
  amount: string;
  datePurchased: string;
  companyDevicesPath: string | null;
  receiptRef: string;
  deviceModel: string;
  subscriptionStatus: string;
  status: string;
  paymentStatus: string;
  paymentDate: string | null;
  nextPaymentDate: string | null;
  referenceNumber: string;
  packagePaymentHistory: string;
};

export type AddDeviceInfo = {
  user_fullname: string;
  user_phone_number: string;
  user_email: string;
  device_type: string;
  brand: string;
  device_model: string;
  imei_number: string;
  date_purchased: string;
  device_condition: string;
  cost_of_device: string;
  ram: string;
  motherboard: string;
};

export type ApiLog = {
  status: 'successful' | 'failed';
  id: string;
  route: string;
  host: string;
  method: string;
  userAgent: string;
  ipAddress: string;
  date: Date;
};
