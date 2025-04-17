import { Form } from 'antd';
import { FormListFieldData, FormListProps } from 'antd/es/form/FormList';
import React, { ReactNode } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';

import { useStyles } from '@hooks/useStyles';

import { FormListView } from './FormList.view';
import styles from './styles.module.scss';

type Props = Omit<FormListProps, 'children'> & {
    renderData: (
        field: FormListFieldData,
        index: number,
        remove?: (index: number | number[]) => void
    ) => ReactNode;
    noActions?: boolean;
    className?: string;
    classNameAddIcon?: string;
    classNameRemoveIcon?: string;
    disabled?: boolean;
};

export const UIFormList: React.FC<Props> = ({
    renderData,
    initialValue = [{}],
    noActions,
    className,
    classNameAddIcon,
    classNameRemoveIcon,
    disabled,
    ...props
}) => {
    const cx = useStyles(styles);

    return (
        <Form.List {...props} initialValue={initialValue}>
            {(fields, { add, remove }) => (
                <div>
                    {fields.map((field, index) => {
                        const onRemove = () => {
                            remove(field.name);
                        };

                        return (
                            <FormListView
                                key={field.key}
                                onRemove={onRemove}
                                noActions={noActions}
                                className={className}
                                classNameRemoveIcon={classNameRemoveIcon}
                                disabled={disabled}>
                                {renderData(field, index, remove)}
                            </FormListView>
                        );
                    })}
                    {!noActions && (
                        <UIFlex justify="center">
                            <UIButton
                                className={cx('btn', 'add', classNameAddIcon)}
                                disabled={disabled}
                                icon={
                                    <Icon
                                        type="plus-circle-outlined"
                                        className={cx('icon')}
                                    />
                                }
                                onClick={() => add()}
                            />
                        </UIFlex>
                    )}
                </div>
            )}
        </Form.List>
    );
};

export type { Props as UIFormListProps };
