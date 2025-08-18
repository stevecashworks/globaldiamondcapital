import {createSlice} from '@reduxjs/toolkit'
const initialState={allUsers:[], allInvestments:[], allWithdrawals:[], allPayments:[]}

const appSlice=createSlice({
    name:"app",
    initialState,
    reducers:{
        toggleMenu:(state,action)=>{
            state.menuOpen=!state.menuOpen
        },
        setAppStats:(state,action)=>{
            state.appStats=action.payload
        }
    }
})
export const  {toggleMenu, setAppStats}=appSlice.actions;
export const  selectMenuOpen=(state)=>state.app.menuOpen
export const  selectAppStats=(state)=>state.app.appStats
export default  appSlice.reducer