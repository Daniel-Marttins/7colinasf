import React, { useState } from 'react';
import '../styles/ProfilePopup.css'

const ProfilePopup = ({ open, onClose }) => {

    const handleClosePopup = () => {
        onClose(false);
    };

    return (
        <div className='main-popup' onClick={handleClosePopup}>
            <div className='card-register'>

            </div>
        </div>
    );
};

export default ProfilePopup;
