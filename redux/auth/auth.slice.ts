import { createSlice } from '@reduxjs/toolkit';
import { StorageService } from '@services/StorageService';
import { authApi, eUserRoles } from './auth';

export type IAuthProps = {
    authorized: boolean;
    loading: boolean;
    access_token: string | null;
    refresh_token: string | null;
    isLogout: boolean;
    role: eUserRoles | null;
};

const storageService = StorageService.getInstance();
const authorizedState = storageService.getItem('authorized');
const initialState: IAuthProps = authorizedState
    ? JSON.parse(authorizedState)
    : {
          authorized: false,
          loading: false,
          access_token: null,
          refresh_token: null,
          isLogout: false,
          role: null,
      };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.authorized = false;
            state.access_token = null;
            state.refresh_token = null;
            state.isLogout = true;
            state.role = null;
            storageService.removeItem('authorized');
        },
        updateAuthorized: (state, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            storageService.setItem('authorized', JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchPending, (state) => {
                state.loading = true;
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.access_token = action.payload.access;
                state.refresh_token = action.payload.refresh;
                state.role = action.payload.user_role;
                state.loading = false;
                state.authorized = true;
                state.isLogout = false;
                storageService.setItem('authorized', JSON.stringify(action.payload));
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.authorized = false;
                state.loading = false;
                state.access_token = null;
                state.refresh_token = null;
                state.role = null;
                storageService.removeItem('authorized');
            })
            .addMatcher(authApi.endpoints.refresh.matchPending, (state) => {
                state.loading = true;
            })
            .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
                state.access_token = action.payload.access;
                state.refresh_token = action.payload.refresh;
                state.role = action.payload.user_role;
                state.loading = false;
                state.authorized = true;
                state.isLogout = false;
                storageService.setItem('authorized', JSON.stringify(action.payload));
            })
            .addMatcher(authApi.endpoints.refresh.matchRejected, (state) => {
                state.authorized = false;
                state.loading = false;
                state.access_token = null;
                state.refresh_token = null;
                state.role = null;
                storageService.removeItem('authorized');
            });
    },
});

export const { logout, updateAuthorized } = authSlice.actions;
export default authSlice.reducer;
