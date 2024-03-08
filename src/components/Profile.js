import React, { useState, useEffect } from "react";
import '../styles/Profile.css';
import { profileLogin, addNewProfile } from '../api/api'; 
import ManegerImage from '../assets/Computer login-rafiki.png';
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
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/joy/Divider';

const Profile = ({ onDataReload }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [savedProfile, setSavedProfile] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [activeRegisterTab, setActiveRegisterTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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

    useEffect(() => {
        const savedProfileString = localStorage.getItem('profile');
        if (savedProfileString) {
            const savedProfile = JSON.parse(savedProfileString);
            setSavedProfile(savedProfile);
        }
    }, []);

    const brazilianStates = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
        "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const [formData, setFormData] = useState({
        profileName: "",
        profileBirthday: "",
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
                // Converter a imagem para base64
                const base64String = reader.result.split(",")[1];
                setFormData({ ...formData, profileImage: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePDFChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedPDF(file);
            // Converter o PDF para base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(",")[1];
                setFormData({ ...formData, profileCV: base64String });
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

    const handleRegister = async() => {
        try {
            const response = await addNewProfile(formData); // Passando o formData como parâmetro
            setFormData({ 
                profileName: "",
                profileBirthday: "",
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
            onDataReload();
            setShowSuccessSnackbar('Perfil Cadastrado com Sucesso!');
        } catch (error) {
            setShowErrorSnackbar("Erro ao realizar a solicitação. Tente novamente mais tarde");
        }
    };

    const handleTabClick= (index) => {
        setActiveTab(index);
    };

    const handleTabRegisterClick= (index) => {
        setActiveRegisterTab(index);
    };
    
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await profileLogin(email, password);
            setSavedProfile(data);
            localStorage.setItem('profile', JSON.stringify(data));
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('profile');
        setSavedProfile(null);
    };

    const handleSnackbarClose = () => {
        setError('');
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

    return (
        <div className="main-profile">
            {!savedProfile && (
                <>
                <div className={activeTab === 0 ? "profile-presentation show-options active" : "profile-presentation"}>
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
                                <span onClick={() => handleTabClick(1)}>Não possui cadastro? <a href="#">Clique aqui</a></span>
                                <Button type="submit" sx={{ width: "80%", marginTop: "2rem" }} variant="contained" color="primary" disabled={loading}>
                                    {loading ? <CircularProgress size={24} /> : 'Entrar'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={activeTab === 1 ? "profile-presentation active" : "profile-presentation"}>
                    <h2 className="register-text">Vamos realizar seu cadastro</h2>
                    <div className={activeTab === 1 ? "btn-tab back active" : "btn-tab"} onClick={() => handleTabClick(0)}>
                        <Button variant="outlined" color="error">Voltar</Button>
                    </div>
                    <form onSubmit={handleRegister}>
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
                                        label="Nome"
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
                                    <TextField
                                        id="filled-basic"
                                        label="Nascimento"
                                        name="profileBirthday"
                                        value={formData.profileBirthday}
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
                                        label="Senha"
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
                                        <InputLabel id="occupation-area-label">Genêro</InputLabel>
                                        <Select
                                            label="Genêro"
                                            labelId="gender-label"
                                            value={selectedGender}
                                            onChange={handleGenderChange}
                                        >
                                            <MenuItem value="">Selecione um genêro</MenuItem>
                                            <MenuItem value="Cisgênero">Cisgênero</MenuItem>
                                            <MenuItem value="Transgênero">Transgênero</MenuItem>
                                            <MenuItem value="Não-Binário">Não-Binário</MenuItem>
                                            <MenuItem value="Agênero">Agênero</MenuItem>
                                            <MenuItem value="Genderqueer">Genderqueer</MenuItem>
                                            <MenuItem value="Genderfluid">Genderfluid</MenuItem>
                                            <MenuItem value="Bigênero">Bigênero</MenuItem>
                                            <MenuItem value="Demigênero">Demigênero</MenuItem>
                                            <MenuItem value="Masculino">Masculino</MenuItem>
                                            <MenuItem value="Feminino">Feminino</MenuItem>
                                            {/* Adicione mais opções conforme necessário */}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="row-register">
                                    <TextField
                                        id="filled-basic"
                                        label="Email"
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
                                        required
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
                                        required
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
                                        required
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
                                <Button 
                                        variant="contained"
                                        type="submit"
                                        color="success" 
                                        sx={{ 
                                            width:"20%",
                                            position:"absolute",
                                            right: "1rem",
                                            bottom:"5rem"
                                        }}
                                        onClick={handleRegister}
                                >
                                    Cadastrar
                                </Button>
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
                    </form>
                </div>
                </>
            )}
            {savedProfile && (
                <div className="profile-details">
                    Bem-vindo(a), {savedProfile.profileName}!
                    <Button onClick={handleLogout} variant="outlined" color="primary">Logoff</Button>
                </div>
            )}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>

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

export default Profile;