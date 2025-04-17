import { Space } from 'antd';
import React from 'react';

type Props = {
  icon: React.FC;
  text: string;
  className?: string;
  onClick?: () => void;
};

export const IconText: React.FC<Props> = ({
  icon,
  text,
  className,
  onClick = () => {},
}) => {
  return (
    <Space onClick={onClick} className={className}>
      {React.createElement(icon)}
      {text}
    </Space>
  );
};
