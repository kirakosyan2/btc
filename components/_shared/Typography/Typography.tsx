import React from 'react';
import { Typography } from 'antd';
import { ParagraphProps } from 'antd/es/typography/Paragraph';

type Props = ParagraphProps;

const { Paragraph } = Typography;

export const UITypography: React.FC<Props> = ({ ...props }) => <Paragraph {...props} />;

export type { Props as UITypographyProps };
