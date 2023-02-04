import { ComponentMeta, ComponentStory } from '@storybook/react';
import TableLoader from '../daabo-table-loader';

export default {
  title: 'UI/Daabo-Table-Loader',
  component: TableLoader,
} as ComponentMeta<typeof TableLoader>;

const Template: ComponentStory<typeof TableLoader> = () => <TableLoader />;

export const Default = Template.bind({});
