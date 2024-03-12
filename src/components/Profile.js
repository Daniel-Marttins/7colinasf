import React, { useState, useEffect } from "react";
import '../styles/Profile.css';
import ProfileLogin from "./ProfileLogin";
import ProfileRegister from "./ProfileRegister";
import ProfileDetails from "./ProfileDetails";
import Button from '@mui/material/Button';

const Profile = ({ onDataReload }) => {
    const [savedProfile, setSavedProfile] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const savedProfileString = localStorage.getItem('profile');
        if (savedProfileString) {
            const savedProfile = JSON.parse(savedProfileString);
            setSavedProfile(savedProfile);
        }
    }, []);

    const handleTabClick= (index) => {
        setActiveTab(index);
        setTimeout(() => {
            if(index == 1) {
            alert('Preencha todos os campos com (*) para liberar o botão de cadastro!');
            }
        }, 200);
    };

    const handleLogout = () => {
        setSavedProfile(null);
    };

    return (
        <div className="main-profile">
            {!savedProfile && (
                <>
                <div className={activeTab === 0 ? "profile-presentation show-options active" : "profile-presentation"}>
                    <ProfileLogin setSavedProfile={setSavedProfile} setTabClick={handleTabClick} />
                </div>
                <div className={activeTab === 1 ? "profile-presentation active" : "profile-presentation"}>
                    <ProfileRegister setTabClick={handleTabClick} onDataReload={onDataReload} />
                </div>
                </>
            )}
            {savedProfile && (
                <div className="profile-details">
                    < ProfileDetails logout={handleLogout} profile={savedProfile} />
                </div>
            )}
        </div>
    );
        
}

export default Profile;