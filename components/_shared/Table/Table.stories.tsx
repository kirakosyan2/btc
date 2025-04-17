import type { Meta, StoryObj } from '@storybook/react';
import { UITable } from './Table';


const meta = {
    title: 'Example/Table',
    component: UITable,
    parameters: {
        layout: 'centered',
    },
    args: {
        dataSource: [],
        loading: false,
        bordered: false,
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        columns: [
            {
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Возраст',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
            },
        ],
    },
    argTypes: {
        dataSource: {
            description: 'Данные для отображения в таблице',
            required: true,
        },
        columns: {
            description: 'Структура столбцов таблицы',
            required: true,
        },
        loading: { control: 'boolean' },
        bordered: { control: 'boolean' },
        pagination: {
            description: 'Объект пагинации',
            required: true,
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UITable>;

export default meta;

type Story = StoryObj<typeof meta>;


const sampleData = [
    {
        key: '1',
        name: 'Danny',
        age: 32,
        address: 'Москва, ул. Пушкина, д. 1',
    },
    {
        key: '2',
        name: 'Mari',
        age: 28,
        address: 'Санкт-Петербург, ул. Ленина, д. 2',
    },
    {
        key: '3',
        name: 'Alex',
        age: 45,
        address: 'Екатеринбург, ул. Мира, д. 3',
    },
];

export const Default: Story = {
    args: {
        dataSource: sampleData,
        columns: [
            {
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Возраст',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
            },
        ],
    },
};

export const EmptyTable: Story = {
    args: {
        dataSource: [],
        columns: [
            {
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Возраст',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
            },
        ],
    },
};

export const CustomPagination: Story = {
    args: {
        dataSource: sampleData,
        columns: [
            {
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Возраст',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
            },
        ],
        pagination: {
            pageSize: 2,
        },
    },
};