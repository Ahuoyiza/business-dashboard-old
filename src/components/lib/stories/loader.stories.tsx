import { ComponentMeta, ComponentStory } from '@storybook/react';
import Layout from '../layout';
import Loader from '../loader';

export default {
  title: 'Layout/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Default = Template.bind({});

export const InLayoutNoSideBar = Template.bind({});
InLayoutNoSideBar.decorators = [
  (Story) => (
    <Layout hideSideBar>
      <Story />
    </Layout>
  ),
];

export const InLayout = Template.bind({});
InLayout.decorators = [
  (Story) => (
    <Layout>
      <Story />
    </Layout>
  ),
];
