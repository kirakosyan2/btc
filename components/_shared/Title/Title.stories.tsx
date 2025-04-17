import type { Meta, StoryObj } from '@storybook/react';
import { UITitle } from './Title';

const meta = {
    title: 'Example/Title',
    component: UITitle,
    parameters: {
        layout: 'centered',
    },
    args: {
        level: 1,
        children: 'Простой заголовок',
        disabled: false,
    },
    argTypes: {
        level: { control: 'number' },
        children: { control: 'text' },
        disabled: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UITitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        level: 1,
        children: 'Заголовок по умолчанию',
    },
};

export const SecondaryTitle: Story = {
    args: {
        level: 2,
        children: 'Вторичный заголовок',
    },
};

export const TertiaryTitle: Story = {
    args: {
        level: 3,
        children: 'Третичный заголовок',
    },
};

export const CustomStyle: Story = {
    args: {
        level: 1,
        children: 'Кастомный стиль заголовка',
        style: { color: 'blue', fontSize: '24px' },
    },
};

export const LongTitle: Story = {
    args: {
        level: 1,
        children: 'Это очень длинный заголовок, который демонстрирует поведение заголовка в случае длинного текста.',
    },
};