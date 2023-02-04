import { stat } from 'fs/promises';
import { addDevice, getDeviceSubscriptions, getDeviceTypes } from 'lib/requests';
import { useRouter } from 'next/router';
import { Reducer, FC, useReducer, useEffect } from 'react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import routes from 'routes';

type AddDeviceFormState = {
  type: string;
  brand: string;
  model: string;
  imei: string;
  datePurchased: string;
  condition: string;
  cost: number;
  plan: string;
  userFullName: string;
  userEmail: string;
  userPhoneNumber: string;
};

type StringAddDeviceFormAction = {
  type:
    | 'SET_TYPE'
    | 'SET_BRAND'
    | 'SET_MODEL'
    | 'SET_IMEI'
    | 'SET_DATE_PURCHASED'
    | 'SET_CONDITION'
    | 'SET_CONDITION'
    | 'SET_PLAN'
    | 'SET_USER_FULLNAME'
    | 'SET_USER_EMAIL'
    | 'SET_USER_PHONE_NUMBER';
  data: string;
};

type NumberAddDeviceFormAction = {
  type: 'SET_COST';
  data: number;
};

type AddDeviceFormAction = StringAddDeviceFormAction | NumberAddDeviceFormAction;

const formReducer: Reducer<AddDeviceFormState, AddDeviceFormAction> = (state, action) => {
  switch (action.type) {
    case 'SET_BRAND':
      return { ...state, brand: action.data };
    case 'SET_CONDITION':
      return { ...state, condition: action.data };
    case 'SET_COST':
      return { ...state, cost: action.data };
    case 'SET_DATE_PURCHASED':
      return { ...state, datePurchased: action.data };
    case 'SET_IMEI':
      return { ...state, imei: action.data };
    case 'SET_MODEL':
      return { ...state, model: action.data };
    case 'SET_TYPE':
      return { ...state, type: action.data };
    case 'SET_PLAN':
      return { ...state, plan: action.data };
    case 'SET_USER_EMAIL':
      return { ...state, userEmail: action.data };
    case 'SET_USER_FULLNAME':
      return { ...state, userFullName: action.data };
    case 'SET_USER_PHONE_NUMBER':
      return { ...state, userPhoneNumber: action.data };
    default:
      return state;
  }
};

const AddSingleDevice: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: deviceTypes } = useQuery('device_type', () =>
    getDeviceTypes().then((data) =>
      data?.table_data?.filter((item) => item.typeName === 'Mobile Phone')
    )
  );
  const { data: deviceSubscriptions } = useQuery(['business', 'plan'], () =>
    getDeviceSubscriptions().then((data) =>
      data?.content?.filter((sub) => sub.userType === 'company')
    )
  );
  const addDeviceMutation = useMutation(
    (deviceData: Parameters<typeof addDevice>[0]) => addDevice(deviceData),
    {
      onSuccess: (data) => {
        if (data.authorization_url) {
          window.open(data.authorization_url, '_blank', 'popup');
        } else {
          toast.success('Device added');
        }
        queryClient.invalidateQueries('business-devices');
        router.push(routes.DEVICES);
      },
      onError: () => {
        toast.error('Error adding device');
      },
    }
  );
  const [state, dispatch] = useReducer(formReducer, {
    type: '',
    brand: '',
    model: '',
    imei: '',
    datePurchased: '',
    condition: '',
    cost: 0,
    plan: '',
    userEmail: '',
    userFullName: '',
    userPhoneNumber: '',
  });

  useEffect(() => {
    dispatch({ type: 'SET_TYPE', data: deviceTypes?.at(0)?.id || '' });
  }, [deviceTypes]);

  useEffect(() => {
    dispatch({ type: 'SET_PLAN', data: deviceSubscriptions?.at(0)?.id || '' });
  }, [deviceSubscriptions]);

  return (
    <form
      className="mt-8 flex w-full flex-wrap justify-between gap-y-8 gap-x-4"
      onSubmit={(ev) => {
        ev.preventDefault();
        if (!ev.currentTarget.checkValidity()) return;
        addDeviceMutation.mutate({
          datePurchased: state.datePurchased,
          deviceCondition: state.condition,
          deviceCost: String(state.cost),
          deviceTypeId: state.type,
          subscriptionId: state.plan,
          deviceInfo: {
            brand: state.brand,
            imeiNumber: state.imei,
            model: state.model,
            ram: `${(navigator as any).deviceMemory}GB`,
          },
          user: {
            email: state.userEmail,
            fullName: state.userFullName,
            phoneNumber: state.userPhoneNumber,
          },
        });
      }}
    >
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">Device Type</span>
        <select
          required
          value={state.type}
          onChange={(ev) => dispatch({ type: 'SET_TYPE', data: ev.target.value })}
          placeholder="Choose device type"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        >
          {deviceTypes?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.typeName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">Device Brand</span>
        <input
          required
          value={state.brand}
          onChange={(ev) => dispatch({ type: 'SET_BRAND', data: ev.target.value })}
          placeholder="Enter device brand"
          type="input"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">Device Model</span>
        <input
          required
          value={state.model}
          onChange={(ev) => dispatch({ type: 'SET_MODEL', data: ev.target.value })}
          placeholder="Enter device model"
          type="text"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">IMEI/Serial Number</span>
        <input
          value={state.imei}
          placeholder="Dial *#06# to get your IMEI number on mobile devices"
          onChange={(ev) => dispatch({ type: 'SET_IMEI', data: ev.target.value })}
          type="text"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">Date Purchased</span>
        <input
          required
          value={state.datePurchased}
          onChange={(ev) => dispatch({ type: 'SET_DATE_PURCHASED', data: ev.target.value })}
          type="date"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">Device Cost</span>
        <input
          required
          value={state.cost ? state.cost : ''}
          onChange={(ev) => dispatch({ type: 'SET_COST', data: parseInt(ev.target.value) })}
          placeholder="How much did you buy your device?"
          type="number"
          min={10000}
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">Plan</span>
        <select
          required
          value={state.plan}
          onChange={(ev) => dispatch({ type: 'SET_PLAN', data: ev.target.value })}
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        >
          {deviceSubscriptions?.map((sub) => (
            <option key={sub.id} value={sub.id || ''}>
              {`${sub.plan?.planName} - ${sub.subscriptionName}`}
            </option>
          ))}
        </select>
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">User&apos;s Name</span>
        <input
          required
          value={state.userFullName ? state.userFullName : ''}
          onChange={(ev) => dispatch({ type: 'SET_USER_FULLNAME', data: ev.target.value })}
          placeholder="Enter user's full name"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">User&apos;s Email</span>
        <input
          required
          value={state.userEmail ? state.userEmail : ''}
          onChange={(ev) => dispatch({ type: 'SET_USER_EMAIL', data: ev.target.value })}
          placeholder="Enter user's email address"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-[45%] flex-col">
        <span className="font-medium">User&apos;s Phone Number</span>
        <input
          required
          value={state.userPhoneNumber ? state.userPhoneNumber : ''}
          onChange={(ev) => dispatch({ type: 'SET_USER_PHONE_NUMBER', data: ev.target.value })}
          placeholder="Enter user's phone number"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <label className="flex basis-full flex-col">
        <span className="font-medium">Device Condition</span>
        <textarea
          required
          rows={5}
          value={state.condition}
          onChange={(ev) => dispatch({ type: 'SET_CONDITION', data: ev.target.value })}
          placeholder="Tell us about the device condition"
          className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
        />
      </label>
      <div className="flex basis-full justify-center">
        <button type="submit" className="daabo-primary-button text-base">
          Protect Device
        </button>
      </div>
    </form>
  );
};

export default AddSingleDevice;
