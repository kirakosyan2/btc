import type { Meta, StoryObj } from '@storybook/react';
import { IconText } from './IconText';
import { LoginOutlined } from '@ant-design/icons';

const meta = {
    title: 'Example/IconText',
    component: IconText,
    parameters: {
        layout: 'centered',
    },
    args: {
        icon: LoginOutlined,
        text: 'Пример текста',
        className: 'icon-text',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof IconText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

