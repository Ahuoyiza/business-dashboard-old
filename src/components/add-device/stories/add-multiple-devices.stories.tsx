import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AddMultipleDevices from '../add-multiple-devices';

export default {
  title: 'Business/Add Device/Add Multiple Devices',
  component: AddMultipleDevices,
  decorators: [
    (Story) => (
      <div className="flex place-content-center place-items-center">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AddMultipleDevices>;

const Template: ComponentStory<typeof AddMultipleDevices> = (args) => (
  <AddMultipleDevices {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onFileInput: action('csv-input'),
};
