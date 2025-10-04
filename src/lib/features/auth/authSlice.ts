import { createAction, createSlice } from '@reduxjs/toolkit'
import { User } from '@/types/user/user.interface'
import { AppDispatch } from '@/lib/store';

export const revertAll = createAction('REVERT_ALL');

export interface AuthState {
    user: User | null,
    authMethod: 'email' | 'google'
}

const initialState: AuthState = {
    user: null,
    authMethod: 'email'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
        },

        setAuthMethod: (state, action) => {
            state.authMethod = action.payload.authMethod;
        },

        logOut: (state) => {
            state.user = null;
            state.authMethod = 'email';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, (state) => initialState)
    }
})

export const { setCredentials, setAuthMethod, logOut } = authSlice.actions;

export const logOutAndRevertAll = () => (dispatch: AppDispatch) => {
    dispatch(logOut());
    dispatch(revertAll());
    
    // Purge persisted state from localStorage
    if (typeof window !== 'undefined') {
        localStorage.removeItem('persist:root');
    }
}

export default authSlice.reducer;