import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ViewAddDevicesModal from '../view-add-device-modal';
import { Default as AddDevicesSummaryTableStoriesDefault } from './add-devices-summary-table.stories';

export default {
  title: 'Business/Add Device/View Add Device Modal',
  component: ViewAddDevicesModal,
} as ComponentMeta<typeof ViewAddDevicesModal>;

const Template: ComponentStory<typeof ViewAddDevicesModal> = (args) => (
  <ViewAddDevicesModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: AddDevicesSummaryTableStoriesDefault.args?.data?.at(0),
  closeModal: action('close-modal'),
  isOpen: true,
};
