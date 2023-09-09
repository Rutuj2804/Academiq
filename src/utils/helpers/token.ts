export const getToken = () => {
    return localStorage.getItem(
        `${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`
    );
};
