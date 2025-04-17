import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { StorageService } from '@services/index';

const storageService = StorageService.getInstance();

export const useQueryParamAppender = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const version = storageService.getItem('version');
        const searchParams = new URLSearchParams(location.search);

        if (!searchParams.has('version') && version) {
            searchParams.set('version', version);
            navigate(
                {
                    pathname: location.pathname,
                    search: searchParams.toString(),
                },
                { replace: true }
            );
        }
    }, [location, navigate]);

    return null;
};
