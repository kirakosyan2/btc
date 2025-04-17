import { Typography } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import React from 'react';

export type Props = TitleProps;

const { Title } = Typography;

export const UITitle: React.FC<Props> = ({ ...props }) => <Title {...props} />;

export type { Props as UITitleProps };
