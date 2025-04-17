import type { Meta, StoryObj } from '@storybook/react';
import { UIProgressBar } from './ProgressBar';

const meta = {
    title: 'Example/ProgressBar',
    component: UIProgressBar,
    parameters: {
        layout: 'centered',

    },
    args: {
        percent: 50,
        status: 'active',
        showInfo: true,
        type: 'line',
    },
    argTypes: {
        percent: { control: 'number' },
        status: { control: 'select', options: ['active', 'exception', 'success'] },
        showInfo: { control: 'boolean' },
        strokeColor: { control: 'color' },
        type: { control: 'select', options: ['line', 'circle', 'dashboard'] },

    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        percent: 50,
        status: 'active',
        showInfo: true,
        type: 'line',
    },
};

export const Success: Story = {
    args: {
        percent: 100,
        status: 'success',
        showInfo: true,
    },
};

export const Error: Story = {
    args: {
        percent: 30,
        status: 'exception',
        showInfo: true,
    },
};

export const CustomColor: Story = {
    args: {
        percent: 75,
        strokeColor: '#52c41a',
        showInfo: true,
    },
};

export const NoInfo: Story = {
    args: {
        percent: 60,
        showInfo: true,
    },
};