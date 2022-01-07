import React from 'react';
import './App.css';
import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom';
import Portfolio from './Compoments/Portfolio';
import { UIProvider } from './Context/UIContext';
import { UserContextProvider } from './Context/UserContext';
import Model from './Compoments/Model';
import jwtDecode from 'jwt-decode';


function App() {

  
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if(token){
      const decodeToken = jwtDecode(token);
      if(decodeToken.exp * 1000 > Date.now()){
        return true;
      }
    }
    return false;
  }
  
  return (
    <UserContextProvider>
      <UIProvider>
        <BrowserRouter>
          <div className="app">
            <Switch>
              <Route path="/profile/:userHandle">
                <Portfolio isLogin={checkLogin}/>
              </Route>
              <Route path="/profile">
                <Portfolio isLogin={checkLogin}/>
              </Route>
              <Route path="/signup">
                <Model modelType="signup" />
              </Route>
              <Route path="/">
                { () => checkLogin() ? <Redirect to="/profile" /> : <Model modelType="login" />} 
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </UIProvider>
    </UserContextProvider>
  );
}

export default App;
