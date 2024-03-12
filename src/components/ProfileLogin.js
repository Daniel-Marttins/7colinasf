import React, { useState } from "react";
import '../styles/ProfileLogin.css';
import { profileLogin } from '../api/api'; 
import ManegerImage from '../assets/Computer login-rafiki.png';
import Button from '@mui/material/Button';
import { 
    TextField
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const ProfileLogin = ({ setSavedProfile, setTabClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await profileLogin(email, password);
            localStorage.setItem('profile', JSON.stringify(data));
            setSavedProfile(data);
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setError('');
    };

    const handleTabClick= (index) => {
        setTabClick(index);
    };

    return(
        <div className="show-options">
            <img className="login-image" src={ManegerImage}></img>
            <div className="btn-options">
                <h2>
                    Seja bem vindo(a) a 7Colinas Talentos;<br />
                    <span>Faça seu login ou cadastro!</span>
                </h2>
                <div className="card-login">
                    <form onSubmit={handleLogin}>
                        <TextField
                            id="filled-basic"
                            label="Email"
                            variant="filled"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                width: "80%",
                                '& .MuiInputBase-input': {
                                    color: 'white', 
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                            }} />
                        <TextField
                            label="Senha"
                            type="password"
                            variant="filled"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                width: "80%",
                                '& .MuiInputBase-input': {
                                    color: 'white', 
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                            }} />
                        <span onClick={() => handleTabClick(1)}>Não possui cadastro? <a href="#"> Clique aqui</a></span>
                        <span onClick={() => handleTabClick(1)}>Esqueçeu a senha? <a href="#"> Recuperar</a></span>
                        <Button type="submit" sx={{ width: "80%", marginTop: "2rem" }} variant="contained" color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Entrar'}
                        </Button>
                    </form>
                </div>
            </div>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>
        </div>
    );


}

export default ProfileLogin;