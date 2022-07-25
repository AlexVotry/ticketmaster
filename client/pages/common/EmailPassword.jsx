
import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default function EmailPassword ({title}) {
  const [email, setEmail] = useState('');
  const endPoint = title.toLowerCase().replace(' ', '');
  const [password, setPassword] = useState('');
  const { doRequest, errors} = useRequest({
    url: `/api/users/${endPoint}`,
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  }

  return (
    <form onSubmit={onSubmit}> 
      <h1>{title}</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" onChange={ e => setEmail(e.target.value) }/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" onChange={ e => setPassword(e.target.value) }/>
      </div>
      {errors}
      <button type="submit" className="btn btn-primary">{title}</button>
    </form>
  );
};