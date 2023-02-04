import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CgSmartphone } from 'react-icons/cg';
import MonthlyStatsSummary from '../monthly-stats-summary';

export default {
  title: 'Business/Dashboard/Stats Summary',
  component: MonthlyStatsSummary,
  decorators: [
    (Story) => (
      <div className="w-[15rem]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    direction: {
      options: ['positive', 'negative'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof MonthlyStatsSummary>;

const Template: ComponentStory<typeof MonthlyStatsSummary> = (args) => (
  <MonthlyStatsSummary {...args} />
);

export const StatA = Template.bind({});
StatA.args = {
  color: '#D14343',
  title: 'Devices Protected',
  direction: 'positive',
  data: Intl.NumberFormat('en-NG').format(1500),
  percentageChange: 12,
  icon: <CgSmartphone />,
};

export const StatB = Template.bind({});
StatB.args = {
  ...StatA.args,
  direction: 'negative',
};
