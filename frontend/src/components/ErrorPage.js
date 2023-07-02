import { useRouteError } from "react-router-dom";
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
    const error = useRouteError();
    let title = 'An error occured';
    let message = 'Something went wrong';
    if(error.status === 500) {
        message = error.data.message;
    } 
    if(error.status === 404) {
        title = 'Not Found';
        message = 'Could not find the resource or page'
    }

    return (
            <div className={classes.content}>
              <h1>{title}</h1>
              <p>{message}</p>
            </div>
          );
   
}

export default ErrorPage;