// import NavBar from "../../Components/NavBar/NavBar";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Components/firebase';
import loaderContext from '../../Components/context/LoaderContext';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);







    const validate = () => {
        if (email.trim().length === 0) {
            setError('Email is required')
            return false;
        } else if (password.trim().length === 0) {
            setError('Password is required')
            return false;
        } else if (password.trim().length < 6) {
            setError('Wrong password')
            return false;
        }
        return true;
    }

    const loginWithEmailPassword = async (email, password) => { // login with email and password
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/home');
            setLoading(false)
        } catch (err) {
            setError(err.message)
            console.log(err);
            setLoading(false)
        }
    }

    const loginFormSubmitHandler = (e) => {
        if (navigator.onLine) {
            if (validate()) {
                loginWithEmailPassword(email, password);
            }
        } else {
            <Alert severity="error">Please check your internet connection</Alert>
        }
        e.preventDefault()
    }

    return (
        <>
            {loading ? <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={150} />
            </Box>
                :
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '100vh', p: '0px 5px' }}>
                    <Card sx={{ maxWidth: 600, p: '15px 15px' }}>
                        <CardContent>
                            <form onSubmit={loginFormSubmitHandler}>
                                {error && <Alert xs={12} sx={{ mb: 2 }} severity="error">{error}</Alert>}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }} >
                                        <Typography variant="h5" component="h2">
                                            Login
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField onChange={(e) => setEmail(e.target.value)} autoFocus fullWidth id="email" label="Email" variant="outlined" placeholder='Please enter email' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setPassword(e.target.value)} fullWidth type='password' id="password" label="Password" variant="outlined" placeholder='Please enter password' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type='submit' id="loginBtn" variant="contained" fullWidth>Login</Button>
                                        <Link  style={{ textDecoration: 'none'}} to='/signup'><Button sx={{mt:3}} type='submit' id="signup" variant="outlined" fullWidth>Signup</Button></Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Box>}
        </>
    )
}
export default Login;