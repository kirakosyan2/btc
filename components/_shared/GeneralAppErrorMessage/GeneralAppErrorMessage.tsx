import { useStyles } from '@hooks/useStyles';
import { UIButton } from '../Button';
import { UICard } from '../Card';
import { UITitle } from '../Title';
import { UITypography } from '../Typography';
import styles from './styles.module.scss';

type Props = {
    title: string;
    comment: string;
    buttonText: string;
    onButtonClick: () => void;
};
export const GeneralAppErrorMessage: React.FC<Props> = ({
    title,
    comment,
    buttonText,
    onButtonClick,
}) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={2}
                className={cx('title')}
            >
                {title}
            </UITitle>
            <UITypography className={cx('comment')}>{comment}</UITypography>
            <UIButton
                className={cx('btn')}
                onClick={onButtonClick}
                type="primary"
            >
                {buttonText}
            </UIButton>
        </UICard>
    );
};
