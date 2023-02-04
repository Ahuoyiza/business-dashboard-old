import { ApiLog, BusinessDevice, DeviceType, PaymentDetail, Subscription } from 'typings';
import throwDevOrProd from 'utils/throwDevOrProd';
import request from '../request';

export async function getApiAnalytics() {
  type Payload = {
    date_calls: string;
    label: 'success_calls' | 'failed_calls';
    total: string;
  };

  try {
    const res = await request.get('/dashboard_api_graph');
    const payload: Payload[] = res.data.payload;

    if (res && res.data.status)
      return payload.reduce(
        (obj, curr) => {
          if (obj.months[obj.months.length - 1] !== curr.date_calls) {
            obj.months.push(curr.date_calls);
          }

          if (curr.label == 'failed_calls') obj.failures.push(parseInt(curr.total));
          else obj.successes.push(parseInt(curr.total));

          return obj;
        },
        { months: [], successes: [], failures: [] } as {
          months: string[];
          successes: number[];
          failures: number[];
        }
      );
    else throw new Error('Error fetching API call status.');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching business information'));
  }
}

export async function getApiLogs() {
  type Payload = {
    totalLength: string;
    content: {
      ID: string;
      user_id: string;
      route: string;
      host: string;
      method: string;
      user_agent: string;
      ip_address: string;
      duration: string;
      status: string;
      date_created: string;
    }[];
  };

  const res = await request.get('/api_logs');

  try {
    const payload: Payload = res.data.payload;

    if (res && res.data.status) {
      const logs: ApiLog[] = payload.content.map((log) => {
        return {
          id: log.ID,
          route: log.route,
          host: log.host,
          method: log.method,
          userAgent: log.user_agent,
          ipAddress: log.ip_address,
          duration: log.duration,
          status: log.status == '0' ? 'failed' : 'successful',
          date: new Date(log.date_created),
        };
      });

      return { content: logs, totalLength: parseInt(payload.totalLength) };
    } else throw new Error('Error fetching API call status');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching business information'));
  }
}

export async function generateApiKey() {
  try {
    const res = await request.get('/generate_api_keys');

    if (res && res.data.status) return res.data.payload.private_key;
    else throw new Error('Error generating API key');
  } catch (error) {
    throwDevOrProd(error, new Error('Error generating API key'));
  }
}

type ApiMetrics = {
  metrics: { typeName: string; total: number }[];
  apiLogs: ApiLog[];
};

export async function getApiMetrics(): Promise<ApiMetrics | undefined> {
  try {
    const res = await request.get('/dashboard_metrics_api');
    const payload = res.data.payload;

    if (!res || !res.data.status) throw new Error('Error fetching metrics');

    return {
      metrics: payload.api_metrics.map((metric: any) => ({
        typeName: metric.type_name,
        total: parseInt(metric.total),
      })),
      apiLogs: payload.api_recent.map((log: any) => ({
        id: log.ID,
        route: log.route,
        host: log.host,
        method: log.method,
        userAgent: log.user_agent,
        ipAddress: log.ip_address,
        duration: log.duration,
        status: log.status == '0' ? 'failed' : 'successful',
        date: new Date(log.date_created),
      })),
    };
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching metrics'));
  }
}

export async function generateTestApiKey() {
  try {
    const res = await request.get('/generate_test_api_keys');

    if (res && res.data.status) return res.data.payload.private_test_key;
    else throw new Error('Error generating API key');
  } catch (error) {
    throwDevOrProd(error, new Error('Error generating API key'));
  }
}

export async function initiateDeviceSubscriptionPayment(devicesHash: string[]) {
  try {
    const res = await request.post('/initiate_payment', JSON.stringify({ devices: devicesHash }));

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error initiating payment');
  } catch (error) {
    throwDevOrProd(error, new Error('Error initiating payment'));
  }
}
