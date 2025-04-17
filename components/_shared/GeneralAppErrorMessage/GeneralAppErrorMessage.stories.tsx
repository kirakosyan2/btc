import type { Meta, StoryObj } from '@storybook/react';
import { GeneralAppErrorMessage } from './GeneralAppErrorMessage';

const meta = {
    title: 'Example/GeneralAppErrorMessage',
    component: GeneralAppErrorMessage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof GeneralAppErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Ошибка приложения',
        comment: 'Произошла ошибка при загрузке данных. Пожалуйста, попробуйте снова.',
        buttonText: 'Повторить',
        onButtonClick: () => alert('Кнопка нажата!'),
    },
};

export const CustomMessage: Story = {
    args: {
        title: 'Внимание!',
        comment: 'Не удалось подключиться к серверу. Проверьте ваше интернет-соединение.',
        buttonText: 'Попробовать снова',
        onButtonClick: () => alert('Кнопка повторной попытки нажата!'),
    },
};