import { ComponentMeta, ComponentStory } from '@storybook/react';
import AddSingleDevice from '../add-single-device';

export default {
  title: 'Business/Add Device/Add Single Device',
  component: AddSingleDevice,
  decorators: [
    (Story) => (
      <div className="flex place-content-center place-items-center">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AddSingleDevice>;

const Template: ComponentStory<typeof AddSingleDevice> = (args) => <AddSingleDevice {...args} />;

export const Default = Template.bind({});
