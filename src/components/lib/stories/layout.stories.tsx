import { ComponentMeta, ComponentStory } from '@storybook/react';
import Layout from 'components/lib/layout';

export default {
  title: 'Layout/Layout',
  component: Layout,
  argTypes: {
    hideSideBar: {
      description: 'Switch to hide or show the sidebar',
      defaultValue: false,
      type: 'boolean',
    },
    isAuthenticated: {
      defaultValue: false,
      type: 'boolean',
      description: 'Tells the layout if it is rendering protected content',
    },
    userType: {
      description: 'Layout type which is based on the authenticated user type',
      defaultValue: 'individual',
      type: {
        value: ['individual', 'business'],
      },
    },
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});

export const BusinessLoggedOut = Template.bind({});
BusinessLoggedOut.args = {};

export const BusinessLoggedIn = Template.bind({});
BusinessLoggedIn.args = {};
