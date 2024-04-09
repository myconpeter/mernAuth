import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const ConfirmLink = () => {
  const { userId, uniqueString } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isError = queryParams.get('error') === 'true';
  const errorMessage = isError ? queryParams.get('message') : null;
  const [isLoading, setIsLoading] = useState(true);



  return (
    <div>

      <h1>{isError ? 'Error' : 'Verification Done'}</h1>
      {isError && errorMessage && <p>{errorMessage}</p>}



      <h2> {isError ? '' : <Link to='/login'>login</Link>} </h2>

    </div>
  );
};

export default ConfirmLink;
