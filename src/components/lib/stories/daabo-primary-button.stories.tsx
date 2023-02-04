import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../button';

export default {
  title: 'Buttons/Primary',
  component: Button,
} as ComponentMeta<typeof Button>;

const defaultValue = 'Hello World';

export const Default: ComponentStory<typeof Button> = (args) => <Button {...args} />;
Default.args = {
  children: defaultValue,
};

export const Loading: ComponentStory<typeof Button> = (args) => <Button {...args} />;
Loading.args = {
  children: defaultValue,
  loading: true,
};
