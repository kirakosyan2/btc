import type { Meta, StoryObj } from '@storybook/react';
import { UISpinner } from './Spinner';

const meta = {
    title: 'Example/Spinner',
    component: UISpinner,
    parameters: {
        layout: 'centered',
    },
    args: {
        size: 'default',
        tip: 'Загрузка...',
    },
    argTypes: {
        size: { control: 'select', options: ['default', 'small', 'large'] },
        tip: { control: 'text' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UISpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'default',
        tip: 'Загрузка...',
    },
};


export const SpinningWithDelay: Story = {
    args: {
        spinning: true,
        delay: 500,
        tip: 'Загрузка с задержкой...',
    },
};