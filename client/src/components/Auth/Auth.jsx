import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authRenewToken } from 'actions/auth';

export default function Auth(props) {

  const dispatch = useDispatch();

  useEffect(() => {
  	const token = localStorage.getItem('access_token');
  	if (token) {
  		dispatch(authRenewToken(token));
  	}

  }, [dispatch]);


  return (
    <>
      {props.children}
    </>
  );
}