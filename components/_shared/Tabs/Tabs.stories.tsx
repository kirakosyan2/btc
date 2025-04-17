import type { Meta, StoryObj } from '@storybook/react';
import { UITabs } from './Tabs';
import { Tabs, TabsProps } from 'antd'; // Импортируем Tabs из antd

const meta = {
    title: 'Example/Tabs',
    component: UITabs,
    parameters: {
        layout: 'centered',
    },
    args: {
        defaultActiveKey: '1',
        tabPosition: 'top',

    },
    tags: ['autodocs'],
} satisfies Meta<typeof UITabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tab 1',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
];

const onChange = (key: string) => {
    console.log(key);
};

export const Default: Story = {
    args: {
        defaultActiveKey: '1',
    },
    render: () => (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    ),
};


