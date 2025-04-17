import type { Meta, StoryObj } from '@storybook/react';
import { UIItem, UIList, UIMeta } from './List';

const meta = {
    title: 'Example/List',
    component: UIList,
    parameters: {
        layout: 'centered',
    },
    args: {
        loading: false,
        itemLayout: 'horizontal',
        pagination: { align: 'end', position: 'bottom' }
    },
    argTypes: {
        dataSource: { control: 'object' },
        loading: { control: 'boolean' },
        itemLayout: { control: 'select', options: ['vertical', 'horizontal'] },
        pagination: { control: 'boolean' }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIList>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleData = [
    { title: 'Элемент 1', description: 'Описание элемента 1' },
    { title: 'Элемент 2', description: 'Описание элемента 2' },
    { title: 'Элемент 3', description: 'Описание элемента 3' },
];

export const Default: Story = {
    args: {
        dataSource: sampleData,
    },
    render: ({ loading, itemLayout, pagination }) => (
        <UIList
            dataSource={sampleData}
            loading={loading}
            itemLayout={itemLayout}
            pagination={pagination}
            renderItem={(item) => (
                <UIItem key={item.title} actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}>
                    <UIMeta title={item.title} />
                    {item.description}
                </UIItem>
            )}>
        </UIList>
    ),
};

// export const EmptyList: Story = {
//     args: {
//         dataSource: [],
//         re: (item: { title: string; description: string }) => (
//             <List.Item>
//                 <List.Item.Meta title={item.title} description={item.description} />
//             </List.Item>
//         ),
//     },
// };

// export const CustomRender: Story = {
//     args: {
//         dataSource: sampleData,
//         r: (item: { title: string; description: string }) => (
//             <List.Item>
//                 <List.Item.Meta
//                     title={<a href="#">{item.title}</a>}
//                     description={item.description}
//                 />
//             </List.Item>
//         ),
//     },
// };