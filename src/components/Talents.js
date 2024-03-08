import React, { useState, useEffect } from "react";
import '../styles/Talents.css';
import { Pagination, PaginationItem, Snackbar, TextField, Drawer, List, ListItem, ListItemText} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import noData from '../assets/Online world-pana.png';
import Alert from '@mui/material/Alert';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';

 
const Talents = ({ data }) => {
    const itemsPerPage = 10; 

    const [page, setPage] = useState(1);
    const [searchTag, setSearchTag] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState('');
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        if (!loading) return;

        const timer = setTimeout(() => {
            if (searchTag.trim() === '') {
                setFilteredData(null);
                setLoading(false); 
                return;
            }
            const filtered = data.filter(perfil => perfil.profileTag === searchTag);
            if (filtered.length === 0) {
                setShowSnackbar(true); // Mostra o Snackbar se nenhum usuário for encontrado
            } else {
                setFilteredData(filtered);
            }
            setLoading(false);
        }, 1000); 

        return () => clearTimeout(timer);
    }, [loading, searchTag, data]);

    useEffect(() => {
        if (data) {
            const uniqueAreas = [...new Set(data.map(perfil => perfil.profileOccupationArea))];
            setAreas(uniqueAreas);
        }
    }, [data]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleSearch = () => {
        setLoading(true); 
    };

    const handleInputBlur = () => {
        if (searchTag.trim() === '') {
            setFilteredData(null);
        }
    };
    
    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    const handleClearInput = () => {
        setSearchTag('');
        setLoading(true);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleClearAreaFilter = () => {
        setSelectedArea('');
        setFilteredData(null);
        setDrawerOpen(false);
    };

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setDrawerOpen(false); // Fechar o Drawer ao selecionar uma área
        // Filtrar os usuários com base na área selecionada
        const filtered = data.filter(perfil => perfil.profileOccupationArea === area);
        setFilteredData(filtered);
    };

    if (!data) {
        return (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", width:"100%", height:"100%"}}>          
                <img src={noData} style={{ width: "25%", height: "50%"}} /><h2></h2>
                <h2 style={{color:"white", marginBottom:"2rem"}}>Sem dados por aqui...</h2>
                <div className="new-profile-container-no-data">
                    <Button variant="contained" color="success">
                        Cadastrar meu perfil
                    </Button>
                </div>  
            </div>
        );
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const profilesToRender = filteredData || data;

    const firstColumnData = profilesToRender.slice(startIndex, startIndex + Math.ceil(itemsPerPage / 2));
    const secondColumnData = profilesToRender.slice(startIndex + Math.ceil(itemsPerPage / 2), endIndex);

    return(
        <div className="main-talents">  
            <Button 
                onClick={handleDrawerOpen}
                sx={{
                    position: 'absolute',
                    top: '2rem',
                    left:"0",
                    transform: 'translateY(-50%)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#1565c0',
                    fontWeight:"800"
                }}
            >
                <FilterListIcon />
            </Button>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por tag"
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    onBlur={handleInputBlur}
                />
                {searchTag && (
                    <button
                        style={{
                            position: 'absolute',
                            right: '30%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#1565c0',
                            fontWeight:"800"
                        }}
                        onClick={handleClearInput}
                    >
                        X
                    </button>
                )}
                <Button variant="contained" onClick={handleSearch}>
                    Pesquisar
                </Button>
                {loading && <CircularProgress size={20}  />}
            </div>
            <Drawer 
                open={drawerOpen} 
                onClose={handleDrawerClose}
            >
                <List sx={{ 
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"start",
                    flexDirection:"column",
                    width: 300, 
                    height:"100%", 
                    background:"white", 
                    color:"blue"
                    }}>
                    <h3 style={{color:"black", marginBottom:"1rem"}}>Areas de Atuações</h3>
                    {areas.map((area, index) => (
                    <ListItem 
                        key={index} 
                        sx={{
                            display:"flex", 
                            alignItems:"center", 
                            justifyContent:"center",
                            width:"90%",
                            height:"8%",
                            cursor:"pointer",
                            border:"1px solid blue",
                            margin:"5px",
                            borderRadius:"5px"
                        }} 
                        onClick={() => handleAreaSelect(area)}
                    >
                            <ListItemText primary={area} />
                            {selectedArea === area && (
                                <Button onClick={(e) => { e.stopPropagation(); handleClearAreaFilter(); }} style={{color: 'white'}}>
                                    <ClearIcon sx={{color:"blue"}}/>
                                </Button>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className="content-container">
                <div className="column">
                    {/* Renderizando os perfis na primeira coluna */}
                    {firstColumnData.map((perfil, index) => (
                        <div className="card-profile" key={index}>
                            <Avatar
                                alt={perfil.profileName}
                                src={perfil.profileImage}
                                sx={{ width: 78, height: 76 }}
                            />
                            <h2>{perfil.profileName}</h2>
                            <p>{perfil.profileProfession}</p>
                            <span title="Tag do Perfil">#{perfil.profileTag}</span>
                            <div className="profile-actions">
                                <a href={`#details@${perfil.profileName}`}><VisibilityIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                                <a href={`https://api.whatsapp.com/send?phone=${perfil.profilePhoneNumber}`} target="_blank"><WhatsAppIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                                <a href={perfil.profileInstagram} target="_blank"><InstagramIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                                <a href={perfil.profileLinkedin} target="_blank"><LinkedInIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                            </div>
                            {/* Adicione outras informações de perfil conforme necessário */}
                        </div>
                    ))}
                </div>
                <div className="column">
                    {/* Renderizando os perfis na segunda coluna */}
                    {secondColumnData.map((perfil, index) => (
                        <div className="card-profile" key={index}>
                            <Avatar
                                alt={perfil.profileName}
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 78, height: 76 }}
                            />
                            <h2>{perfil.profileName}</h2>
                            <p>{perfil.profileProfession}</p>
                            <span title="Tag do Perfil">#{perfil.profileTag}</span>
                            <div className="profile-actions">
                                <a href={`#details@${perfil.profileName}`}><VisibilityIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                                <a href={`https://api.whatsapp.com/send?phone=${perfil.profilePhoneNumber}`} target="_blank"><WhatsAppIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                                <a href={perfil.profileInstagram} target="_blank"><InstagramIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                                <a href={perfil.profileLinkedin} target="_blank"><LinkedInIcon sx={{marginRight: "0.3rem", cursor: "pointer"}}/></a>
                            </div>
                            {/* Adicione outras informações de perfil conforme necessário */}
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(profilesToRender.length / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            component="div"
                            sx={{
                                display: "flex",
                                margin: '2px',
                                padding: '5px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                color: "white",
                                height: "100%",
                                flexDirection: "column"
                            }}
                        />
                    )}
                />
            </div>
            <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Nenhum usuário encontrado com essa tag.
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Talents;