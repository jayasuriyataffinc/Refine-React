
import { Button } from '@mui/material';
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className="container">
      <main className="main">
        <h1 className="heading">404</h1>
        <p className="text">Oops! Page Not Found</p>
        <Button 
          variant="contained" 
          color="primary" 
          href="/" 
          className="button"
        >
          Go to Homepage
        </Button>
      </main>
    </div>
  );
};

export default NotFound;