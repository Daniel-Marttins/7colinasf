import React, { useState, useEffect } from "react";
import '../styles/Profile.css';
import { profileLogin } from '../api/api'; 
import ManegerImage from '../assets/Computer login-rafiki.png';
import Button from '@mui/material/Button';
import { TextField, Avatar, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/joy/Divider';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [savedProfile, setSavedProfile] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [activeRegisterTab, setActiveRegisterTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState(null);

    useEffect(() => {
        const savedProfileString = localStorage.getItem('profile');
        if (savedProfileString) {
            const savedProfile = JSON.parse(savedProfileString);
            setSavedProfile(savedProfile);
        }
    }, []);

    const [formData, setFormData] = useState({
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePDFChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedPDF(file);
        }
    };

    const handleAddExperience = () => {
        // Adicionar uma nova experiência profissional ao estado
    };

    const handleAddEducation = () => {
        // Adicionar uma nova educação ao estado
    };

    const handleAddSkill = () => {
        // Adicionar uma nova habilidade ao estado
    };

    const handleRegister = () => {
        // Enviar os dados do formulário para a API
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
                                        >
                                            <MenuItem value="">Selecione um genêro</MenuItem>
                                            <MenuItem value="Tecnologia da Informação">Tecnologia da Informação</MenuItem>
                                            <MenuItem value="Saúde">Saúde</MenuItem>
                                            <MenuItem value="Engenharia">Engenharia</MenuItem>
                                            <MenuItem value="Educação">Educação</MenuItem>
                                            {/* Adicione mais opções conforme necessário */}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="row-register">
                                    <TextField
                                        id="filled-basic"
                                        label="Email"
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
                                <div className="row-register"></div>         
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
                                    Detalhes do Perfil
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
        </div>
    );
        
}

export default Profile;