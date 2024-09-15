import React, {useState} from 'react';
import {Avatar, Box, Button, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as NavLink, useNavigate} from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: '',
    password: '',
  });


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      navigate('/');
    } catch (e) {
    }
  };

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        width: '600px',
        height: '600px',
        borderRadius: '3%',
        margin: '50px auto',
      }}
    >
      <Avatar sx={{m: 7, bgcolor: 'success.main'}}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Зарегестрироваться
      </Typography>
      <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
        <Box sx={{width: '100%', maxWidth: 400, mt: 2}}>
          <TextField
            required
            label="Username"
            name="username"
            autoComplete="new-username"
            value={state.username}
            onChange={inputChangeHandler}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            type="password"
            label="Password"
            name="password"
            autoComplete="new-password"
            value={state.password}
            onChange={inputChangeHandler}
            fullWidth
            margin="normal"
          />
        </Box>
        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
          Регистрация
        </Button>
        <Link component={NavLink} to={"/login"} variant="body2" sx={{textDecoration:'none'}}>
          <span style={{color: 'gray'}}>У вас уже есть аккаунт ?</span>  Войти в Spotify
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
