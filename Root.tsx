import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./state/hooks";
import AuthPage from "./scenes/auth/AuthPage";
import Home from "./scenes/home/Home";
import {getTokenFromStorage} from "./state/userSlice";
import AuthService from "./services/AuthService";

function Root() {
    const dispatch = useAppDispatch();

    const authenticated = useAppSelector(state => state.user.authenticated);

    useEffect(() => {
        dispatch(getTokenFromStorage());
    }, []);

    return authenticated ? <Home /> : <AuthPage />;
}

export default Root;
