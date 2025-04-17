import { UIModal } from '@components/_shared/Modal'
import { ResultTest } from '@components/Test/components/ResultTest';
import { useCurrentResultsQuery } from '@src/redux/test/test';
import React from 'react'

type Props = {
    opened: boolean;
    id?: number
    onClose: () => void;
}

export const ModalResultTest: React.FC<Props> = ({ opened, id, onClose }) => {
    // Query
    const { data: result } = useCurrentResultsQuery(Number(id), {
        refetchOnMountOrArgChange: true,
        skip: !id,
    })

    return (
        <UIModal
            open={opened}
            width={1000}
            footer={null}
            destroyOnClose
            onClose={onClose}
            onCancel={onClose}>
            <ResultTest
                data={result}
                bordered={false}
                isMyStatistic={false} />
        </UIModal>
    )
}
