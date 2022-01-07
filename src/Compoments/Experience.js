import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../Styles/Experience.css';
import UserContext from '../Context/UserContext';
import UIContext from '../Context/UIContext';
import { deleteCall } from '../Server/APIRequests';

function Experience({id, title, companyName, employmentType, startDate, endDate, location, description, logoUrl, isLogin}) {
    const { User, dispatch, setUpdateData } = useContext(UserContext);
    const { UI, setUI} = useContext(UIContext);
    const handleDelete = () => {
        deleteCall(`/Experiences/${id}`)
        .then(message => {
            console.log(message);
        })
        .then(() => {
            dispatch({type: 'REMOVE_USERDATA', name: 'Experiences', id: id, idName: 'experienceId'});
        })
        .catch( err => console.log(err.response.data));
    }
    const handleEdit = () => {
        setUpdateData(User.Experiences.find(data => data.experienceId === id));
        setUI({...UI, isModelOpen: true, modelType: 'experience' , isUpdateModel: true});
    }
    return (
        <div className="experience">
            <img 
                className="logo"
                src={logoUrl}
                alt="Company Logo"
            />
           <div className="experience_details">
                <h3>{title}</h3>
                <h4>{companyName+'.'+ employmentType}</h4>
                <p>{`${startDate}-${endDate}`}</p>
                <p>{location}</p>
                <br />
                <p>{description}</p>
           </div>
           {isLogin && <div className="edit_delete_buttons">
                <button onClick={handleDelete}><DeleteIcon /></button>
                <button onClick={handleEdit}><EditIcon /></button>
            </div>}
        </div>
    )
}

export default Experience;
