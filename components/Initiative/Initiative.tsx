import React, { useEffect } from 'react';
import { InitiativeView } from './Initiative.view';
import { ModalAutorizeSuccess } from '@components/ModalAutorizeSuccess';
import { StorageService } from '@services/index';
import { usePopupControls } from '@hooks/usePopupControls';
import Cookie from 'js-cookie';

const storageService = StorageService.getInstance();

export const Initiative: React.FC = () => {
    const authorized = storageService.getItem('authorized');
    const isFirstViewing = Cookie.get('viewing');

    const { isOpened, closePopup, openPopup } = usePopupControls();

    useEffect(() => {
        if (authorized && !isFirstViewing) {
            openPopup();
            Cookie.set('viewing', 'true');
        }
    }, [authorized]);

    return (
        <>
            <InitiativeView />
            <ModalAutorizeSuccess
                open={isOpened}
                onClose={closePopup}
            />
        </>
    );
};
