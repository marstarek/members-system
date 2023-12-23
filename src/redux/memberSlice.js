import { createSlice } from "@reduxjs/toolkit";
const memberlice = createSlice({
    name: "member",
    initialState: { memberData: [], isAuth: false, token: "", theme:"light"},
    reducers: {
        SetMemberData: (state, action) => {
        state.memberData.push({ ...action.payload});

        },
        setAppTheme: (state, action) => {
            state.theme = action.payload
        },
        setToken: (state, action) => {

            state.token = action.payload
        },
        setAuth: (state, action) => {

            state.isAuth = action.payload
        },
        removeMemberData: (state, action) => {
            state.memberData=[];

        },
    },


});
export default memberlice.reducer;
export const { SetMemberData, removeMemberData, setAppTheme, setToken, setAuth } = memberlice.actions;