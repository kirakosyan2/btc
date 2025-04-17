import type { Meta, StoryObj } from '@storybook/react';
import { UICard } from './Card';

const meta = {
    title: 'Example/Card',
    component: UICard,
    parameters: {
        layout: 'centered',
    },
    args: {
        loading: false,
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        bordered: { control: 'boolean' },
        loading: { control: 'boolean' },
    },
} satisfies Meta<typeof UICard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Заголовок карточки',
        bordered: true,
        children: 'Содержимое карточки',
    },
};

