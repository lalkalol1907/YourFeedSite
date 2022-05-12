import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    registerForm: boolean
}

const initialState: LoginState = {
    registerForm: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setRegisterForm: (state, action: PayloadAction) => {
            state.registerForm = !state.registerForm
        }
    }
})

export const { setRegisterForm } = loginSlice.actions
export default loginSlice.reducer