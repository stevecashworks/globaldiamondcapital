import {createSlice} from "@reduxjs/toolkit";
const initialState={
    field:0
}
const navSlice= createSlice({
    name:"option",
    initialState,
    reducers:{
        setField:(state,action)=>{
        state.field=action.payload        
        }
    }
})
export const selectField=(state)=>state.nav.field;
export const {setField}=navSlice.actions;
export  default navSlice.reducer;