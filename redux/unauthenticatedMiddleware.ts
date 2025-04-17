import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { logout } from './auth/auth.slice';

export const unauthenticatedMiddleware: Middleware =
    ({ dispatch }: Record<any, any>) =>
    (next: any) =>
    async (action: any) => {
        if (isRejectedWithValue(action) && action.payload.status === 401) {
            dispatch(logout());
        }

        return next(action);
    };
