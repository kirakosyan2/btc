import type { Meta, StoryObj } from '@storybook/react';
import { UIStatistic, UIStatisticProps } from './Statistic';
import CountUp from 'react-countup';

const formatter: UIStatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} />
);

const meta = {
    title: 'Example/Statistic',
    component: UIStatistic,
    parameters: {
        layout: 'centered',
    },
    args: {
        title: 'Количество пользователей',
        value: 100,
        suffix: 'человек',
        formatter: formatter,
        loading: false
    },
    argTypes: {
        loading: { control: 'boolean' },
        value: { control: 'number' },
        title: { control: 'text' },
        suffix: { control: 'text' }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIStatistic>;

export default meta;

type Story = StoryObj<typeof meta>;



export const Default: Story = {
    args: {
        title: 'Количество пользователей',
        value: 100,
    },
};
