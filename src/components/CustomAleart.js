import React , { useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



 const FlashMessage =( {message}) => {
   
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
              if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success ">
                    This is a success message!
                </Alert>
            </Snackbar>
        </div>
    )
}
export default FlashMessage


