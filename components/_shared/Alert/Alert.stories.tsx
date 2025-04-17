
import type { Meta, StoryObj } from '@storybook/react';
import { UIAlert } from './Alert';

const meta = {
    title: 'Example/Alert',
    component: UIAlert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        message: 'Это сообщение об ошибке!',
        description: 'Здесь вы можете найти более подробную информацию.',
        type: 'error',
        showIcon: true,
        closable: true,
        banner: false,
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['success', 'info', 'warning', 'error'],

        },
        banner: { control: 'boolean' },
        closable: { control: 'boolean' },
        showIcon: { control: 'boolean' },
        description: { control: 'text' },
        message: { control: 'text' }
    },
} satisfies Meta<typeof UIAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: 'Это сообщение об успешном действии!',
        description: 'Здесь вы можете найти более подробную информацию.',
        type: 'success',
    },
};

export const CustomIcon: Story = {
    args: {
        message: 'Кастомная иконка!',
        description: 'Вы можете использовать кастомные иконки.',
        icon: <span role="img" aria-label="custom-icon">🌟</span>,
    },
};