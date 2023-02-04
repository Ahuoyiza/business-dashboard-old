import { LayoutGroup, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import AddMultipleDevices, { AddMultipleDevicesProps } from './add-multiple-devices';
import AddSingleDevice from './add-single-device';

type AddDeviceInputProps = {
  onInput: AddMultipleDevicesProps['onFileInput'];
};

const AddDevicesInput: FC<AddDeviceInputProps> = ({ onInput }) => {
  const router = useRouter();
  const [inputType, setInputType] = useState<'multiple' | 'individual'>('multiple');

  return (
    <div className="relative w-[74%] rounded-lg bg-[#fcfcfc] px-[4.25rem] py-14">
      <button
        className="absolute top-4 right-4"
        aria-label="Go back to devices"
        onClick={() => router.back()}
      >
        <MdOutlineClose />
      </button>
      <div className="flex justify-between">
        <h4 className="section-heading">Add Devices</h4>
        <div className="flex flex-col">
          <div className="flex gap-24 border-b border-b-[#c4c4c4] py-3 px-4 text-[#c4c4c4]">
            <LayoutGroup>
              <button onClick={() => setInputType('multiple')} className="relative">
                <span className={inputType === 'multiple' ? 'text-daabo-primary-500' : ''}>
                  Multiple Devices
                </span>
                {inputType === 'multiple' && (
                  <motion.div
                    layoutId="underline"
                    className="absolute mt-[0.56rem] flex w-full justify-center"
                  >
                    <svg
                      width="46%"
                      viewBox="0 0 57 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="1.35"
                        y1="1.65"
                        x2="55.65"
                        y2="1.65001"
                        stroke="#6B4EFF"
                        strokeWidth="2.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </button>
              <button onClick={() => setInputType('individual')} className="relative">
                <span className={inputType === 'individual' ? 'text-daabo-primary-500' : ''}>
                  Individual Devices
                </span>
                {inputType === 'individual' && (
                  <motion.div
                    layoutId="underline"
                    className="absolute mt-[0.56rem] flex w-full justify-center"
                  >
                    <svg
                      width="46%"
                      viewBox="0 0 57 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="1.35"
                        y1="1.65"
                        x2="55.65"
                        y2="1.65001"
                        stroke="#6B4EFF"
                        strokeWidth="2.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </button>
            </LayoutGroup>
          </div>
        </div>
      </div>
      {inputType === 'multiple' ? (
        <AddMultipleDevices onFileInput={onInput} />
      ) : (
        <AddSingleDevice />
      )}
    </div>
  );
};

export default AddDevicesInput;
