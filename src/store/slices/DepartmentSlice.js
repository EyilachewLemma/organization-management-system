import {createSlice} from '@reduxjs/toolkit'

const departmentSlice = createSlice({
    name:'departmentlist',
    initialState:{departments:[]},
    reducers:{
        setDepartments:(state,action)=>{
            state.departments = action.payload
        },
        createDepartment:(state,action)=>{
            state.departments.push(action.payload)
        },
        editDepartment:(state,action)=>{
            const index = state.departments.findIndex(department=>department.id === action.payload.id)
            state.departments[index] = action.payload
        },
        assignManager:(state,action)=>{
            state.departments[action.payload.index].employee= action.payload.employee
        }


    }
})
export const departmentAction = departmentSlice.actions
export default departmentSlice.reducer