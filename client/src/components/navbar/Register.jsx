import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../data/DataContext';
import { signup } from '../../api/userApiCalls';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { usersDispatch } = useContext(DataContext);

  const onSubmit = async (data) => {
    try {
      const response = await signup(usersDispatch, data);
      /* console.log(response) */
      if (response.statusCode === 201) {
        /* console.log("Before dispatch"); */
        usersDispatch({ type: 'LOGIN', payload: response.data });
        /* console.log("After dispatch"); */
        navigate('/preferences');
      }
    } catch (error) {
      console.error(error);
      usersDispatch({ type: 'LOGIN_FAILED' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Username" />
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} placeholder="Password" type="password" />
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;


