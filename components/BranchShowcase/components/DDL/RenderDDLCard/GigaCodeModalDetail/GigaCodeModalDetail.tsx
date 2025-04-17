import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormSQLEditor } from '@components/_shared/Form/FormSQLEditor';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
    onApply?: () => void;
    onCancel?: () => void;
};

export const GigaCodeModalDetail: React.FC<Props> = ({ onApply, onCancel }) => {
    const cx = useStyles(styles);

    return (
        <>
            <UIFlex vertical className={cx('formContainer')}>
                <div className={cx('inputContainer')}>
                    <div className={cx('tooltipContainer')}>
                        <UITitle className={cx('text')} level={5}>
                            Комментарий GigaCode:
                        </UITitle>
                    </div>
                    <FormTextArea
                        formProps={{
                            name: 'comment',
                            className: cx('formItem'),
                        }}
                        textAreaProps={{
                            placeholder: 'Введите комментарий',
                            size: 'large',
                            readOnly: true,
                            className: cx('textArea'),
                            autoSize: {
                                minRows: 3,
                                maxRows: 100,
                            },
                        }}
                    />
                </div>

                <div className={cx('inputContainer')}>
                    <div className={cx('labelContainer')}>
                        <UITitle className={cx('text')} level={5}>
                            SQL код:
                        </UITitle>
                    </div>
                    <FormSQLEditor
                        formProps={{
                            name: 'sql_code',
                            className: cx('formItem'),
                        }}
                    />
                </div>
            </UIFlex>

            <UIFlex gap={40} justify="center">
                <UIButton
                    className={cx('btn')}
                    type="primary"
                    onClick={onCancel}>
                    Отклонить изменения
                </UIButton>
                <UIButton
                    className={cx('btn')}
                    type="primary"
                    onClick={onApply}>
                    Применить изменения
                </UIButton>
            </UIFlex>
        </>
    );
};
