import {createSlice}  from '@reduxjs/toolkit'
 const initialState={
    position:{current:0,previous:0}
}
const scrollSlice=createSlice({
name:'scroll',
initialState,
reducers:{
    setPosition:(state,action)=>{
        state.position=action.payload
    }
}
})

export const {setPosition}=scrollSlice.actions;
export const selectCurrentPosition=(state)=>state.scroll.position.current
export const selectPreviousPosition=(state)=>state.scroll.position.previous
export default scrollSlice.reducer