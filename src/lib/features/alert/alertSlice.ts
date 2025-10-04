import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

export const revertAll = createAction('REVERT_ALL');

export interface AlertState {
    title: string | null,
    message: string | null,
    type: 'success' | 'error' | 'warning' | 'info',
    open: boolean,
    onConfirm: (() => void) | null,
}

const initialState: AlertState = {
    title: null,
    message: null,
    type: "success",
    open: false,
    onConfirm: null,
}

const alertSlice = createSlice({
    name: 'alert',
    initialState: initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{
            title: string,
            message: string,
            type: 'success' | 'error' | 'warning' | 'info',
            onConfirm: (() => void) | null,
        }>) => {
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.open = true;
            state.onConfirm = action.payload.onConfirm;
        },
        closeAlert: (state) => {
            revertAll();
        },
        confirmAction: (state) => {
            state.onConfirm?.();
            revertAll();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, (state) => initialState)
    }
})

export const { showAlert, closeAlert, confirmAction } = alertSlice.actions;

export default alertSlice.reducer;