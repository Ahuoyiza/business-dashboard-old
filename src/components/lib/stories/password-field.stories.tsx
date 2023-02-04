import { ComponentMeta, ComponentStory } from '@storybook/react';
import PasswordField from '../forms/password-field';

export default {
  title: 'Forms/Password-Field',
  component: PasswordField,
} as ComponentMeta<typeof PasswordField>;

const defaultPlaceholder = 'PASSWORD';

export const Default: ComponentStory<typeof PasswordField> = (args) => <PasswordField {...args} />;
Default.args = {
  placeholder: defaultPlaceholder,
};

export const Invalid: ComponentStory<typeof PasswordField> = (args) => <PasswordField {...args} />;
Invalid.args = {
  placeholder: defaultPlaceholder,
  reactHookOptions: {
    register: (() => {}) as any,
    error: {
      type: 'required',
    },
  },
};
