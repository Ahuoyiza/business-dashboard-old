import { Dialog } from '@headlessui/react';
import { Dispatch, FC } from 'react';
import { BiX } from 'react-icons/bi';
import { FormAction, FormState } from 'typings';

type ClaimRequestFormProps = {
  isOpen: boolean;
  close: () => void;
  state: FormState;
  dispatch: Dispatch<FormAction>;
};

const ClaimRequestForm: FC<ClaimRequestFormProps> = ({ isOpen, close, state, dispatch }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto py-8"
      onClose={close}
    >
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
        <div className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-[#fcfcfc] pb-10 align-middle transition-all">
          <div className="container flex h-[25vh] items-center justify-center pt-10">
            This is coming soon...
          </div>
          {/* <Dialog.Title
            as="div"
            className="flex justify-between pt-5 pb-4 px-[2.5rem] border border-[#dadada]"
          >
            <h6 className="font-semibold">Claim Request Form</h6>
            <button onClick={close}>
              <BiX className="text-2xl cursor-pointer" />
            </button>
          </Dialog.Title>
          <div className="mt-8 px-[2.5rem] flex flex-col gap-8 w-full">
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Name</span>
              <select
                value={state.deviceName}
                onChange={(ev) => dispatch({ type: 'SET_DEVICE_NAME', data: ev.target.value })}
                placeholder="Choose device name"
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              >
                <option>Hehehe</option>
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Incident</span>
              <select
                value={state.incident}
                onChange={(ev) => dispatch({ type: 'SET_INCIDENT', data: ev.target.value })}
                placeholder="Choose incident type"
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              >
                <option>Screen Damage</option>
                <option>Loss/Theft</option>
                <option>Water Damage</option>
                <option>Device Part Damage</option>
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Incident Date</span>
              <input
                value={state.incidentDate}
                onChange={(ev) => dispatch({ type: 'SET_INCIDENT_DATE', data: ev.target.value })}
                placeholder="Date incident occured"
                type="date"
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Upload image of damage, if any</span>
              <input
                onChange={(ev) =>
                  dispatch({
                    type: 'SET_DAMAGE_IMAGE',
                    data: ev.target.files?.item(0) || undefined,
                  })
                }
                placeholder="Date incident occured"
                type="file"
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Has this occured to the device before?</span>
              <select
                value={state.occuredBefore ? 1 : 0}
                onChange={(ev) => dispatch({ type: 'SET_OCCURED_BEFORE', data: !!ev.target.value })}
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Has this device been fixed before?</span>
              <select
                value={state.fixedBefore ? 1 : 0}
                onChange={(ev) => dispatch({ type: 'SET_FIXED_BEFORE', data: !!ev.target.value })}
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Incident Location</span>
              <input
                value={state.incidentLocation}
                onChange={(ev) =>
                  dispatch({ type: 'SET_INCIDENT_LOCATION', data: ev.target.value })
                }
                placeholder="Where did the incident happen?"
                type="text"
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Current Location</span>
              <input
                value={state.currentLocation}
                onChange={(ev) => dispatch({ type: 'SET_CURRENT_LOCATION', data: ev.target.value })}
                placeholder="Where are you now?"
                type="text"
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Details</span>
              <textarea
                value={state.details}
                onChange={(ev) => dispatch({ type: 'SET_DETAILS', data: ev.target.value })}
                placeholder="Tell us more about the incident"
                rows={5}
                className="w-full px-4 py-2 bg-transparent border border-daabo-grey rounded-lg focus-visible:outline-daabo-primary"
              />
            </label>
            <button
              onClick={() => dispatch({ type: 'SUBMIT' })}
              className="daabo-primary-button text-base"
            >
              Submit Request
            </button>
          </div> */}
        </div>
      </div>
    </Dialog>
  );
};

export default ClaimRequestForm;
