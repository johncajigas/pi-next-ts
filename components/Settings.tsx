import React, { useContext,useState } from 'react';
import IconButton from './IconButton';
import { AlertContext, ThemeContext } from '../context/context';
import Trail from './Trail';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Image from 'next/image';
interface SettingsProps {
    visibility:boolean
}
export default function Settings({visibility}:SettingsProps):JSX.Element {
    const themeCtx = useContext(ThemeContext);
    const alertCtx = useContext(AlertContext);
    const {user} = useUser();
    const router = useRouter();
    const [wsConnection,setWsConnection] = useState(true);
   
    function themeChange(): void {
        themeCtx.update(themeCtx.state === 'dark' ? 'light' : 'dark');
    }
    const connectWS = () =>{
        setWsConnection(!wsConnection);
    }
    function loginOrLogout(){
        alertCtx.update({
            title:user ? 'Log Out' : 'Log In',
            actionLabel:user? 'Logout' : 'login',
            action:handleAccount,
            content:user ? <>
                <Image src={user.picture || ""} width={50} height={50}/>
                <p>You are currently logged in as {user.email}.</p> 
                </> 
            : <>You are not logged in. Click login to proceed.</>
        })
    }
    const handleAccount = () =>{
        if(user){
            router.push('/api/auth/logout')
        } else {
            router.push(`/api/auth/login?returnTo=${router.asPath}`)
        }
    }
    
    return (
    <Trail 
                open={visibility}
                to={{ opacity:visibility ? 1 : 0,
                    y: visibility ? 0 : -75}}
                from={{opacity:0,y:-75}}
            >
        <IconButton
            key={"themechange"}
            onClick={themeChange}
            icon={`${themeCtx.state === 'dark' ? 'dark' :'light'}_mode`}
            label='Change Theme'

        />
        <IconButton
            key={"websocketconnection"}
            onClick={connectWS}
            icon={wsConnection ? 'check_circle_outline' : 'warning'}
            label="WS Connection"
            status={wsConnection ? 'success' : 'warning'}
        />
        <IconButton
            key={"user"}
            onClick={loginOrLogout}
            icon={'account_circle'}
            label="Account"
            status={user ? 'success' : 'warning'}
        />
    </Trail>
    )
}

