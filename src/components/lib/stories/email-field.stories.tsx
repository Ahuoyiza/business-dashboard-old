import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmailField from '../forms/email-field';

export default {
  title: 'Forms/Email-Field',
  component: EmailField,
} as ComponentMeta<typeof EmailField>;

const defaultPlaceholder = 'EMAIL ADDRESS';

export const Default: ComponentStory<typeof EmailField> = (args) => <EmailField {...args} />;
Default.args = {
  placeholder: defaultPlaceholder,
};

export const Invalid: ComponentStory<typeof EmailField> = (args) => <EmailField {...args} />;
Invalid.args = {
  placeholder: defaultPlaceholder,
  reactHookOptions: {
    register: (() => {}) as any,
    error: {
      type: 'required',
    },
  },
};
