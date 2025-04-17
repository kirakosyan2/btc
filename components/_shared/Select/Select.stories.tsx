import type { Meta, StoryObj } from '@storybook/react';
import { UISelect } from './Select';


const meta = {
    title: 'Example/Select',
    component: UISelect,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Выберите опцию',
        disabled: false,
        loading: false,
    },
    argTypes: {
        placeholder: { control: 'text' },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UISelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' },
];

export const Default: Story = {
    args: {
        placeholder: 'Выберите опцию',
        options: options,
    },
};



