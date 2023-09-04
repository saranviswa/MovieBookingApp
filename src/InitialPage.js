import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                My Booking App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const defaultTheme = createTheme();

const InitialPage = (props) => {
    const [data, setData] = useState('');
    const [loginID, setLoginID] = useState('');
    const [emailID, setEmailID] = useState('');
    const [password, setPassword] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    function showNotification(message, variant = "error") {
        return enqueueSnackbar(message, { variant });
    }
    const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoginID(data.get('email'))
        setPassword(data.get('password'))
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    console.log(loginID)
    console.log(password)
    const handleForgotPasswordClick = () => {
        setForgotPasswordDialogOpen(true);
        setEmailID('')
    };

    const handleForgotPasswordDialogClose = () => {
        setForgotPasswordDialogOpen(false);
        setSecurityQuestion('');
        setSecurityAnswer('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    const handleSecurityQuestionSubmit = () => {
        if (emailID != "") {
            let config = {
                method: 'post',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/forgot',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": emailID,

                })
            }
            fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/forgot', config)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setSecurityQuestion(data.message)

                })
                .catch((error) => {
                    showNotification("Invalid User Credentials", "error")
                    console.error('Error fetching data:', error)
                });
        }
        else {
            showNotification("Enter Email ID.", "error")
        }
    };

    const handlePasswordReset = () => {
        if (securityAnswer != "" && newPassword != "" && confirmNewPassword != "") {
            let config = {
                method: 'post',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/resetpassword',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": emailID,
                    "security_answer": securityAnswer,
                    "password": newPassword,
                    "confirm_password": confirmNewPassword

                })
            }
            fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/resetpassword', config)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Invalid details", response.status)

                    }
                    return response.json()
                })
                .then((data) => {
                    showNotification(data.message, "success")

                })
                .catch((error) => {
                    showNotification(error, "error")
                    console.error('Error fetching data:', error)
                });

            handleForgotPasswordDialogClose()
        } else {
            showNotification("Enter all the required details", "error");
        }
    };

    useEffect(() => {
        if (loginID !== "" && password !== "") {
            let config = {
                method: 'post',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/login',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "login_id": loginID,
                    "password": password
                })
            }
            fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/login', config)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Invalid login credentials", response.status)

                    }
                    return response.json()
                })
                .then((data) => {
                    setData(data)
                    console.log(data.message)
                    if (data.message == "Login successful!") {
                        showNotification(data.message, "success")
                        setTimeout(function () {
                            console.log("After 2000ms");
                            if (loginID == "admin") {
                                window.location.href = '/admin';
                            } else {
                                window.location.href = '/movies';
                            }
                        }, 1000);
                    }

                })
                .catch((error) => {
                    showNotification("Invalid User Credentials", "error")
                    console.error('Error fetching data:', error)
                });
        }

    }, [loginID, password]);

    console.log(data);
    const handleSignUp = () => {
        console.log("handle sig upSS")
        setSignUp(true);
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Login ID"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={handleForgotPasswordClick}>
                                    Forgot password?
                                </Link>
                            </Grid>

                            <Dialog open={forgotPasswordDialogOpen} onClose={handleForgotPasswordDialogClose}>
                                <DialogTitle>
                                    <LockIcon /> Forgot Password
                                </DialogTitle>
                                <DialogContent>
                                    {securityQuestion ? (
                                        <>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Security Question: {securityQuestion}
                                            </Typography>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="securityAnswer"
                                                label="Security Answer"
                                                type="text"
                                                fullWidth
                                                value={securityAnswer}
                                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="newPassword"
                                                label="New Password"
                                                type="password"
                                                fullWidth
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="confirmNewPassword"
                                                label="Confirm New Password"
                                                type="password"
                                                fullWidth
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            />
                                        </>
                                    ) : (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="emailID"
                                            label="Email ID"
                                            type="text"
                                            fullWidth
                                            value={emailID}
                                            onChange={(e) => setEmailID(e.target.value)}
                                        />
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={securityQuestion ? handlePasswordReset : handleSecurityQuestionSubmit}>
                                        {securityQuestion ? 'Reset Password' : 'Get Security Question'}
                                    </Button>
                                    <Button onClick={handleForgotPasswordDialogClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>

                            <Grid item>
                                <Link href="/signup" variant="body2" onClick={handleSignUp}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );

}

export default InitialPage;