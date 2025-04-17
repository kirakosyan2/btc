import type { Meta, StoryObj } from '@storybook/react';
import { UITooltip } from './Tooltip';
import { UIButton } from '../Button';

const meta = {
    title: 'Example/Tooltip',
    component: UITooltip,
    parameters: {
        layout: 'centered',
    },
    args: {
        title: 'Это подсказка',
        children: 'Наведи на меня',
        visible: false,
    },
    argTypes: {
        title: { control: 'text' },
        placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
        children: { control: 'text' },
        visible: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UITooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <UITooltip {...args}>
            <UIButton>{args.children}</UIButton>
        </UITooltip>
    )
};

