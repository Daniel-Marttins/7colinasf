import React, { useState, useEffect } from "react";
import '../styles/ProfileRegister.css';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from "dayjs";


const ProfileRegister = ({ setTabClick, onDataReload }) => {
    const [activeRegisterTab, setActiveRegisterTab] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [newExperience, setNewExperience] = useState("");
    const [newSkill, setNewSkill] = useState("");
    const [newEducation, setNewEducation] = useState("");
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState('');
    const [showErrorSnackbar, setShowErrorSnackbar] = useState('');

    const brazilianStates = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
        "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const [profileBirthday, setProfileBirthday] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
        setSelectedGender(event.target.value);
        setFormData({ ...formData, profileGender: event.target.value });
    };

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
        setFormData({ ...formData, profileOccupationArea: event.target.value });
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setFormData({ ...formData, profileState: event.target.value });
    };

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

    const handlePDFChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedPDF(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profileCV: file });
            };
            reader.readAsDataURL(file);
        }
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

    const handleRegister = async(event) => {
        event.preventDefault();
        
        try {
            const data = {
                profileName: formData.profileName,
                profileBirthday: profileBirthday,
                profileCreateAt: formData.profileCreateAt,
                profileStatus: formData.profileStatus,
                profilePassword: formData.profilePassword,
                profileEmail: formData.profileEmail,
                profilePhoneNumber: formData.profilePhoneNumber,
                profileInstagram: formData.profileInstagram,
                profileLinkedin: formData.profileLinkedin,
                profileDescription: formData.profileDescription,
                profileProfession: formData.profileProfession,
                profileState: formData.profileState,
                profileCity: formData.profileCity,
                profileAddress: formData.profileAddress,
                profileGender: formData.profileGender,
                profileOccupationArea: formData.profileOccupationArea,
                profileProfessionalExperiences: formData.profileProfessionalExperiences.join(','),
                profileEducations: formData.profileEducations.join(','),
                profileSkills: formData.profileSkills.join(','),
                profileImage: formData.profileImage,
                profileCV: formData.profileCV
            }

            const response = await addNewProfile(data);
            setFormData({ 
                profileName: "",
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
            setProfileBirthday(null);
            setSelectedArea("");
            setSelectedGender("");
            setSelectedState("");
            onDataReload();
            setShowSuccessSnackbar('Perfil Cadastrado com Sucesso!');
            setTimeout(() => {
                setTabClick(0);
            }, 700);
        } catch (error) {
            setShowErrorSnackbar("Erro ao realizar a solicitação. Tente novamente mais tarde");
        }
    };

    const canSubmit = formData.profileName.trim() !== "" &&
                      formData.profileEmail.trim() !== "" &&
                      formData.profilePassword.trim() !== "" &&
                      formData.profileGender.trim() !== "" &&
                      formData.profilePhoneNumber.trim() !== "" &&
                      formData.profileInstagram.trim() !== "" &&
                      formData.profileLinkedin.trim() !== "" &&
                      formData.profileOccupationArea.trim() !== "" &&
                      formData.profileProfession.trim() !== "" &&
                      formData.profileDescription.trim() !== "";


    const handleTabRegisterClick= (index) => {
        setActiveRegisterTab(index);
    };

    const handleCloseSuccessSnackbar = () => {
        setShowSuccessSnackbar('');
      };
    
      const handleCloseErrorSnackbar = () => {
        setShowErrorSnackbar('');
      };

    const imageInputRef = React.createRef();
    const pdfInputRef = React.createRef();

    const handleImageButtonClick = () => {
        imageInputRef.current.click();
    };

    const handlePDFButtonClick = () => {
        pdfInputRef.current.click();
    };

    const handleTabClick= (index) => {
        setTabClick(index);
    };

    return(
        <div className="profile-register-main">
            <h2 className="register-text">Vamos realizar seu cadastro</h2>
            <div className="btn-tab back active" onClick={() => handleTabClick(0)}>
                <Button variant="outlined" color="error">Voltar</Button>
            </div>
            <form onSubmit={handleRegister} method="post">
                <div className="column-image">
                    <Avatar 
                        src={selectedImage || "/static/images/avatar/1.jpg"} 
                        sx={{
                            width: 120,
                            height: 120,
                            objectFit: 'contain'
                        }}
                    />
                    <Button variant="contained" sx={{width:"70%", fontSize:"8px", marginTop:"1rem"}} onClick={handleImageButtonClick}>
                        Selecionar Imagem
                    </Button>
                    <input
                        ref={imageInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {selectedPDF && (
                        <h5 style={{color:"white"}}>{selectedPDF.name}</h5>
                    )}
                    <Button variant="contained" sx={{width:"70%", fontSize:"8px", marginTop:"1rem"}} onClick={handlePDFButtonClick}>
                        Selecionar PDF
                    </Button>
                    <input
                        ref={pdfInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handlePDFChange}
                        accept=".pdf"
                    />
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
                            <TextField
                                label="Senha *"
                                type="password"
                                name="profilePassword"
                                value={formData.profilePassword}
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
                                    value={selectedGender}
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
                                    value={selectedArea}
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
                                sx={{height:"60%", width:"20%"}}
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
                                sx={{height:"60%", width:"20%"}}
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
                                    value={selectedState}
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
                    {/*MUDAR TABS - CHANGE TABS */}
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
                </div>
                {canSubmit && (
                    <Button     
                    variant="contained"
                    type="submit"
                    color="success" 
                    sx={{ 
                        width:"10%",
                        position:"absolute",
                        right: "12rem",
                        top:"1.4rem"
                    }}
                    >
                        Cadastrar
                    </Button>
                )}
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
    );

}

export default ProfileRegister;