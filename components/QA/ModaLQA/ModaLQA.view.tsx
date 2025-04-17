import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { Icon } from '@components/_shared/Icon';
import { UITypography } from '@components/_shared/Typography';
import { useStyles } from '@hooks/useStyles';
import { FAQRequest } from '@src/redux/FAQ/FAQ';
import { eUserRoles } from '@src/redux/auth/auth';
import moment from 'moment'

import styles from './styles.module.scss';

type Props = {
    data?: FAQRequest;
    isLoadingCurrFAQ: boolean;
    isLoadingAnswer: boolean;
    edit: boolean;
    role: eUserRoles | null;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ModaLQAView: React.FC<Props> = ({
    data,
    isLoadingAnswer,
    edit,
    role,
    setEdit,
}) => {
    const cx = useStyles(styles);

    const handleToggleEdit = () => {
        setEdit(!edit);
    };

    return (
        <UIFlex vertical>
            <UIFlex vertical>
                <UITypography className={cx('text', 'bold')}>Вопрос от: {data?.question_author}
                    <span className={cx('date')}> - {moment(data?.question_date, 'DD.MM.YYYY').format('DD.MM.YYYY')}</span>
                </UITypography>
                <UITypography className={cx('text')}> - {data?.question}</UITypography>
            </UIFlex>

            {data?.answer && !edit && (
                <UIFlex gap={10} justify='space-between'>
                    <UIFlex vertical>
                        <UITypography className={cx('adminText', 'bold')}>
                            Ответ:
                        </UITypography>
                        <UITypography className={cx('adminTextAnswer')}>
                            {data?.answer}
                        </UITypography>
                    </UIFlex>
                    {[eUserRoles.ADMIN].includes(role as eUserRoles) && (
                        <Icon
                            type={'edit-outlined'}
                            className={cx('icon')}
                            size="sm"
                            onClick={handleToggleEdit}
                        />
                    )}
                </UIFlex>
            )}

            {(!data?.answer || edit) && (
                <FormTextArea
                    formProps={{
                        name: 'answer',
                        label: 'Напишите ответ',
                        className: cx('textarea'),
                    }}
                    textAreaProps={{
                        placeholder: 'Введите текст',
                        className: cx('textarea'),
                    }}
                />
            )}

            {[eUserRoles.ADMIN].includes(role as eUserRoles) && (
                <UIFlex gap={40}>
                    {(!data?.answer || edit) && (
                        <UIButton
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className={cx('btn')}
                            loading={isLoadingAnswer}
                            disabled={isLoadingAnswer}>
                            Отправить
                        </UIButton>
                    )}

                    {data?.answer && edit && (
                        <UIButton
                            size="large"
                            className={cx('btn')}
                            onClick={handleToggleEdit}>
                            Выйти из редактирования
                        </UIButton>
                    )}
                </UIFlex>
            )}
        </UIFlex>
    );
};
