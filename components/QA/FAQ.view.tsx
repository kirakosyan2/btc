import React, { useState } from 'react';

import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { IconText } from '@components/_shared/IconText';
import { UIItem, UIList, UIMeta } from '@components/_shared/List';
import { TextShorter } from '@components/_shared/TextShorter';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import DEFAULT_AVATAR from '@assets/images/avatar.png';

import { FAQRequest } from '@src/redux/FAQ/FAQ';

import { LikeOutlined, MessageOutlined } from '@ant-design/icons';

import { AddFAQ } from './AddFAQ';
import { ModaLQA } from './ModaLQA';
import styles from './styles.module.scss';

type Props = {
    FAQList: FAQRequest[];
    isLoadingFAQList: boolean;
    likeFAQ: (value: number) => void;
    dislikeFAQ: (value: number) => void;
};

export const FAQView: React.FC<Props> = ({
    FAQList,
    isLoadingFAQList,
    likeFAQ,
    dislikeFAQ,
}) => {
    const cx = useStyles(styles);
    const [idQA, setIDQA] = useState<number | string>();

    const { isOpened, openPopup, closePopup } = usePopupControls();

    const handleOpenModal = (id: string | number) => {
        return () => {
            setIDQA(id);
            openPopup();
        };
    };

    return (
        <>
            <UICard>
                <UIList
                    pagination={{
                        pageSize: 5,
                    }}
                    loading={isLoadingFAQList}
                    itemLayout="vertical"
                    dataSource={FAQList}
                    locale={{
                        emptyText: 'Нет данных',
                    }}
                    renderItem={(item) => (
                        <UIItem
                            key={item.id}
                            actions={[
                                <IconText
                                    icon={LikeOutlined}
                                    text={String(item.likes)}
                                    className={cx(
                                        'icon',
                                        item.is_liked ? 'like' : ''
                                    )}
                                    key="list-vertical-like-o"
                                    onClick={
                                        item.is_liked
                                            ? () => dislikeFAQ(item.id)
                                            : () => likeFAQ(item.id)
                                    }
                                />,
                                <IconText
                                    icon={MessageOutlined}
                                    text={
                                        item.answer
                                            ? 'Ответ есть'
                                            : 'Ответа нет'
                                    }
                                    key="list-vertical-message"
                                    className={cx(
                                        'icon',
                                        !!item.answer ? 'answer' : ''
                                    )}
                                    onClick={handleOpenModal(item.id)}
                                />,
                            ]}>
                            <UIFlex vertical className={cx('containerMeta')}>
                                <TextShorter
                                    tooltip
                                    title={item.question_author}
                                    className={cx('userFullName')}>
                                    {item.question_author}
                                </TextShorter>
                                <UIMeta
                                    avatar={
                                        <img
                                            src={DEFAULT_AVATAR}
                                            alt="avatar"
                                        />
                                    }
                                    className={cx('meta')}
                                    title={item.title}
                                />
                                {item.question}
                            </UIFlex>
                        </UIItem>
                    )}
                />
            </UICard>

            <AddFAQ />

            <ModaLQA idQA={idQA} opened={isOpened} onClose={closePopup} />
        </>
    );
};
