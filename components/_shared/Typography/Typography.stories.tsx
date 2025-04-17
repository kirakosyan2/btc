import type { Meta, StoryObj } from '@storybook/react';
import { UITypography } from './Typography';

const meta = {
    title: 'Example/Typography',
    component: UITypography,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: '',
        style: {},
        disabled: false,
    },
    argTypes: {
        children: { control: 'text' },
        style: { control: 'object' },

    },
    tags: ['autodocs'],
} satisfies Meta<typeof UITypography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Это стандартный абзац текста.',
    },
};

export const WithCustomStyle: Story = {
    args: {
        children: 'Это абзац с пользовательским стилем.',
        style: { color: 'blue', fontSize: '18px' },
    },
};

export const LongText: Story = {
    args: {
        children: 'Это очень длинный абзац текста, который демонстрирует поведение компонента при наличии большого количества текста. ' +
            'Он может включать в себя различные предложения и даже примеры, чтобы показать, как текст будет выглядеть в компоненте.',
    },
};

export const StrongText: Story = {
    args: {
        children: (
            <>
                <strong>Это жирный текст</ strong > в абзаце, который демонстрирует возможность комбинирования различных стилей.
            </>
        ),
    },
};