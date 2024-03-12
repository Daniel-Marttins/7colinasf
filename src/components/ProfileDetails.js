import React, { useState, useEffect } from "react";
import '../styles/ProfileDetails.css';
import { addNewProfile } from '../api/api';
import Button from '@mui/material/Button';
import { 
    TextField, 
    Avatar, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ProfileDetails = ({ profile, logout }) => {

    const handleLogout = () => {
        localStorage.removeItem('profile');
        logout(null);
    };

    return(
        <div className="profile-details-main">
            <form>
                <div className="profile-crud-buttons">
                    <Button onClick={handleLogout} variant="contained" color="success" sx={{marginLeft: "5px"}}>Atualizar</Button>
                    <Button onClick={handleLogout} variant="contained" color="secondary" sx={{marginLeft: "5px"}}>Sair</Button>
                    <Button onClick={handleLogout} variant="outlined" color="error" sx={{marginLeft: "2rem"}}>Excluir Perfil</Button>
                </div>
                Bem-vindo(a), {profile.profileName}!
            </form>
        </div>
    );


}

export default ProfileDetails;