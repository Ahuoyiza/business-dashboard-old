import { ComponentMeta, ComponentStory } from '@storybook/react';
import InputField from '../forms/input-field';

export default {
  title: 'Forms/Input-Field',
  component: InputField,
} as ComponentMeta<typeof InputField>;

const defaultPlaceholder = 'FULL NAME';

export const Default: ComponentStory<typeof InputField> = (args) => <InputField {...args} />;
Default.args = {
  placeholder: defaultPlaceholder,
};

export const Invalid: ComponentStory<typeof InputField> = (args) => <InputField {...args} />;
Invalid.args = {
  placeholder: defaultPlaceholder,
  reactHookOptions: {
    register: (() => {}) as any,
    error: {
      type: 'required',
    },
  },
};
