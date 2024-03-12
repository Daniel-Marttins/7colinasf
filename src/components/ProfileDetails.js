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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';

const ProfileDetails = ({ profile, logout }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('profile');
        logout(null);
    };

    const [formData, setFormData] = useState({
        profileName: "",
        profileCreateAt: new Date().toISOString(),
        profileStatus: "Ativo",
        profilePassword: "",
        profileEmail: "",
        profilePhoneNumber: "",
        profileInstagram: "",
        profileLinkedin: "",
        profileDescription: "",
        profileProfession: "",
        profileState: "",
        profileCity: "",
        profileAddress: "",
        profileGender: "",
        profileOccupationArea: "",
        profileProfessionalExperiences: [],
        profileEducations: [],
        profileSkills: [],
        profileImage: null,
        profileCV: null
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setFormData({ ...formData, profileImage: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const imageInputRef = React.createRef();

    const handleClearImage = () => {
        setSelectedImage(null); // Limpa a imagem selecionada
        setFormData({ ...formData, profileImage: profile.profileImage }); // Restaura a imagem do perfil
    };


    return(
        <div className="profile-details-main">
            <form>
                <div className="profile-crud-buttons">
                    <Button onClick={handleLogout} variant="contained" color="success" sx={{marginLeft: "5px"}}>Atualizar</Button>
                    <Button onClick={handleLogout} variant="contained" color="secondary" sx={{marginLeft: "5px"}}>Sair</Button>
                    <Button onClick={handleLogout} variant="outlined" color="error" sx={{marginLeft: "2rem"}}>Excluir Perfil</Button>
                </div>

                <div className="profile-show-infos">
                    <Avatar
                        alt={profile.profileName}
                        src={selectedImage ? selectedImage : `data:image/png;base64,${profile.profileImage}`}
                        sx={{ 
                            width: 150, 
                            height: 150,
                            position: "absolute",
                            top: "1rem"
                        }}
                    />
                    <div className="profile-image-options">
                        <IconButton
                            component="label"
                            sx={{ width: "100%", height:"20%", fontSize: "8px", marginTop: "1rem" }}
                        >   
                            <ChangeCircleOutlinedIcon sx={{color:"white"}} />
                            <input
                                ref={imageInputRef}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </IconButton>

                         <IconButton
                            component="label"
                            sx={{ width: "100%", height:"20%", fontSize: "8px", marginTop: "1rem" }}
                        >   
                            <ChangeCircleOutlinedIcon sx={{color:"white"}} />
                            <input
                                ref={imageInputRef}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </IconButton>
                    </div>
                    <h2>{profile.profileName}</h2>
                    <p>{profile.profileProfession}</p>
                    <span title="Tag do Perfil">#{profile.profileTag}</span>
                    <div className="profile-actions">
                        <a href={`https://api.whatsapp.com/send?phone=${profile.profilePhoneNumber}`} target="_blank" without rel="noreferrer"><WhatsAppIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                        <a href={profile.profileInstagram} target="_blank" without rel="noreferrer"><InstagramIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                        <a href={profile.profileLinkedin} target="_blank" without rel="noreferrer"><LinkedInIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                    </div>
                </div>

                <div className="profile-form">
                    
                </div>
            </form>
        </div>
    );


}

export default ProfileDetails;