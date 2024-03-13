import React, { useState, useEffect } from "react";
import '../styles/Profile.css';
import ProfileLogin from "./ProfileLogin";
import ProfileRegister from "./ProfileRegister";
import ProfileDetails from "./ProfileDetails";
import { loadLoggedUser, clearLoggedUser } from "./userUtils";

const Profile = ({ onDataReload }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const profile = loadLoggedUser();
        setLoggedUser(profile);
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
        clearLoggedUser(); 
        setLoggedUser(null);
    };

    return (
        <div className="main-profile">
            {!loggedUser && (
                <>
                <div className={activeTab === 0 ? "profile-presentation show-options active" : "profile-presentation"}>
                    <ProfileLogin setSavedProfile={setLoggedUser} setTabClick={handleTabClick} />
                </div>
                <div className={activeTab === 1 ? "profile-presentation active" : "profile-presentation"}>
                    <ProfileRegister setTabClick={handleTabClick} onDataReload={onDataReload} />
                </div>
                </>
            )}
            {loggedUser && (
                <div className="profile-details">
                    < ProfileDetails logout={handleLogout} loggedProfile={loggedUser} />
                </div>
            )}
        </div>
    );
        
}

export default Profile;