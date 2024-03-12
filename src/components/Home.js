import React, { useState, useEffect } from "react";
import { fetchData } from '../api/api'; 
import '../styles/Home.css';
import Presentation from './Presentation';
import Talents from "./Talents";
import Profile from "./Profile";

const Home = () => {

    const [data, setData] = useState(null);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const dataApi = await fetchData();
                setData(dataApi);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };
        getData();
    }, []);

    const handleDataReload = async () => {
        try {
            const dataApi = await fetchData();
            setData(dataApi);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const handleButtonClick = (index) => {
        setActiveSection(index);
    };
    
    return(
        <div className="main-home">

            {/* ---------- HOME SECTION ----------  */}

            <section className={activeSection === 0 ? "active" : ""}>
                <Presentation />
            </section>

            {/* ---------- TALENT SECTION ----------  */}

            <section className={activeSection === 1 ? "active" : ""}>
                <Talents data={data}/>
            </section>

            {/* ---------- PROFILE SECTION ----------  */}

            <section className={activeSection === 2 ? "active" : ""}>
                <Profile onDataReload={handleDataReload} />
            </section>


            <div className="line-buttons">
                <button onClick={() => handleButtonClick(0)}>Inicio<span className="material-symbols-outlined">home</span></button>
                <button onClick={() => handleButtonClick(1)}>Talentos<span className="material-symbols-outlined">group</span></button>
                <button onClick={() => handleButtonClick(2)}>Perfil<span className="material-symbols-outlined">person</span></button>
            </div>

        </div>
    );
}

export default Home;