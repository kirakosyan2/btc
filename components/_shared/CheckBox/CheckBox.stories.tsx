import type { Meta, StoryObj } from '@storybook/react';
import { UICheckBox } from './CheckBox';

const meta = {
    title: 'Example/Checkbox',
    component: UICheckBox,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: 'Стандартный чекбокс',
        checked: false,
        disabled: false,
    },
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof UICheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
