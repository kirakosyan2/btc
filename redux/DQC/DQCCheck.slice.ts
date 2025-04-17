import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DQSApi, Checks } from './DQC';

export type State = {
    data: Checks[];
    loading: boolean;
    needUpdate: boolean;
};

const initialState: State = {
    data: [],
    loading: false,
    needUpdate: false,
};

const DQCCheckSlice = createSlice({
    name: 'DQCCheck',
    initialState,
    reducers: {
        addDQCCheck: (state, action: PayloadAction<Checks>) => {
            state.data.push(action.payload);
        },
        removeDQCCheck: (state, action: PayloadAction<string>) => {
            const newData = state.data.filter((item) => item.id !== action.payload);
            state.data = newData;
        },
        changeDQCCheck: (state, action: PayloadAction<any>) => {
            const updateCurrDQC = state.data.map((item: any) => {
                if (item.id === action.payload.id) {
                    item[action.payload.field] = action.payload.value;
                }

                return item;
            });

            state.data = updateCurrDQC;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(DQSApi.endpoints.checks.matchPending, (state) => {
                state.loading = true;
            })
            .addMatcher(DQSApi.endpoints.checks.matchFulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.needUpdate = false;
            })
            .addMatcher(DQSApi.endpoints.checks.matchRejected, (state) => {
                state.data = [];
                state.loading = false;
            });
    },
});

export const { addDQCCheck, removeDQCCheck, changeDQCCheck } = DQCCheckSlice.actions;
export default DQCCheckSlice.reducer;
