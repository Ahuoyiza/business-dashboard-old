import { ComponentStory, ComponentMeta } from '@storybook/react';
import DeviceSkeleton from '../device-skeleton';

export default {
  title: 'Skeletons/Device-Skeleton',
  component: DeviceSkeleton,
} as ComponentMeta<typeof DeviceSkeleton>;

const Template: ComponentStory<typeof DeviceSkeleton> = () => <DeviceSkeleton />;

export const Default = Template.bind({});

export const FixedWidthWrapper = Template.bind({});
FixedWidthWrapper.decorators = [
  (Story) => (
    <div className="w-[300px]">
      <Story />
    </div>
  ),
];

export const Stacked = Template.bind({});
Stacked.decorators = [
  (Story) => (
    <div className="flex flex-col">
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <div className="w-[300px]" key={index}>
            <Story />
          </div>
        ))}
    </div>
  ),
];
