import React, { useState, useEffect } from "react";
import '../styles/ProfileDetails.css';
import Button from '@mui/material/Button';
import { 
    Avatar
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';
import ProfileUpdate from "./ProfileUpdate";

const ProfileDetails = ({ profile, logout, updatedProfile }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleLogout = () => {
        logout(null);
    };

    const [formFiles, setFormFiles] = useState({
        profileImage: null,
        profileCV: null
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setFormFiles({ ...formFiles, profileImage: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const imageInputRef = React.createRef();

    const handleClearImage = () => {
        setSelectedImage(null); // Limpa a imagem selecionada
        setFormFiles({ ...formFiles, profileImage: profile.profileImage }); // Restaura a imagem do perfil
    };

    const handleDownloadCV = () => {
        const dataURL = `data:application/pdf;base64,${profile.profileCV}`;
        const fileName = "curriculo.pdf";
        const downloadLink = document.createElement("a");

        downloadLink.href = dataURL;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    return(
        <div className="profile-details-main">
            <div className="form">
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
                            title="Alterar Imagem"
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
                            title="Remover Imagem"
                        >   
                            <ClearIcon sx={{color:"red"}} onClick={handleClearImage}/>
                        </IconButton>
                    </div>
                    <h2>{profile.profileName}</h2>
                    <p>{profile.profileProfession}</p>
                    <span title="Tag do Perfil">#{profile.profileTag}</span>
                    {/*BOTÃO PARA BAIXAR CV EM PDF DO PERFIL, VINDO DE (profile.profileCV) */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDownloadCV}
                        title="Baixar Curriculo"
                        sx={{ 
                            display: "flex",
                            alignItems:"center",
                            justifyContent:"center",
                            position: "absolute",
                            bottom: "8rem",
                            marginTop: "1rem", 
                            height: "8%" 
                        }}
                    >
                        <GetAppIcon sx={{fontSize:"18px"}} />
                        Baixar CV
                    </Button>
                    <div className="profile-actions">
                        <a href={`https://api.whatsapp.com/send?phone=${profile.profilePhoneNumber}`} target="_blank" without rel="noreferrer"><WhatsAppIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                        <a href={profile.profileInstagram} target="_blank" without rel="noreferrer"><InstagramIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                        <a href={profile.profileLinkedin} target="_blank" without rel="noreferrer"><LinkedInIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                    </div>
                </div>

                <div className="profile-form">
                    <ProfileUpdate loggedProfile={profile} canLogout={handleLogout} setSavedProfile={updatedProfile} /> 
                </div>
            </div>
        </div>
    );


}

export default ProfileDetails;