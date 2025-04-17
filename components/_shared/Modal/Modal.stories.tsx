import type { Meta, StoryObj } from '@storybook/react';
import { UIModal } from './Modal';
import { UIButton } from '../Button';
import { usePopupControls } from '@hooks/usePopupControls';


const meta = {
    title: 'Example/Modal',
    component: UIModal,
    parameters: {
        layout: 'centered',
    },
    args: {
        title: 'Заголовок',
        children: "Children",
        loading: false,
        width: 500,
    },
    argTypes: {
        title: { control: 'text' },
        children: { control: 'text' },
        loading: { control: 'boolean' },
        width: { control: 'number' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ title, children, loading, width }) => {
        const { isOpened, openPopup, closePopup } = usePopupControls()

        return (
            <>
                <UIButton onClick={openPopup}>Открыть модальное окно</UIButton>
                <UIModal
                    title={title}
                    open={isOpened}
                    onCancel={closePopup}
                    footer={false}
                    loading={loading}
                    width={width}
                >
                    {children}
                </UIModal >
            </>
        );
    },
};

export const WithFooter: Story = {
    render: ({ title, children, loading, width }) => {
        const { isOpened, openPopup, closePopup } = usePopupControls()

        return (
            <>
                <UIButton onClick={openPopup}>Открыть модальное окно</UIButton>
                <UIModal
                    title={title}
                    open={isOpened}
                    onCancel={closePopup}
                    loading={loading}
                    width={width}
                >
                    {children}
                </UIModal >
            </>
        );
    },
};