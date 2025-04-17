import type { Meta, StoryObj } from '@storybook/react';
import { UIPopconfirm } from './Popconfirm';
import { UIButton } from '../Button';


const meta = {
    title: 'Example/Popconfirm',
    component: UIPopconfirm,
    parameters: {
        layout: 'centered',
    },
    args: {
        title: 'Вы хотите продолжить?',
        okText: 'Да, продолжить',
        cancelText: 'Нет, отменить',
        disabled: false,

    },
    argTypes: {
        title: { control: 'text' },
        okText: { control: 'text' },
        cancelText: { control: 'text' },
        disabled: { control: 'boolean' }

    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIPopconfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (


        <UIPopconfirm {...args}>
            <UIButton>Click me</UIButton>
        </UIPopconfirm>

    )


};



