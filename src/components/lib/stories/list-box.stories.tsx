import { ComponentMeta, ComponentStory } from '@storybook/react';
import ListBox from '../forms/list-box';

export default {
  title: 'Forms/List-Box',
  component: ListBox,
} as ComponentMeta<typeof ListBox>;

const items = [
  {
    index: 1,
    name: 'Java',
  },
  {
    index: 2,
    name: 'Python',
  },
  {
    index: 3,
    name: 'Go',
  },
];
export const Default: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;
Default.args = {
  items: items,
};

export const Invalid: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;
Invalid.args = {
  items: items,
  reactHookOptions: {
    register: (() => {}) as any,
    error: {
      type: 'required',
    },
  },
};
