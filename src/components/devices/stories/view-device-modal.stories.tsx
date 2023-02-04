import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ViewDeviceModal from '../view-device-modal';

export default {
  title: 'Business/Devices/View Device Modal',
  component: ViewDeviceModal,
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ViewDeviceModal>;

const Template: ComponentStory<typeof ViewDeviceModal> = (args) => <ViewDeviceModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  closeModal: action('close-modal'),
  isOpen: true,
  data: {
    amount: 50000,
    date: new Date(),
    description: 'Samsung J5',
    id: '10230234',
    status: 'Active',
    type: 'mobile',
    user: 'Ranti Adeogo',
  } as any,
};
