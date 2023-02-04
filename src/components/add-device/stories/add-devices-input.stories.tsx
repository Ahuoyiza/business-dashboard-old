import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AddDevicesInput from '../add-devices-input';

export default {
  title: 'Business/Add Device/Add Device Input',
  component: AddDevicesInput,
  decorators: [
    (Story) => (
      <div className="flex place-content-center place-items-center">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AddDevicesInput>;

const Template: ComponentStory<typeof AddDevicesInput> = (args) => <AddDevicesInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  onInput: action('csv-input'),
};
