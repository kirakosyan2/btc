import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DQSApi, NormStatistics } from './DQC';

export type State = {
    data: NormStatistics[];
    loading: boolean;
    needUpdate: boolean;
};

const initialState: State = {
    data: [],
    loading: false,
    needUpdate: false,
};

const DQCSlice = createSlice({
    name: 'DQC',
    initialState,
    reducers: {
        addDQC: (state, action: PayloadAction<NormStatistics>) => {
            state.data.push(action.payload);
        },
        removeDQC: (state, action: PayloadAction<string>) => {
            const newData = state.data.filter(
                (item) => item.id !== action.payload
            );
            state.data = newData;
        },
        changeDQC: (state, action: PayloadAction<any>) => {
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
            .addMatcher(DQSApi.endpoints.statistics.matchPending, (state) => {
                state.loading = true;
            })
            .addMatcher(
                DQSApi.endpoints.statistics.matchFulfilled,
                (state, action) => {
                    state.data = action.payload.map((item) => ({
                        id: item.id,
                        name: item.name,
                        value: item.value,
                        table: item?.params?.table,
                        columns: item?.params?.columns,
                        query: item?.params?.query,
                        aggType: item?.params?.aggType,
                        enabled: item.enabled,
                        category: item.category,
                        format: item?.params?.format,
                        excluded_letters: item?.params?.excluded_letters,
                        check_cyrillic: item?.params?.check_cyrillic,
                        primary_keys: item?.params?.primary_keys,
                        startdt_enddt: item?.params?.startdt_enddt,
                        default: item?.params?.default,
                    }));
                    state.loading = false;
                    state.needUpdate = false;
                }
            )
            .addMatcher(DQSApi.endpoints.statistics.matchRejected, (state) => {
                state.data = [];
                state.loading = false;
            })

            .addMatcher(
                DQSApi.endpoints.updateStatistics.matchPending,
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                DQSApi.endpoints.updateStatistics.matchFulfilled,
                (state) => {
                    state.needUpdate = true;
                    state.loading = false;
                }
            )
            .addMatcher(
                DQSApi.endpoints.updateStatistics.matchRejected,
                (state) => {
                    state.data = [];
                    state.loading = false;
                }
            );
    },
});

export const { addDQC, removeDQC, changeDQC } = DQCSlice.actions;
export default DQCSlice.reducer;
