import { ComponentMeta, ComponentStory } from '@storybook/react';
import AddDeviceSummaryTable from '../add-devices-summary-table';

export default {
  title: 'Business/Add Device/Add Device Summary Table',
  component: AddDeviceSummaryTable,
} as ComponentMeta<typeof AddDeviceSummaryTable>;

const Template: ComponentStory<typeof AddDeviceSummaryTable> = (args) => (
  <AddDeviceSummaryTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: [],
};
