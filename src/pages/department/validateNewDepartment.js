export default function validate(values){
    let errors = {}
    if(!values.name?.trim()){
        errors.name = 'department name is required !'
    }
    else if(values.name?.trim()?.length > 50){
        errors.name = 'department name must be lessthan or equal to 50 letters'
    }
    if(!values.description?.trim()){
        errors.description = 'short description is required !'
    }
   
    return errors
}