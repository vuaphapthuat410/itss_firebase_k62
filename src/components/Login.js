import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

/* ライブラリ */
import { firebase, auth, uiConf } from "../lib/firebase";

function Login() {
  return (
    <div className="column panel-block">
      <StyledFirebaseAuth uiConfig={uiConf} firebaseAuth={auth} />
    </div>
  );
};

export default Login; 