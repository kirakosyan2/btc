import React from 'react';
import { UIProgressBar } from '../ProgressBar';

type Props = {
    percent: number;
};

export const PasswordSrengthMeter: React.FC<Props> = ({ percent }) => {
    const getStatus = () => {
        switch (percent) {
            case 20:
            case 40:
                return 'exception';
            case 60:
            case 80:
                return 'normal';
            case 100:
                return 'success';

            default:
                return undefined;
        }
    };

    return (
        <UIProgressBar
            percent={percent}
            status={getStatus()}
            showInfo={false}
        />
    );
};
