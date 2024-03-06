import React from "react";
import '../styles/Presentation.css';
import sample from '../assets/video-praia-1.mp4';
import logo from '../assets/logo.png';
import iconsWhatsapp from '../assets/icons8-whatsapp-100 (1).png';
import iconInstagram from '../assets/icons8-instagram-100.png';

const Presentation = () => {
    return (
        <div className="main-presentation">
            <video className='videoTag' autoPlay loop muted>
                <source src={sample} type='video/mp4' />
            </video>
            <div className="init-text">
                <div className="init-text-logo-text">
                    <h1>
                        7COLINAS
                        <span>Banco de Talentos</span>
                    </h1>
                    <img src={logo}></img>
                </div>
                <div className="social-icons">
                    <a href="https://chat.whatsapp.com/K7ULKHCsQ3W17GE1z99xkj" target="_blank"><img src={iconsWhatsapp}></img></a>
                    <a href="https://instagram.com/comunidadesetecolinas?igshid=MzRlODBiNWFlZA==" target="_blank"><img src={iconInstagram}></img></a>
                </div>
            </div>
        </div>
    );
}

export default Presentation;