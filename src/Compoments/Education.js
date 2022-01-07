import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../Styles/Experience.css';
import UserContext from '../Context/UserContext';
import UIContext from '../Context/UIContext';
import { deleteCall } from '../Server/APIRequests';


function Education({id, school, degree, fieldOfStudy, startDate, endDate, grade, logoUrl, location, isLogin}) {
    const { User, dispatch, setUpdateData } = useContext(UserContext);
    const { UI, setUI} = useContext(UIContext);
    const handleDelete = () => {
        deleteCall(`/Educations/${id}`)
        .then(message => {
            console.log(message);
        })
        .then(() => {
            dispatch({type: 'REMOVE_USERDATA', name: 'Educations', id, idName: 'educationId'});
        })
        .catch( err => console.log(err.response.data));
    }
    const handleEdit = () => {
        setUpdateData(User.Educations.find(data => data.educationId === id));
        setUI({...UI, isModelOpen: true, modelType: 'education' , isUpdateModel: true});
    }
    return (
        <div className="experience">
            <img 
                className="logo"
                src={logoUrl}
                alt="Company Logo"
            />
           <div className="experience_details">
               <h3>{school}</h3>
               <p>{location}</p>
               <h4>{`${degree},${fieldOfStudy},${grade}`}</h4>
               <p>{`${startDate}-${endDate}`}</p>
           </div>
           {isLogin && <div className="edit_delete_buttons">
                <button onClick={handleDelete}><DeleteIcon /></button>
                <button onClick={handleEdit}><EditIcon /></button>
            </div>}
        </div>
    )
}

export default Education
