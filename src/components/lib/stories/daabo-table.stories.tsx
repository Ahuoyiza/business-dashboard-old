import { ComponentMeta, ComponentStory } from '@storybook/react';
import DaaboTable from '../daabo-table';

export default {
  title: 'UI/Daabo Table',
  component: DaaboTable,
} as ComponentMeta<typeof DaaboTable>;

const Template: ComponentStory<typeof DaaboTable> = (args) => <DaaboTable {...args} />;

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};

export const WithData = Template.bind({});
WithData.args = {
  columns: [
    {
      Header: 'ORDER ID',
      accessor: 'orderId',
      minWidth: 30,
      width: 100,
      maxWidth: 200,
      Cell: (props) => <span className="uppercase text-daabo-primary">{props.value}</span>,
    },
    {
      Header: 'DATE',
      accessor: 'date',
      minWidth: 30,
      width: 150,
      maxWidth: 200,
      Cell: (props) => <span className="whitespace-nowrap text-daabo-grey">{props.value}</span>,
    },
    {
      Header: 'AMOUNT',
      accessor: 'amount',
      minWidth: 30,
      width: 75,
      maxWidth: 200,
      Cell: (props) => <span className="font-semibold">{props.value}</span>,
    },
    {
      Header: 'STATUS',
      accessor: 'status',
      minWidth: 30,
      width: 70,
      maxWidth: 200,
      Cell: (props) => <span className="capitalize text-[#c70000]">{props.value}</span>,
    },
  ],
  data: [
    {
      orderId: 1,
      date: new Date(2022, 10, 24, 22, 10, 11).toString(),
      amount: '₦10000',
      status: 'FAILED',
    },
    {
      orderId: 12,
      date: new Date(2022, 10, 14, 22, 10, 11).toString(),
      amount: '₦50000',
      status: 'FAILED',
    },
  ],
};

export const LoadingWithData = Template.bind({});
LoadingWithData.args = {
  ...WithData.args,
  isLoading: true,
};

export const LoadingWhileEmpty = Template.bind({});
LoadingWhileEmpty.args = {
  columns: WithData.args.columns,
  isLoading: true,
};
