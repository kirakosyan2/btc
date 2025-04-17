import { List, ListProps } from 'antd';
import React from 'react';

export const { Item: UIItem } = List;
export const { Meta: UIMeta } = UIItem;

type Props<T> = ListProps<T>;

export const UIList = <T,>({ ...props }: Props<T>): React.ReactNode => {
  return <List {...props} />;
};

export type { Props as UIListProps };
