import { ComponentMeta, ComponentStory } from '@storybook/react';
import AddDeviceSummary from '../add-devices-summary';

export default {
  title: 'Business/Add Device/Add Device Summary',
  component: AddDeviceSummary,
} as ComponentMeta<typeof AddDeviceSummary>;

const Template: ComponentStory<typeof AddDeviceSummary> = (args) => <AddDeviceSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  total: 4,
  deviceValueCount: [1, 1, 1, 1],
};
