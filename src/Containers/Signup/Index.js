// import NavBar from "../../Components/NavBar/NavBar";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../../Components/firebase';

const Signup = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);


    const validate = () => {
        if (firstName.trim().length === 0) {
            setError('First name is required')
            return false;
        } else if (lastName.trim().length === 0) {
            setError('Last name is required')
            return false;
        } else if (email.trim().length === 0) {
            setError('Email is required')
            return false;
        } else if (password.trim().length === 0) {
            setError('Password is required')
            return false;
        } else if (password.trim().length < 6) {
            setError('Password must be at least 6 characters')
            return false;
        } else if (password !== confirmPassword) {
            setError('Password does not match')
            return false;
        }
        return true;
    }


    const signupFormSubmitHandler = (e) => {
        if (navigator.onLine) {
            if (validate()) {
                signupWithEmailPassword(`${firstName} ${lastName}`, firstName, lastName, email, password);
            }
        } else {
            <Alert severity="error">Please check your internet connection</Alert>
        }
        e.preventDefault()
    }

    const setUserDataToFirestore = async (user, firstName, lastName) => { // set user data to firestore from all providers
        const db = getFirestore();

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            const userRef = await addDoc(collection(db, "users_profile"), {
                name: user.displayName,
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                createdAt: serverTimestamp(),
            })
            await updateDoc(userRef, {
                userId: user.uid,
                userRef: userRef.id,
            });
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                userRef: doc(db, "users_profile", userRef.id),
                uid: user.uid,
                createdAt: serverTimestamp(),
            });
        } else {
            navigate('/home');
        }
        setLoading(false)
        navigate('/home');
    }

    const signupWithEmailPassword = async (name, firstName, lastName, email, password) => {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            user.displayName = name;
            setUserDataToFirestore(user, firstName, lastName)
        } catch (err) {
            setError(err.code)
            setLoading(false)
        }
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
                            <form onSubmit={signupFormSubmitHandler}>
                                {error && <Alert xs={12} sx={{ mb: 2 }} severity="error">{error}</Alert>}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }} >
                                        <Typography variant="h5" component="h2">
                                            Signup
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField onChange={(e) => setFirstName(e.target.value)} autoFocus fullWidth id="firstname" label="First Name" variant="outlined" placeholder='Please enter first name' />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField onChange={(e) => setLastName(e.target.value)} fullWidth id="lastName" label="Last name" variant="outlined" placeholder='Please enter last name' />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField onChange={(e) => setEmail(e.target.value)} fullWidth type="email" id="email" label="Email" variant="outlined" placeholder='Please enter email' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setPassword(e.target.value)} fullWidth type='password' id="password" label="Password" variant="outlined" placeholder='Please enter password' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setConfirmPassword(e.target.value)} fullWidth type='password' id="cPassword" label="Confirm Password" variant="outlined" placeholder='Please enter confirm password' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type='submit' id='signupBtn' variant="contained" fullWidth>Signup</Button>
                                        <Link style={{ textDecoration: 'none' }} to='/'><Button sx={{ mt: 3 }} type='submit' id="login" variant="outlined" fullWidth>Login</Button></Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Box>}

        </>
    )
}
export default Signup;