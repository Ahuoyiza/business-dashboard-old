import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from '../header';

export default {
  title: 'Layout/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedOut = Template.bind({});

export const LoggingIn = Template.bind({});

export const LoggedIn = Template.bind({});
