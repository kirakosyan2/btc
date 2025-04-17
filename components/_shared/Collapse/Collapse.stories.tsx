// Collapse.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { UICollapse } from './Collapse';
import { CollapseProps } from 'antd';

const meta = {
  title: 'Example/Collapse',
  component: UICollapse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    items: [],
    style: {
      width: 500,
    },
  },
  argTypes: {
    items: { control: 'object' },
  },
} satisfies Meta<typeof UICollapse>;

export default meta;

type Story = StoryObj<typeof meta>;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Это заголовок панели 1',
    children: <p>{text}</p>,
    collapsible: 'header',
    extra: <span>Дополнительный элемент</span>,
    showArrow: true,
  },
  {
    key: '2',
    label: 'Это заголовок панели 2',
    children: <p>{text}</p>,
    collapsible: 'icon',
    extra: <span>Дополнительный элемент</span>,
    showArrow: true,
  },
  {
    key: '3',
    label: 'Это заголовок панели 3',
    children: <p>{text}</p>,
    collapsible: 'disabled',
    extra: <span>Дополнительный элемент</span>,
    showArrow: false,
  },
];

export const Default: Story = {
  args: {
    items,
  },
};

export const SinglePanel: Story = {
  args: {
    items: [
      {
        key: '1',
        label: 'Это заголовок единственной панели',
        children: <p>{text}</p>,
        collapsible: 'header',
        extra: <span>Дополнительный элемент</span>,
        showArrow: true,
      },
    ],
  },
};

export const MultiplePanels: Story = {
  args: {
    items: [
      {
        key: '1',
        label: 'Это заголовок панели 1',
        children: <p>{text}</p>,
        collapsible: 'header',
        extra: <span>Дополнительный элемент</span>,
        showArrow: true,
      },
      {
        key: '2',
        label: 'Это заголовок панели 2',
        children: <p>{text}</p>,
        collapsible: 'icon',
        extra: <span>Дополнительный элемент</span>,
        showArrow: true,
      },
      {
        key: '3',
        label: 'Это заголовок панели 3',
        children: <p>{text}</p>,
        collapsible: 'disabled',
        extra: <span>Дополнительный элемент</span>,
        showArrow: false,
      },
    ],
  },
};