import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchBar from '../forms/search-bar';

export default {
  title: 'Forms/Search-Bar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

export const Default: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;
