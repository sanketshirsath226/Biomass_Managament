import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logoutUser} from "../services/AuthService";
import {logoutUser as logoutApiUser } from "../action/userAction"

const Logout = ({navigation: { navigate }} ) =>{
        const dispatch = useDispatch()
        useEffect(()=>{
            logoutUser();
            dispatch(logoutApiUser)
                navigate('Login')
        },[])

    return (
            <>
            </>
        )
}
export default  Logout
