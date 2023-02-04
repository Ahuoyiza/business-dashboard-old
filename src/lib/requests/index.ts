import { BusinessDevice, DeviceType, PaymentDetail, Subscription } from 'typings';
import throwDevOrProd from 'utils/throwDevOrProd';
import request from '../request';

export async function getBusinessInfo() {
  try {
    const res = await request.get('/user_info');
    const payload = res.data.payload;

    if (res && res.data.status)
      return {
        id: payload.ID,
        address: payload.address,
        businessTypeId: payload.business_type_id,
        cacNumber: payload.cac_number,
        name: payload.company_name,
        dateCreated: payload.date_created,
        dateModified: payload.date_modified,
        email: payload.email,
        localState: payload.local_state,
        phoneNumber: payload.phone_number,
        status: payload.status,
      };
    else throw new Error('Error fetching user information');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching business information'));
  }
}

export async function getBusinessPersonalSettings() {
  try {
    const res = await request.get('/get_profile_setting');

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error fetching settings');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching settings'));
  }
}

export const updateUserData = async (formData: FormData) => {
  if (!formData) return;

  try {
    const response = await request.post('/profile', formData);
    if (response && response.data.status) {
      return response.data;
    }

    throw new Error('Error updating profile');
  } catch (error) {
    throwDevOrProd(error, new Error('Error updating profile'));
  }
};

export async function updateBusinessPersonalSettings(
  id: string,
  obj: {
    unusual_activity?: boolean;
    new_browser?: boolean;
    lastest_news?: boolean;
    account_tips?: boolean;
    new_features?: boolean;
    activity_log?: boolean;
  }
) {
  try {
    const res = await request.post(`/profile_setting/${id}`, obj);

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error updating settings');
  } catch (error) {
    throwDevOrProd(error, new Error('Error updating settings'));
  }
}

export async function getDevice(id: string): Promise<BusinessDevice | undefined> {
  try {
    const res = await request.get(`/company_device/${id}`);

    if (res && res.data.status) {
      const payload = res.data.map((item: any) => item.company_devices).flat().map((item: any) => ({
        id: item.ID,
        userFullName: item.user_fullname,
        userPhoneNumber: item.user_phone_number,
        userEmail: item.user_email,
        deviceHash: item.device_hash,
        userId: item.user_id,
        companyOrderId: item.company_order_id,
        subscriptionId: item.subscription_id,
        deviceTypeId: item.device_type_id,
        brand: item.brand,
        deviceModel: item.device_model,
        imeiNumber: item.imei_number,
        datePurchased: item.date_purchased,
        deviceCondition: item.device_condition,
        costOfDevice: item.cost_of_device,
        ram: item.ram,
        motherboard: item.motherboard,
        companyDevicesPath: item.company_devices_path,
        status: item.status,
        dateUpdated: item.date_updated,
        dateCreated: item.date_created,
        subscription: item.subscription.map((sub: any) => ({
          id: sub.ID,
          planId: sub.plan_id,
          subscriptionName: sub.subscription_name,
          subscriptionInterval: sub.subscription_interval,
          subscriptionCode: sub.subscription_code,
          percentage: sub.percentage,
          amount: sub.amount,
          isDirect: sub.is_direct,
          description: sub.description,
          userType: sub.user_type,
          status: sub.status,
          dateModified: sub.date_modified,
          dateCreated: sub.date_created
        }))[0],
        deviceType: item.device_type.map((dt: any) => ({
          id: dt.ID,
          typeName: dt.type_name,
          deviceCategory: dt.device_category,
          status: dt.status,
          dateCreated: dt.date_created
        }))[0],
        packagePayment: item.package_payment.map((pp: any) => ({
          id: pp.id,
          devicesId: pp.devices_id,
          deviceHash: pp.device_hash,
          brand: pp.brand,
          typeName: pp.type_name,
          userId: pp.user_id,
          amount: pp.amount,
          datePurchased: pp.date_purchased,
          companyDevicesPath: pp.company_devices_path,
          receiptRef: pp.receipt_ref,
          deviceModel: pp.device_model,
          subscriptionStatus: pp.subscription_status,
          status: pp.status,
          paymentStatus: pp.payment_status,
          paymentDate: pp.payment_date,
          nextPaymentDate: pp.next_payment_date,
          referenceNumber: pp.reference_number,
          packagePaymentHistory: pp.package_payment_history
        })),
      }));

      return payload;
    }
    else throw new Error('Error fetching devices');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching devices'));
  }
}

type GetDevicesOptions = {
  pagination?:
  {
    start: number;
    length: number;
  }
  /**
   * Evaluates last location and date purchased
   */
  search?: string
}

export async function getDevices(opts?: GetDevicesOptions): Promise<{ totalLength: number; content: BusinessDevice[] } | undefined> {
  try {
    const res = await request.get('/company_device', {
      params: {
        start: opts?.pagination?.start,
        len: opts?.pagination?.length,
        q: opts?.search,
      }
    });

    if (res && res.data.status) {
      const payload = res.data.payload
      payload.totalLength = parseInt(payload.totalLength);
      payload.content = payload.content.map((item: any) => item.company_devices).flat().map((item: any) => ({
        id: item.ID,
        userFullName: item.user_fullname,
        userPhoneNumber: item.user_phone_number,
        userEmail: item.user_email,
        deviceHash: item.device_hash,
        userId: item.user_id,
        companyOrderId: item.company_order_id,
        subscriptionId: item.subscription_id,
        deviceTypeId: item.device_type_id,
        brand: item.brand,
        deviceModel: item.device_model,
        imeiNumber: item.imei_number,
        datePurchased: item.date_purchased,
        deviceCondition: item.device_condition,
        costOfDevice: item.cost_of_device,
        ram: item.ram,
        motherboard: item.motherboard,
        companyDevicesPath: item.company_devices_path,
        status: item.status,
        dateUpdated: item.date_updated,
        dateCreated: item.date_created,
        subscription: item.subscription.map((sub: any) => ({
          id: sub.ID,
          planId: sub.plan_id,
          subscriptionName: sub.subscription_name,
          subscriptionInterval: sub.subscription_interval,
          subscriptionCode: sub.subscription_code,
          percentage: sub.percentage,
          amount: sub.amount,
          isDirect: sub.is_direct,
          description: sub.description,
          userType: sub.user_type,
          status: sub.status,
          dateModified: sub.date_modified,
          dateCreated: sub.date_created
        }))[0],
        deviceType: item.device_type.map((dt: any) => ({
          id: dt.ID,
          typeName: dt.type_name,
          deviceCategory: dt.device_category,
          status: dt.status,
          dateCreated: dt.date_created
        }))[0],
        packagePayment: item.package_payment.map((pp: any) => ({
          id: pp.id,
          devicesId: pp.devices_id,
          deviceHash: pp.device_hash,
          brand: pp.brand,
          typeName: pp.type_name,
          userId: pp.user_id,
          amount: pp.amount,
          datePurchased: pp.date_purchased,
          companyDevicesPath: pp.company_devices_path,
          receiptRef: pp.receipt_ref,
          deviceModel: pp.device_model,
          subscriptionStatus: pp.subscription_status,
          status: pp.status,
          paymentStatus: pp.payment_status,
          paymentDate: pp.payment_date,
          nextPaymentDate: pp.next_payment_date,
          referenceNumber: pp.reference_number,
          packagePaymentHistory: pp.package_payment_history
        })),
      }));

      return payload;
    }
    else throw new Error('Error fetching devices');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching devices'));
  }
}

export async function getPaymentData(start?: number, len?: number): Promise<{ totalLength: number; content: PaymentDetail[] } | undefined> {
  try {
    const res = await request.get('/billing', {
      params: {
        start,
        len,
      },
    });

    if (res && res.data.status) {
      const payload = res.data.payload;
      payload.totalLength = parseInt(payload.totalLength);
      payload.content = payload.content.map((item: any) => ({
        id: item.ID,
        userId: item.user_id,
        userEmail: item.user_email,
        userType: item.user_type,
        devicesId: item.devices_id,
        transactionNumber: item.transaction_number,
        paymentMethod: item.payment_method,
        receiptRef: item.receipt_ref,
        status: item.status,
        dateCreated: item.date_created,
        referenceNumber: item.reference_number,
        gatewayReference: item.gateway_reference,
        paymentStatus: item.payment_status,
        amount: item.amount,
        transactionMessage: item.transaction_message,
        paymentDate: item.payment_date,
        nextPaymentDate: item.next_payment_date,
        card: item.card,
        prevTranxCount: item.prev_tranx_count,
        currentTranxCount: item.current_tranx_count,
        autoRenew: item.autorenew,
        paymentChannel: item.payment_channel,
        dateModified: item.date_modified,
        packagePaymentHistory: item.package_payment_history,
      }));

      return payload;
    }
    else throw new Error('Error fetching payment history');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching payment history'));
  }
}

export async function removeDevice(id: string): Promise<boolean | undefined> {
  try {
    const res = await request.post('/remove_device', { device_id: id });

    if (res && res.data.status) return res.data.status;
    else throw new Error('Error removing device');
  } catch (error) {
    throwDevOrProd(error, new Error('Error removing device'));
  }
}

export async function addDevice(data: {
  deviceInfo: { brand: string; model: string; imeiNumber: string; ram: string };
  deviceCondition: string;
  datePurchased: string;
  deviceCost: string;
  subscriptionId: string;
  deviceTypeId: string;
  user: {
    fullName: string;
    email: string;
    phoneNumber: string
  };
}) {
  const formData = new FormData();
  formData.append(
    'device_info',
    JSON.stringify({
      brand: data.deviceInfo.brand,
      model: data.deviceInfo.model,
      imei_number: data.deviceInfo.imeiNumber,
      ram: data.deviceInfo.ram,
      motherboard: data.deviceInfo.brand,
    })
  );
  formData.append('device_condition', data.deviceCondition);
  formData.append('date_purchased', data.datePurchased);
  formData.append('cost_of_device', data.deviceCost);
  formData.append('subscription_id', data.subscriptionId);
  formData.append('device_type_id', data.deviceTypeId);
  formData.append('user_fullname', data.user.fullName);
  formData.append('user_email', data.user.email);
  formData.append('user_phone_number', data.user.phoneNumber);

  try {
    const res = await request.post('/register_device', formData);
    if (res && res.data.status) return res.data.payload;
    else throw new Error('Device registration could not be completed');
  } catch (error) {
    throwDevOrProd(error, new Error('Device registration could not be completed'));
  }
}

export async function batchAddDevice(data: {
  companyDevicesPath: File;
  subscriptionId: string;
}) {
  const formData = new FormData();

  formData.append('company_devices_path', data.companyDevicesPath);
  formData.append('subscription_id', data.subscriptionId);

  try {
    const res = await request.post('/upload_devices', formData);
    if (res && res.data.status) return res.data.payload;
    else throw new Error('Batch device registration could not be completed');
  } catch (error) {
    throwDevOrProd(error, new Error('Batch device registration could not be completed'));
  }
}

export async function getDashboardMetrics() {
  try {
    const res = await request.get('/dashboard_metrics');

    if (!res.data.status) throw new Error('Error fetching dashboard metrics');

    return {
      protectedDevices: res.data.payload.devices_protected.total,
      amountPaid: res.data.payload.amount_paid.total,
      companyClaims: res.data.payload.company_claims,
    }
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching dashboard metrics'));
  }
}

export async function getDevicesMetrics() {
  try {
    const res = await request.get('/dashboard_metrics');

    if (!res.data.status) throw new Error('Error fetching dashboard metrics');

    return {
      protectedDevices: res.data.payload.devices_protected.total,
      amountPaid: res.data.payload.amount_paid.total,
      companyClaims: res.data.payload.company_claims,
    }
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching dashboard metrics'));
  }
}

export async function getDeviceTypes(category?: 'mobile' | 'web'): Promise<{ totalLength: number; table_data: DeviceType[] } | undefined> {
  try {
    const res = await request.get('/device_type', {
      params: {
        q: category,
      },
    });

    if (res && res.data.status) {
      const payload = res.data.payload;
      payload.totalLength = parseInt(payload.totalLength);
      payload.table_data = payload.table_data.map((item: any) => ({
        id: item.ID,
        dateCreated: item.date_created,
        deviceCategory: item.device_category,
        status: item.status,
        typeName: item.type_name,
      } as DeviceType));

      return payload;
    }
    else throw new Error('Error fetching device types');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching device types'));
  }
}

export async function getDeviceSubscriptions(): Promise<{ totalLength: number, content: Subscription[] } | undefined> {
  try {
    const res = await request.get('/device_subscription', {
      params: {
        type: 'company',
      },
    });

    if (res && res.data.status) {
      const payload = res.data.payload;
      payload.totalLength = parseInt(payload.totalLength);
      payload.content = payload.content.map((sub: any) => ({
        id: sub.ID,
        planId: sub.plan_id,
        subscriptionName: sub.subscription_name,
        subscriptionInterval: sub.subscription_interval,
        subscriptionCode: sub.subscription_code,
        percentage: sub.percentage,
        amount: sub.amount,
        isDirect: sub.is_direct,
        description: sub.description,
        userType: sub.user_type,
        status: sub.status,
        dateModified: sub.date_modified,
        dateCreated: sub.date_created,
        couponCode: sub.coupon_code,
        plan: {
          id: sub.plan.ID,
          dateCreated: sub.plan.date_created,
          planName: sub.plan.plan_name,
          status: sub.plan.status,
        }
      } as Subscription));

      return payload;
    }
    else throw new Error('Error fetching device types');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching device types'));
  }
}