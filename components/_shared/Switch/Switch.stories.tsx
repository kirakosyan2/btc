import { useState } from 'react';

import { UISwitch } from './Switch';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Example/Switch',
    component: UISwitch,
    parameters: {
        layout: 'centered',
    },
    args: {
        checked: false,
        onChange: () => {},
        disabled: false,
        loading: false,
    },
    argTypes: {
        checked: {
            control: { type: 'boolean' },
        },
        onChange: { action: 'onChange' },

        disabled: { control: 'boolean' },
        size: {
            control: { type: 'select', options: ['small', 'medium', 'large'] },
        },
        loading: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UISwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <UISwitch
                checked={checked}
                onChange={(checked: boolean) => {
                    setChecked(checked);
                    console.log('Состояние переключателя:', checked);
                }}
            />
        );
    },
};

export const Checked: Story = {
    render: () => {
        const [checked, setChecked] = useState(true);
        return (
            <UISwitch
                checked={checked}
                onChange={(checked: boolean) => {
                    setChecked(checked);
                    console.log('Состояние переключателя:', checked);
                }}
            />
        );
    },
};

export const Disabled: Story = {
    render: () => {
        return (
            <UISwitch
                checked={false}
                disabled={true}
                onChange={(checked: boolean) =>
                    console.log('Состояние переключателя:', checked)
                }
            />
        );
    },
};

export const CustomColor: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <UISwitch
                checked={checked}
                onChange={(checked: boolean) => {
                    setChecked(checked);
                    console.log('Состояние переключателя:', checked);
                }}
                style={{ backgroundColor: 'red' }}
            />
        );
    },
};
