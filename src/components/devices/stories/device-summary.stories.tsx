import { ComponentMeta, ComponentStory } from '@storybook/react';
import DeviceSummary from '../device-summary';

export default {
  title: 'Business/Devices/Device Summary',
  component: DeviceSummary,
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof DeviceSummary>;

const Template: ComponentStory<typeof DeviceSummary> = (args) => <DeviceSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  counts: {
    devices: 100,
    securityPlan: 50,
    insurancePlan: 50,
    activeDevices: 75,
    inactiveDevices: 10,
  },
};
