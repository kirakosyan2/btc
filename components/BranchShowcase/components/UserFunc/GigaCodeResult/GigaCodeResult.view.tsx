import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormJavaEditor } from '@components/_shared/Form/FormJavaEditor';
import { FormScalaEditor } from '@components/_shared/Form/FormScalaEditor';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
    expansion: string;
    isLoadingUpdateCode: boolean;
    onClose: () => void;
};

export const GigaCodeResultView: React.FC<Props> = ({
    expansion,
    isLoadingUpdateCode,
    onClose,
}) => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical>
            <FormTextArea
                formProps={{
                    name: 'answer',
                    label: <UITitle level={5}>Комментарий GigaCode:</UITitle>,
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

            {expansion === 'scala' && (
                <FormScalaEditor
                    formProps={{
                        name: 'editor',
                        className: cx('editor'),
                        label: <UITitle level={5}>Scala код:</UITitle>,
                    }}
                />
            )}

            {expansion === 'java' && (
                <FormJavaEditor
                    formProps={{
                        name: 'editor',
                        className: cx('editor'),
                        label: <UITitle level={5}>Java код:</UITitle>,
                    }}
                />
            )}

            <UIFlex justify="center" gap={40}>
                <UIButton size="large" className={cx('btn')} onClick={onClose}>
                    Отклонить изменения
                </UIButton>
                <UIButton
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className={cx('btn')}
                    loading={isLoadingUpdateCode}
                    disabled={isLoadingUpdateCode}>
                    Применить изменения
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
