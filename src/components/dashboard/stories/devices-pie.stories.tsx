import { ComponentMeta, ComponentStory } from '@storybook/react';
import DevicesPieChart from '../devices-pie-chart';

export default {
  title: 'Business/Dashboard/Devices Pie Chart',
  component: DevicesPieChart,
  decorators: [
    (Story) => (
      <div className="w-[17rem]">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof DevicesPieChart>;

const Template: ComponentStory<typeof DevicesPieChart> = (args) => <DevicesPieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  desktop: 100,
  mobile: 50,
  tablet: 11,
};
