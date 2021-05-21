import React, { useEffect, useState } from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';

import Login from "./components/Login";

import UploadImg from "./components/UploadImg";

import { auth, storeUserInfo, updateInfo } from "./lib/firebase";

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            setLoading(false);
            let newUser = null;
            if (user) {
                newUser = await storeUserInfo(user);
            }
            setUser(newUser);
        });
    }, []);

    const logout = () => {
        auth.signOut();
    };

    const handleImg = async url => {
    	await updateInfo(user, url);
  	}

    const UserInfo = () => {
        if (user) {
            return (
                <div class="navbar-end">
          	<div class="navbar-item">
            	{user.name}
          	</div>
          	<div class="navbar-item">
          		<UploadImg userImage={user.image} onSletctedImage={handleImg} />
            	<button class="button is-info is-light is-small" onClick={logout} > Logout</button>
          	</div>
        	</div >
            )
        } else {
            return (<Login />)
        }
    }

    return (
        <div className="container is-widescreen">
      		<header class="navbar">
	        	{loading ? (
	          		<p>
	            	WAITING.....
	          	</p>
	        	) : (
	          	<UserInfo />
	        	)}
	      	</header >
	      	<div>
	       		{user && <Todo />}
	      	</div>
    	</div >
    );
}

export default App;