import type { Meta, StoryObj } from '@storybook/react';
import { TextShorter } from './TextShorter';

const meta = {
    title: 'Example/TextShorter',
    component: TextShorter,
    parameters: {
        layout: 'centered',
    },
    args: {
        tooltip: true,
        title: 'Это длинный текст, который будет обрезан, если не влезет в контейнер.',
        children: 'Это длинный текст, который будет обрезан.',
    },
    argTypes: {
        tooltip: { control: { type: 'boolean' } },
        title: { control: { type: 'text' } },
        children: { control: { type: 'text' } },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TextShorter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <div style={{ width: 100 }}>
            <TextShorter {...args} />
        </div>
    )
};

