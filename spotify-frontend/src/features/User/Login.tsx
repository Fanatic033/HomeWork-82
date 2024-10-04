import React, {useState} from 'react';
import {Alert, Avatar, Box, Link, TextField, Typography} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectLoginError, selectLoginLoading} from './UserSlice.ts';
import {googleLogin, login} from './UserThunks.ts';
import {GoogleLogin} from '@react-oauth/google';
import {LoadingButton} from '@mui/lab';

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const btnLoading = useAppSelector(selectLoginLoading);

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
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/')
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
        <LockOpenIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Войти в Spotify
      </Typography>
      {error && (
        <Alert severity="error" sx={{mt: 3}}>
          {error.error}
        </Alert>
      )}
      <Box sx={{pt: 2}}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              void googleLoginHandler(credentialResponse.credential);
            }
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </Box>
      <Box
        component="form"
        onSubmit={submitFormHandler}
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box sx={{width: '100%', maxWidth: 400, mt: 2}}>
          <TextField
            required
            label="Username"
            name="username"
            autoComplete="current-username"
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
            fullWidth
            onChange={inputChangeHandler}
            margin="normal"
          />
        </Box>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
          loading={btnLoading ? false : undefined}
        >
          Войти
        </LoadingButton>
        <Link
          component={RouterLink}
          to={'/register'}
          variant="body2"
          sx={{textDecoration: 'none'}}
        >
          <span style={{color: 'gray'}}>Нет аккаунта?</span> Регистрация в
          Spotify
        </Link>
      </Box>
    </Box>
  );
};

export default Login;

//
// import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
// import {selectLoginError} from './UserSlice.ts';
// import {Link as RouterLink, useNavigate} from 'react-router-dom';
// import {LoginMutation} from '../../types.ts';
// import {useState} from 'react';
// import {googleLogin, login} from './UserThunks.ts';
// import {Avatar, Box, Button, Container, Grid, TextField, Link} from '@mui/material';
// import Typography from '@mui/material/Typography';
// import {GoogleLogin} from '@react-oauth/google';
// import {Alert} from '@mui/lab';
//
//
// function LockOpenIcon() {
//   return null;
// }
//
// const Login = () => {
//   const dispatch = useAppDispatch();
//   const error = useAppSelector(selectLoginError);
//   const navigate = useNavigate();
//
//   const [state, setState] = useState<LoginMutation>({
//     username: '',
//     password: '',
//   });
//
//   const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const {name, value} = event.target;
//     setState(prevState => ({...prevState, [name]: value}));
//   };
//
//   const submitFormHandler = async (event: React.FormEvent) => {
//     event.preventDefault();
//     await dispatch(login(state)).unwrap();
//     navigate('/');
//   };
//
//   const googleLoginHandler = async (credential: string) => {
//     await dispatch(googleLogin(credential)).unwrap();
//     navigate('/');
//   };
//
//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         style={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
//           <LockOpenIcon/>
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <Box sx={{ pt: 2 }}>
//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               if (credentialResponse.credential) {
//                 void googleLoginHandler(credentialResponse.credential);
//               }
//             }}
//             onError={() => {
//               console.log('Login Failed');
//             }}
//           />
//         </Box>
//         {error && (
//           <Alert severity="error" sx={{mt: 3, width: '100%'}}>
//             {error.error}
//           </Alert>
//         )}
//         <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Username"
//                 name="username"
//                 autoComplete="current-username"
//                 value={state.username}
//                 onChange={inputChangeHandler}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 value={state.password}
//                 onChange={inputChangeHandler}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{mt: 3, mb: 2}}
//           >
//             Sign In
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link component={RouterLink} to="/register" variant="body2">
//                 Or sign up
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };
//
// export default Login;