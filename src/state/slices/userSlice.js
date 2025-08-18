import {createSlice} from "@reduxjs/toolkit";
 const initialState={
    
    
    isLogged:false,
    userDetails:{}
    
 }
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{

        setIsLogged:(state,action)=>{
            state.isLogged=action.payload
        },
        setUserDetails:(state,action)=>{
            state.userDetails=action.payload
        }
    }
})
export default userSlice.reducer
export const {setIsLogged,setUserDetails}=userSlice.actions
export const selectIsLogged=state=>state.user.isLogged
export const selectUserDetails=state=>state.user.userDetails