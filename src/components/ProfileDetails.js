import React, { useState, useEffect } from "react";
import { updateProfile, deleteProfile } from '../api/api';
import { loadLoggedUser, saveLoggedUser } from "./userUtils";
import '../styles/ProfileDetails.css';
import Button from '@mui/material/Button';
import { 
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
    Paper,
    TextField
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';
import dayjs from "dayjs";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';


const ProfileDetails = ({ logout }) => {
    const [loggedProfile, setLoggedUser] = useState(null);
    const [activeRegisterTab, setActiveRegisterTab] = useState(0);
    const [newExperience, setNewExperience] = useState("");
    const [newSkill, setNewSkill] = useState("");
    const [newEducation, setNewEducation] = useState("");
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState('');
    const [showErrorSnackbar, setShowErrorSnackbar] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        profileName: "",
        profileBirthday: null,
        profileTag: "",
        profilePassword: "",
        profileGender: "",
        profileEmail: "",
        profilePhoneNumber: "",
        profileInstagram: "",
        profileLinkedin: "",
        profileDescription: "",
        profileProfession: "",
        profileState: "",
        profileCity: "",
        profileAddress: "",
        profileOccupationArea: "",
        profileProfessionalExperiences: [],
        profileEducations: [],
        profileSkills: [],
        profileImage: null,
        profileCV: null
    });

    useEffect(() => {
        const profile = loadLoggedUser();
        setLoggedUser(profile);

        if (profile) {
            setFormData({
                profileName: profile.profileName || "",
                profileBirthday: profile.profileBirthday ? dayjs(profile.profileBirthday) : null,
                profileTag: profile.profileTag || profile.profileTag,
                profilePassword: profile.profilePassword || "",
                profileGender: profile.profileGender || "",
                profileEmail: profile.profileEmail || "",
                profilePhoneNumber: profile.profilePhoneNumber || "",
                profileInstagram: profile.profileInstagram || "",
                profileLinkedin: profile.profileLinkedin || "",
                profileDescription: profile.profileDescription || "",
                profileProfession: profile.profileProfession || "",
                profileState: profile.profileState || "",
                profileCity: profile.profileCity || "",
                profileAddress: profile.profileAddress || "",
                profileOccupationArea: profile.profileOccupationArea || "",
                profileProfessionalExperiences: profile.profileProfessionalExperiences || [],
                profileEducations: profile.profileEducations || [],
                profileSkills: profile.profileSkills || [],
                profileImage: profile.profileImage || null,
                profileCV: profile.profileCV || null
            });
        }
    }, []);

    const handleLogout = () => {
        logout();
    };

    const brazilianStates = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
        "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const [profileBirthday, setProfileBirthday] = useState(null);

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
        setFormData({ ...formData, profileImage: loggedProfile.profileImage }); // Restaura a imagem do perfil
    };

    const handleDownloadCV = () => {
        if (loggedProfile.profileCV == null || loggedProfile.profileCV == "") {
            alert("Este Perfil não cadastrou um curriculo!");
            return;
        }
        const dataURL = `data:application/pdf;base64,${loggedProfile.profileCV}`;
        const fileName = "curriculo.pdf";
        const downloadLink = document.createElement("a");

        downloadLink.href = dataURL;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "newExperience") {
            setNewExperience(value);
        } else if (name === "newSkill") {
            setNewSkill(value);
        } else if (name === "newEducation") {
            setNewEducation(value);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDateChange = (date) => {
        const dayjsObject = dayjs(date);
        const formattedDate = dayjsObject.format('MM/DD/YYYY'); // Ajustado para 'MM/DD/YYYY'
        setProfileBirthday(formattedDate);
    };

    const handleGenderChange = (event) => {
        setFormData({ ...formData, profileGender: event.target.value });
    };

    const handleAreaChange = (event) => {
        setFormData({ ...formData, profileOccupationArea: event.target.value });
    };

    const handleStateChange = (event) => {
        setFormData({ ...formData, profileState: event.target.value });
    };

    const handleAddExperience = () => {
        if (newExperience.trim() === "") return;

        setFormData({
            ...formData,
            profileProfessionalExperiences: [...formData.profileProfessionalExperiences, newExperience],
        });

        setNewExperience("");
    };

    const handleRemoveExperience = (index) => {
        const updatedExperience = formData.profileProfessionalExperiences.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            profileProfessionalExperiences: updatedExperience,
        });
    };

    const handleAddEducation = () => {
        if (newEducation.trim() === "") return;

        setFormData({
            ...formData,
            profileEducations: [...formData.profileEducations, newEducation],
        });

        setNewEducation("");
    };

    const handleRemoveEducation = (index) => {
        const updatedEducation = formData.profileEducations.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            profileEducations: updatedEducation,
        });
    };

    const handleAddSkill = () => {
        if (newSkill.trim() === "") return;

        setFormData({
            ...formData,
            profileSkills: [...formData.profileSkills, newSkill],
        });

        setNewSkill("");
    };

    const handleRemoveSkill = (index) => {
        const updatedSkill = formData.profileSkills.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            profileSkills: updatedSkill,
        });
    };

    const handleTabRegisterClick= (index) => {
        setActiveRegisterTab(index);
    };

    const handleUpdate = async(event) => {
        event.preventDefault();
        try{
            const response = await updateProfile(formData);
            const updatedUser = { ...loggedProfile, ...formData };
            saveLoggedUser(updatedUser);
            setLoggedUser(updatedUser);
            setShowSuccessSnackbar('Perfil Atualizado com Sucesso!');
        } catch (error) {
            setShowErrorSnackbar("Erro ao realizar a solicitação. Tente novamente mais tarde");
        }
    }

    const handleDeleteProfile = async () => {
        try {
            await deleteProfile(formData?.profileTag);
            setShowSuccessSnackbar("Exclusão bem sucedida!");
            setTimeout(() => {
                handleLogout();
            }, 300);
        } catch (error) {
        }
        setOpenDialog(false);
    };

    const handleCloseSuccessSnackbar = () => {
        setShowSuccessSnackbar('');
    };
    
    const handleCloseErrorSnackbar = () => {
        setShowErrorSnackbar('');
    };

    return(
        <div className="profile-details-main">
            <div className="form">
                <div className="profile-form">
                    <div className="profile-show-infos">
                        <Avatar
                            alt={loggedProfile?.profileName}
                            src={selectedImage ? selectedImage : `data:image/png;base64,${loggedProfile?.profileImage}`}
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
                        <h2>{loggedProfile?.profileName}</h2>
                        <p>{loggedProfile?.profileProfession}</p>
                        <span title="Tag do Perfil">#{loggedProfile?.profileTag}</span>
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
                            <a href={`https://api.whatsapp.com/send?phone=${loggedProfile?.profilePhoneNumber}`} target="_blank" without rel="noreferrer"><WhatsAppIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                            <a href={loggedProfile?.profileInstagram} target="_blank" without rel="noreferrer"><InstagramIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                            <a href={loggedProfile?.profileLinkedin} target="_blank" without rel="noreferrer"><LinkedInIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                        </div>
                    </div>
                    <div className="profile-update-main">
                    <form onSubmit={handleUpdate} method="put">
                        <div className="profile-crud-buttons">
                            <Button type="submit" variant="contained" color="success" sx={{marginLeft: "5px"}}>Atualizar</Button>
                            <Button onClick={handleLogout} variant="contained" color="secondary" sx={{marginLeft: "5px"}}>Sair</Button>
                            <Button onClick={() => setOpenDialog(true)} variant="outlined" color="error" sx={{marginLeft: "2rem"}}>
                                Excluir Perfil
                            </Button>
                            <Dialog
                                open={openDialog}
                                onClose={() => setOpenDialog(false)}
                            >
                                <DialogTitle>Confirmação</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Tem certeza de que deseja excluir o perfil?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                                    <Button onClick={handleDeleteProfile} variant="contained" color="error">Sim, Excluir</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <div className="column-input">
                            <div className={activeRegisterTab === 0 ? "row-register-tab active" : "row-register-tab"}>
                                <div className="row-register">
                                    <TextField
                                        id="filled-basic"
                                        label="Nome *"
                                        title="Nome(Obrigatório)"
                                        name="profileName"
                                        value={formData.profileName}
                                        onChange={handleInputChange}
                                        variant="filled"
                                        sx={{
                                            width: "55%",
                                            '& .MuiInputBase-input': {
                                                color: 'white',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer 
                                            components={['DateField']}
                                            sx={{
                                                width: "20%",
                                                height: "90%",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <DateField 
                                                label="Nascimento *"
                                                title="Nascimento(Obrigatório)"
                                                name="profileBirthday"
                                                value={formData.profileBirthday}
                                                onChange={handleDateChange}
                                                variant="filled"
                                                sx={{
                                                    display: "flex",
                                                    alignItems:"center",
                                                    justifyContent:"center",
                                                    width: "20%",
                                                    height: "90%",
                                                    '& .MuiInputBase-input': {
                                                        color: 'white', 
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'white',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'white',
                                                    },
                                                }} 
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <FormControl
                                        sx={{
                                            width: "20%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}
                                        variant="filled"
                                    >
                                        <InputLabel id="occupation-area-label">Sexo</InputLabel>
                                        <Select
                                            label="Sexo"
                                            labelId="gender-label"
                                            value={formData.profileGender}
                                            onChange={handleGenderChange}
                                        >
                                            <MenuItem value="">Sexo</MenuItem>
                                            <MenuItem value="Cisgênero">Masculino</MenuItem>
                                            <MenuItem value="Transgênero">Feminino</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="row-register">
                                    <TextField
                                        id="filled-basic"
                                        label="Email *"
                                        name="profileEmail"
                                        value={formData.profileEmail}
                                        onChange={handleInputChange}
                                        variant="filled"
                                        sx={{
                                            width: "40%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}  
                                    />
                                    <TextField
                                        id="filled-basic"
                                        label="Celular"
                                        name="profilePhoneNumber"
                                        value={formData.profilePhoneNumber}
                                        onChange={handleInputChange}
                                        variant="filled"
                                        sx={{
                                            width: "20%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}  
                                    />
                                    <TextField
                                        id="filled-basic"
                                        label="Link Instagram"
                                        name="profileInstagram"
                                        value={formData.profileInstagram}
                                        onChange={handleInputChange}
                                        variant="filled"
                                        sx={{
                                            width: "35%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}  
                                    />
                                </div>
                                <div className="row-register">
                                    <TextField
                                        id="filled-basic"
                                        label="Link LinkedIn"
                                        name="profileLinkedin"
                                        value={formData.profileLinkedin}
                                        onChange={handleInputChange}
                                        variant="filled"
                                        sx={{
                                            width: "40%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}  
                                    />
                                    <FormControl
                                        sx={{
                                            width: "56%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}
                                        variant="filled"
                                    >
                                        <InputLabel id="occupation-area-label">Área de Atuação</InputLabel>
                                        <Select
                                            label="Área de Atuação"
                                            labelId="gender-label"
                                            value={formData.profileOccupationArea}
                                            onChange={handleAreaChange}
                                        >
                                            <MenuItem value="">Selecione uma área</MenuItem>
                                            <MenuItem value="Tecnologia da Informação">Tecnologia da Informação</MenuItem>
                                            <MenuItem value="Saúde">Saúde</MenuItem>
                                            <MenuItem value="Engenharia">Engenharia</MenuItem>
                                            <MenuItem value="Educação">Educação</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="row-register">
                                    <TextField
                                        id="filled-basic"
                                        label="Profissão"
                                        name="profileProfession"
                                        value={formData.profileProfession}
                                        onChange={handleInputChange}
                                        variant="filled"
                                        sx={{
                                            width: "40%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}  
                                    />
                                    <TextField
                                        id="description"
                                        label="Descreva seu perfil"
                                        name="profileDescription"
                                        value={formData.profileDescription}
                                        onChange={handleInputChange}
                                        variant="filled"
                                        sx={{
                                            width: "56%",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }} 
                                    />
                                </div>
                                <div className="row-register"></div>
                            </div>
                            </div>
                            <div className={activeRegisterTab === 1 ? "row-register-tab active" : "row-register-tab"}>
                                <div className="row-register-input">
                                    <TextField
                                        id="filled-basic"
                                        label="Experiência"
                                        variant="filled"
                                        size="small"
                                        name="newExperience"
                                        value={newExperience}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        sx={{
                                            width: "75%",
                                            height: "70%",
                                            marginRight:"1rem",
                                            '& .MuiInputBase-input': {
                                                color: 'white', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}  
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="success" 
                                        sx={{height:"55%", width:"20%"}}
                                        onClick={handleAddExperience}
                                    >
                                        Adicionar
                                    </Button>
                                </div>  
                                    <div className="row-register-table">
                                    <TableContainer 
                                        component={Paper} 
                                        style={{ 
                                            width:"97%",
                                            height: "100%", 
                                            borderRadius:"0", 
                                            overflow:"auto", 
                                            backgroundColor:"transparent"
                                        }}
                                    >
                                        <Table sx={{ width:"100%", border: "none"}} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell 
                                                        sx={{
                                                            width:"80%",
                                                            color:"white",
                                                            fontWeight:"600"
                                                        }}
                                                    >
                                                        Descrição
                                                    </TableCell>
                                                    <TableCell 
                                                        sx={{
                                                            width:"20%",
                                                            color:"white",
                                                            fontWeight:"600"
                                                        }}>
                                                            Ação
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {formData.profileProfessionalExperiences.map((experience, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell
                                                            sx={{
                                                                color:"turquoise",
                                                            }}
                                                        >
                                                            {experience}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => handleRemoveExperience(index)}
                                                            >
                                                                Remover
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>       
                            </div>
                            <div className={activeRegisterTab === 2 ? "row-register-tab active" : "row-register-tab"}>
                                    <div className="row-register-input">
                                        <TextField
                                            id="filled-basic"
                                            label="Habilidades"
                                            variant="filled"
                                            size="small"
                                            name="newSkill"
                                            value={newSkill}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            sx={{
                                                width: "75%",
                                                height: "70%",
                                                marginRight:"1rem",
                                                '& .MuiInputBase-input': {
                                                    color: 'white', 
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white',
                                                },
                                            }}  
                                        />
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            sx={{height:"50%", width:"20%"}}
                                            onClick={handleAddSkill}
                                        >
                                            Adicionar
                                        </Button>
                                    </div>  
                                    <div className="row-register-table">
                                        <TableContainer 
                                            component={Paper} 
                                            style={{ 
                                                width:"97%",
                                                height: "100%", 
                                                borderRadius:"0", 
                                                overflow:"auto", 
                                                backgroundColor:"transparent" 
                                            }}
                                        >
                                            <Table sx={{ width:"100%" }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell 
                                                            sx={{
                                                                width:"80%",
                                                                color:"white",
                                                                fontWeight:"600"
                                                            }}
                                                        >
                                                            Descrição
                                                        </TableCell>
                                                        <TableCell 
                                                            sx={{
                                                                width:"20%",
                                                                color:"white",
                                                                fontWeight:"600"
                                                            }}>
                                                                Ação
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {formData.profileSkills.map((skill, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell
                                                                sx={{
                                                                    color:"turquoise",
                                                                }}
                                                            >
                                                                {skill}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleRemoveSkill(index)}
                                                                >
                                                                    Remover
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>       
                            </div>
                            <div className={activeRegisterTab === 3 ? "row-register-tab active" : "row-register-tab"}>
                                <div className="row-register-input">
                                        <TextField
                                            id="filled-basic"
                                            label="Educação"
                                            variant="filled"
                                            size="small"
                                            name="newEducation"
                                            value={newEducation}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            sx={{
                                                width: "75%",
                                                height: "70%",
                                                marginRight:"1rem",
                                                '& .MuiInputBase-input': {
                                                    color: 'white', 
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white',
                                                },
                                            }}  
                                        />
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            sx={{height:"60%", width:"20%"}}
                                            onClick={handleAddEducation}
                                        >
                                            Adicionar
                                        </Button>
                                    </div>  
                                    <div className="row-register-table">
                                        <TableContainer 
                                            component={Paper} 
                                            style={{ 
                                                width:"97%",
                                                height: "100%", 
                                                borderRadius:"0", 
                                                overflow:"auto", 
                                                backgroundColor:"transparent" 
                                            }}
                                        >
                                            <Table sx={{ width:"100%" }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell 
                                                            sx={{
                                                                width:"80%",
                                                                color:"white",
                                                                fontWeight:"600"
                                                            }}
                                                        >
                                                            Descrição
                                                        </TableCell>
                                                        <TableCell 
                                                            sx={{
                                                                width:"20%",
                                                                color:"white",
                                                                fontWeight:"600"
                                                            }}>
                                                                Ação
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {formData.profileEducations.map((educations, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell
                                                                sx={{
                                                                    color:"turquoise",
                                                                }}
                                                            >
                                                                {educations}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleRemoveEducation(index)}
                                                                >
                                                                    Remover
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>       
                            </div>
                            <div className={activeRegisterTab === 4 ? "row-register-tab active" : "row-register-tab"}>
                                <div className="row-register adress">
                                    <FormControl
                                            sx={{
                                                width: "20%",
                                                '& .MuiInputBase-input': {
                                                    color: 'white', 
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white',
                                                },
                                            }}
                                            variant="filled"
                                        >
                                            <InputLabel id="occupation-area-label">Estado</InputLabel>
                                            <Select
                                                label="Estado"
                                                labelId="state-label"
                                                value={formData.profileState}
                                                onChange={handleStateChange}
                                            >
                                                <MenuItem value="">Selecione seu Estado</MenuItem>
                                                {brazilianStates.map((state) => (
                                                    <MenuItem key={state} value={state}>{state}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            id="filled-basic"
                                            label="Cidade"
                                            name="profileCity"
                                            value={formData.profileCity}
                                            onChange={handleInputChange}
                                            variant="filled"
                                            sx={{
                                                width: "23%",
                                                '& .MuiInputBase-input': {
                                                    color: 'white', 
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white',
                                                },
                                            }}  
                                        />
                                        <TextField
                                            id="filled-basic"
                                            label="Endereço"
                                            name="profileAddress"
                                            value={formData.profileAddress}
                                            onChange={handleInputChange}
                                            variant="filled"
                                            sx={{
                                                width: "53%",
                                                '& .MuiInputBase-input': {
                                                    color: 'white', 
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white',
                                                },
                                            }}  
                                        />
                                    </div>
                            </div>

                        <div className="columns-change-tabs">
                                <span 
                                    onClick={() => handleTabRegisterClick(0)}
                                >
                                    Dados básicos
                                </span>
                                <span 
                                    onClick={() => handleTabRegisterClick(1)}
                                >
                                    Experiências
                                </span>
                                <span 
                                    onClick={() => handleTabRegisterClick(2)}
                                >
                                    Habilidades
                                </span>
                                <span 
                                    onClick={() => handleTabRegisterClick(3)}
                                >
                                    Educação
                                </span>
                                <span 
                                    onClick={() => handleTabRegisterClick(4)}
                                >
                                    Endereços
                                </span>
                        </div>
                        </form>
                        <Snackbar open={!!showSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSuccessSnackbar}>
                            <MuiAlert elevation={6} variant="filled" onClose={handleCloseSuccessSnackbar} severity="success">
                                {showSuccessSnackbar}
                            </MuiAlert>
                        </Snackbar>

                        <Snackbar open={!!showErrorSnackbar} autoHideDuration={6000} onClose={handleCloseErrorSnackbar}>
                            <MuiAlert elevation={6} variant="filled" onClose={handleCloseErrorSnackbar} severity="error">
                                {showErrorSnackbar}
                            </MuiAlert>
                        </Snackbar>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default ProfileDetails;