import React, {useState} from "react";


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: ()=>{},
    onLogIn: (email,password)=>{}
});

export const AuthContextProvider = (props)=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    
    const logouthandler = ()=>{
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };
    const loginHandler = ()=>{
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogOut: logouthandler, onLogIn: loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;