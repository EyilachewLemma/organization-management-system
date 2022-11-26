import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{token:null,isAuthenticated:false,userInfo:{}},
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload
        },
        setIsAuthenticated:(state,action) =>{
            state.isAuthenticated = action.payload
        },
        setUserInfo:(state,action)=>{
            state.userInfo = action.payload
        }
       
       



    }
})
export const userAction = userSlice.actions
export default userSlice.reducer