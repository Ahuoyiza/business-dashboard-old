import { ComponentMeta, ComponentStory } from '@storybook/react';
import DeviceTable from '../device-table';

export default {
  title: 'Business/Devices/Device Table',
  component: DeviceTable,
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof DeviceTable>;

const Template: ComponentStory<typeof DeviceTable> = (args) => <DeviceTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  data: [],
};
