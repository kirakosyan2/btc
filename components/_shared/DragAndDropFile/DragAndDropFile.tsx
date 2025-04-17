import Dragger, { DraggerProps } from 'antd/es/upload/Dragger';
import { FC } from 'react';

type Props = DraggerProps;

export const DragAndDropFile: FC<Props> = ({ children, ...props }) => {
    return <Dragger {...props}>{children}</Dragger>;
};

export type { Props as DragAndDropFileProps };
