import { IconlyOutlineDownload, IconlyOutlineArrowUpSquare } from 'components/icons';
import Papa from 'papaparse';
import { FC, useRef, useCallback, ChangeEvent, DragEvent } from 'react';
import { toast } from 'react-toastify';
import { AddDeviceInfo } from 'typings';

async function processCsvFile(file: File | null): Promise<AddDeviceInfo[] | null> {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    Papa.parse<AddDeviceInfo, File>(file, {
      header: true,
      delimiter: ',',
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors && result.errors.length > 1) return reject(result.errors);
        else
          resolve(
            result.data.filter((item) => {
              return (
                item.user_fullname &&
                item.user_phone_number &&
                item.user_email &&
                item.device_type &&
                item.brand &&
                item.device_model &&
                item.imei_number &&
                item.date_purchased &&
                item.device_condition &&
                item.cost_of_device &&
                item.ram &&
                item.motherboard
              );
            })
          );
      },
    });
  });
}

export type AddMultipleDevicesProps = {
  onFileInput: (data: AddDeviceInfo[] | null) => void;
};

const AddMultipleDevices: FC<AddMultipleDevicesProps> = ({ onFileInput }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    async (ev: DragEvent<HTMLDivElement>) => {
      ev.preventDefault();

      let file: File | null;

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface if browser supports it
        const item = ev.dataTransfer.items[0];

        if (item.kind !== 'file' || item.type != 'text/csv') return;

        file = item.getAsFile();
      } else {
        file = ev.dataTransfer.files[0];
      }

      try {
        const result = await processCsvFile(file);
        onFileInput(result);
      } catch (error) {
        toast.error('Error processing file. Please, try again.');
      }
    },
    [onFileInput]
  );

  const handleFileInput = useCallback(
    async (ev: ChangeEvent<HTMLInputElement>) => {
      const file = ev.target.files ? ev.target.files[0] : null;
      try {
        const result = await processCsvFile(file);

        if (result && result.length === 0) {
          toast.error('File is empty or has invalid format.');
        }

        onFileInput(result);
      } catch (error) {
        toast.error('Error processing file. Please, try again.');
      }
    },
    [onFileInput]
  );

  return (
    <div className="mt-5 flex w-full flex-col gap-8">
      <a
        href="/documents/add-devices-sample.csv"
        download
        className="flex justify-center gap-[0.375rem] self-end rounded-lg border border-daabo-primary-500 px-[3.25rem] py-[0.625rem] text-daabo-primary-500 hover:bg-daabo-primary-500 hover:text-white"
      >
        <IconlyOutlineDownload className="text-base" />
        <span className="text-xs font-medium">Download Sample Sheet</span>
      </a>
      <div
        className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#c4c4c4] py-12 text-daabo-grey hover:border-green-500"
        onDrop={handleDrop}
        onDragOver={(ev) => ev.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') fileInputRef.current?.click();
        }}
        tabIndex={0}
        aria-label="Upload devices"
      >
        <IconlyOutlineArrowUpSquare className="text-6xl text-[#4caf50]" />
        <span className="font-medium">Click or drag here to upload devices</span>
        <input
          className="sr-only"
          type="file"
          name="upload-file"
          ref={fileInputRef}
          accept="text/csv"
          onChange={handleFileInput}
        />
        <span className="text-xs">File type accepted: csv</span>
      </div>
    </div>
  );
};

export default AddMultipleDevices;
