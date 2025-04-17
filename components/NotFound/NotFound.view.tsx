import { useStyles } from '@hooks/useStyles';
import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

import './AnimateTS';

export const NotFoundView: React.FC = () => {
    const cx = useStyles(styles);
    const navigate = useNavigate();
    const goToMain = () => {
        navigate('/initiative');
    };
    return (
        <div className={cx('container')}>
            <div className={cx('moon')}></div>
            <div className={cx('moon__crater', 'moon__crater1')}></div>
            <div className={cx('moon__crater', 'moon__crater2')}></div>
            <div className={cx('moon__crater', 'moon__crater3')}></div>

            <div className={cx('star', 'star1')}></div>
            <div className={cx('star', 'star2')}></div>
            <div className={cx('star', 'star3')}></div>
            <div className={cx('star', 'star4')}></div>
            <div className={cx('star', 'star5')}></div>

            <div className={cx('error')}>
                <div className={cx('error__title')}>404</div>
                <div className={cx('error__subtitle')}>Хммм...</div>
                <div className={cx('error__description')}>
                    К сожалению, данная страница не найдена
                </div>
                <button
                    className={cx('error__button', 'error__button--active')}
                    onClick={goToMain}
                >
                    На главную
                </button>
                <button className={cx('error__button')}>Написать нам</button>
            </div>

            <div className={cx('astronaut')}>
                <div className={cx('astronaut__backpack')}></div>
                <div className={cx('astronaut__body')}></div>
                <div className={cx('astronaut__body__chest')}></div>
                <div className={cx('astronaut__arm-left1')}></div>
                <div className={cx('astronaut__arm-left2')}></div>
                <div className={cx('astronaut__arm-right1')}></div>
                <div className={cx('astronaut__arm-right2')}></div>
                <div className={cx('astronaut__arm-thumb-left')}></div>
                <div className={cx('astronaut__arm-thumb-right')}></div>
                <div className={cx('astronaut__leg-left')}></div>
                <div className={cx('astronaut__leg-right')}></div>
                <div className={cx('astronaut__foot-left')}></div>
                <div className={cx('astronaut__foot-right')}></div>
                <div className={cx('astronaut__wrist-left')}></div>
                <div className={cx('astronaut__wrist-right')}></div>

                <div className={cx('astronaut__cord')}>
                    <canvas
                        id="cord"
                        height="350px"
                        width="500px"
                    ></canvas>
                </div>

                <div className={cx('astronaut__head')}>
                    <canvas
                        id="visor"
                        width="60px"
                        height="60px"
                    ></canvas>
                    <div className={cx('astronaut__head-visor-flare1')}></div>
                    <div className={cx('astronaut__head-visor-flare2')}></div>
                </div>
            </div>
        </div>
    );
};
