import Button from 'react-bootstrap/Button';
import classes from './Button.module.css'

const CancelButton = ({title,onClose}) =>{
    const actionHandler = () =>{
        onClose()
    }
 return <Button onClick={actionHandler} variant="none" className={classes.cancelBtn}>{title}</Button>
}
export default CancelButton