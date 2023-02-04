import { ComponentMeta, ComponentStory } from '@storybook/react';
import AddDevicesPreview from '../add-devices-preview';
import { Default as AddDevicesSummaryTableStoriesDefault } from './add-devices-summary-table.stories';

export default {
  title: 'Business/Add Device/Add Device Preview',
  component: AddDevicesPreview,
  decorators: [
    (Story) => (
      <div className="flex place-content-center place-items-center">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AddDevicesPreview>;

const Template: ComponentStory<typeof AddDevicesPreview> = (args) => (
  <AddDevicesPreview {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: AddDevicesSummaryTableStoriesDefault.args?.data,
};
