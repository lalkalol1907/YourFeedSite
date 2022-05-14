import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/user";

export interface UserSliceInterface {
    user?: User
    auth: boolean
}

const initialState: UserSliceInterface = {
    auth: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        }
    }
})

export const {
    setUser,
    setAuth
} = userSlice.actions

export default userSlice.reducer