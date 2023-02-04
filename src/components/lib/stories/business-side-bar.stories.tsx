import { ComponentMeta, ComponentStory } from '@storybook/react';
import BusinessSideBar from '../business-side-bar';

export default {
  title: 'Library/Business Sidebar',
  component: BusinessSideBar,
} as ComponentMeta<typeof BusinessSideBar>;

const Template: ComponentStory<typeof BusinessSideBar> = (args) => <BusinessSideBar {...args} />;

export const Default = Template.bind({});
