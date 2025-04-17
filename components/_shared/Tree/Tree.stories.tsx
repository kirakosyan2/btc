import type { Meta, StoryObj } from '@storybook/react';
import { UITree } from './Tree';

const treeData = [
    {
        title: 'Дерево 1',
        key: '0-0',
        children: [
            {
                title: 'Дерево 1.1',
                key: '0-0-0',
                children: [
                    {
                        title: 'Дерево 1.1.1',
                        key: '0-0-0-0',
                    },
                    {
                        title: 'Дерево 1.1.2',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'Дерево 1.2',
                key: '0-0-1',
            },
        ],
    },
    {
        title: 'Дерево 2',
        key: '0-1',
        children: [
            {
                title: 'Дерево 2.1',
                key: '0-1-0',
            },
        ],
    },
];

const meta = {
    title: 'Example/Tree',
    component: UITree,
    parameters: {
        layout: 'centered',
    },
    args: {
        draggable: false,
        showLine: true,
        showIcon: true,
        treeData,
    },
    argTypes: {
        draggable: { control: 'boolean' },
        showLine: { control: 'boolean' },
        showIcon: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UITree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
