import { Table, TableProps } from 'antd';

type Props<T> = TableProps<T>;

export const UITable = <T,>(props: Props<T>) => {
    return <Table<T> {...props} />;
};
