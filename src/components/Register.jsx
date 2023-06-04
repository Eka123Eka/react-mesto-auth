import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Header from './Header.jsx';

function Register({ isLogIn, onSubmit, nameForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();

  function handleChangeInput(e) {
    const { value } = e.target;
    e.target.name === 'Email'
      ? setEmail(value)
      : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({email, password});
  }

  // useEffect(() => {
  //   if (isLogIn) { navigate('/') }
  // }, []);

  return (
    nameForm === 'register'
      ? <>
        <Header to={'/sign-in'} textLink='Войти'></Header>
        <Login name='register' title='Регистрация' buttonText='Зарегистрироваться' onSubmit={handleSubmit}  >
          <input className='register__input' name='Email' type='email' minLength='5' maxLength='100'
            placeholder='Email' value={email || ''} required onChange={handleChangeInput} />
          <input className='register__input' name='Password' type='password' minLength='4' maxLength='100'
            placeholder='Пароль' value={password || ''} required onChange={handleChangeInput} />
        </Login>
      </>
      : <>
        <Header to={'/sign-up'} textLink='Регистрация'></Header>
        <Login name='login' title='Вход' buttonText='Войти' onSubmit={handleSubmit}  >
          <input className='register__input' name='Email' type='email' minLength='5' maxLength='100'
            placeholder='Email' value={email || ''} required onChange={handleChangeInput} />
          <input className='register__input' name='Password' type='password' minLength='4' maxLength='100'
            placeholder='Пароль' value={password || ''} required onChange={handleChangeInput} />
        </Login>
      </>
  )
}

export default Register;
