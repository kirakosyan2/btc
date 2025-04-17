import { useStyles } from '@hooks/useStyles';
import React from 'react';
import styles from './styles.module.scss';

export const ModalAutorizeSuccessView: React.FC = () => {
    const cx = useStyles(styles);
    return (
        <div>
            <div className={cx('title')}>
                <p>
                    <strong>Добро пожаловать в B2C-SQL UI!</strong>
                </p>
            </div>
            <br />
            <div className={cx('text')}>
                <p>
                    Это приложение предназначено для упрощения процесса создания витрин данных.
                    Здесь вы сможете заполнить необходимые параметры для сборки витрины.
                </p>
                <br />
                <p>
                    <strong>Для создания витрины необходимо:</strong>
                </p>
                <p>
                    Инициативы: После входа вы увидите список инициатив вашей команды. Используйте
                    кнопку <strong>"Просмотр"</strong>, чтобы посмотреть витрины выбранной
                    инициативы.
                </p>
                <br />
                <p>
                    Создание заказчика: В меню <strong>"Администрирование"</strong> выберите
                    <strong>"Заказчики"</strong> и заполните форму.
                </p>
                <br />
                <p>
                    Создание инициативы: Перейдите в <strong>"Администрирование"</strong> -&gt;
                    <strong>"Инициативы"</strong> и заполните форму. Для создания инициативы
                    необходим хотя бы один заказчик.
                </p>
                <br />
                <p>
                    Заполнение конфига команды: Перейдите в <strong> "ETL"</strong> -&gt;
                    <strong>"Конфиг команды"</strong> и заполните необходимые параметры.
                </p>
                <br />

                <p>
                    Создание витрины: В<strong> "ETL"</strong> выберите{' '}
                    <strong>"Новая витрина"</strong>и заполните форму. Для создания витрины
                    необходима хотя бы одна инициатива.
                </p>
            </div>
        </div>
    );
};
