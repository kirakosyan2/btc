import { Tour, TourProps } from 'antd';
import React from 'react';

type Props = TourProps;

export const UITour: React.FC<Props> = ({ ...props }) => {
    return <Tour {...props} />;
};

export type { Props as UITourProps };
