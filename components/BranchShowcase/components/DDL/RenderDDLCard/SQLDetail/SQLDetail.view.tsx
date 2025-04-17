import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormSQLEditor } from '@components/_shared/Form/FormSQLEditor';

import { useStyles } from '@hooks/useStyles';

import gigacode from '@assets/images/gigacode.png';

import { eUserRoles } from '@src/redux/auth/auth';

import styles from './styles.module.scss';

type Props = {
    role: eUserRoles | null;
    isLoadingSave: boolean;
    userParams?: string[] | undefined;
    onGigaCodeClick: () => void;
    isLoadingOpen: boolean;
};

export const SQLDetailView: React.FC<Props> = ({
    role,
    isLoadingSave,
    isLoadingOpen,
    userParams,
    onGigaCodeClick,
}) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('container')}>
            <div>
                <FormSQLEditor
                    formProps={{
                        name: 'sql',
                    }}
                    sqlEditorProps={{
                        className: cx('sqlEditor'),
                        userParams: userParams,
                    }}
                />
            </div>

            <UIFlex
                justify="center"
                gap={40}
                style={{
                    marginBottom: 20,
                }}>
                <UIButton
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className={cx('btn')}
                    loading={isLoadingSave}
                    disabled={
                        isLoadingSave ||
                        [eUserRoles.BUISNESS].includes(role as eUserRoles)
                    }>
                    Сохранить
                </UIButton>

                <UIFlex>
                    <div
                        onClick={
                            !isLoadingOpen &&
                            ![eUserRoles.BUISNESS].includes(role as eUserRoles)
                                ? onGigaCodeClick
                                : undefined
                        }
                        style={{
                            cursor:
                                isLoadingOpen ||
                                [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                )
                                    ? 'not-allowed'
                                    : 'pointer',
                            opacity:
                                isLoadingOpen ||
                                [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                )
                                    ? 0.5
                                    : 1,
                        }}>
                        <img
                            src={gigacode}
                            className={cx('logo')}
                            alt="GigaCode"
                        />
                    </div>
                </UIFlex>
            </UIFlex>
        </div>
    );
};
