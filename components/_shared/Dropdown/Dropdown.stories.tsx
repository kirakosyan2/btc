import type { Meta, StoryObj } from '@storybook/react';
import { UIDropdown } from './Dropdown';
import { UIButton } from '../Button';
import { SmileOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: '1st menu item',
    },
    {
        key: '2',
        label: '2nd menu item (disabled)',
        icon: <SmileOutlined />,
        disabled: true,
    },
    {
        key: '3',
        label: '3rd menu item (disabled)',
        disabled: true,
    },
    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];

const meta = {
    title: 'Example/Dropdown',
    component: UIDropdown,
    parameters: {
        layout: 'centered',
    },
    args: {
        trigger: ['hover'],
        menu: { items },
        children: 'Hover or click',
        disabled: false,
    },
    argTypes: {
        trigger: { control: 'select', options: ['click', 'hover'] },
        children: { control: 'text' },
        disabled: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Hover: Story = {
    render: ({ menu, disabled, children, trigger }) => (
        <UIDropdown trigger={trigger} menu={menu} disabled={disabled}>
            <UIButton>{children}</UIButton>
        </UIDropdown>
    )
};