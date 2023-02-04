import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RemoveDeviceModal from '../remove-device-modal';

export default {
  title: 'Business/Devices/Remove Device Modal',
  component: RemoveDeviceModal,
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof RemoveDeviceModal>;

const Template: ComponentStory<typeof RemoveDeviceModal> = (args) => (
  <RemoveDeviceModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  closeModal: action('close-modal'),
  isOpen: true,
  onRemove: action('remove-device'),
};
