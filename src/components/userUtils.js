export const loadLoggedUser = () => {
    const loggedUser = localStorage.getItem('profile');
    if (loggedUser) {
        return JSON.parse(loggedUser);
    } else {
        return null;
    }
}

export const saveLoggedUser = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile));
}

export const clearLoggedUser = () => {
    localStorage.removeItem('profile');
}

export const isUserLoggedIn = () => {
    return !!localStorage.getItem('profile');
}
