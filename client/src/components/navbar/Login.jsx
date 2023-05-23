import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../data/DataContext';
import { login } from '../../api/userApiCalls';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { usersDispatch } = useContext(DataContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(usersDispatch, data);
      if (response.status === 200) {
        usersDispatch({ type: 'LOGIN', payload: response.data });
        navigate('/dashboard');  // Navigate to dashboard
      }
    } catch (error) {
      console.error(error);
      usersDispatch({ type: 'LOGIN_FAILED' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} placeholder="Password" type="password" />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;



