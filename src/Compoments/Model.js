import React, { useContext } from 'react';
import '../Styles/Model.css';
import AddProject from '../Compoments/AddProject';
import AddExperince from '../Compoments/AddExperience';
import AddEducation from '../Compoments/AddEducation';
import AddOther from '../Compoments/AddOther';
import Login from '../Compoments/Login';
import Signup from './Signup';
import UIContext from '../Context/UIContext';

function Model({ modelType }) {
    const { UI } = useContext(UIContext);
    const headers = {
        login: 'login',
        signup: 'create new account'
    }
    return (
        <div className="model">
            <div className="model_box">
                <h2>{modelType === "login" || modelType === "signup" ? headers[modelType] : UI.isUpdateModel ? `UPDATE ${modelType}` 
                :`ADD ${modelType}`}</h2>
                <div className="model_content">
                    { modelType === "project" ? <AddProject /> :
                    modelType === "experience" ? <AddExperince /> :
                    modelType === "education" ? <AddEducation /> :
                    modelType === "other" ? <AddOther /> : 
                    modelType === "login" ? <Login /> : 
                    modelType === "signup" ? <Signup /> : null}
                    
                </div>
            </div>
        </div>
    )
}

export default Model;
