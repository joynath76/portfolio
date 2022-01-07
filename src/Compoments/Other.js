import React, { useContext } from 'react'
import '../Styles/Project.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCall } from '../Server/APIRequests';
import UserContext from '../Context/UserContext';
import UIContext from '../Context/UIContext';

function Other({ id, title, imageUrl, description, isLogin }) {
    const { User, dispatch, setUpdateData } = useContext(UserContext);
    const { UI, setUI} = useContext(UIContext);
    const handleDelete = () => {
        deleteCall(`/Others/${id}`)
        .then(message => {
            console.log(message);
        })
        .then(() => {
            dispatch({type: 'REMOVE_USERDATA', name: 'Others', id: id, idName: 'otherId'});
        })
        .catch( err => console.log(err.response.data));
    }
    const handleEdit = () => {
        setUpdateData(User.Others.find(data => data.otherId === id));
        setUI({...UI, isModelOpen: true, modelType: 'other' , isUpdateModel: true});
    }
    return (
        <div className="project">
            <div className="project_details">
                <img 
                src={imageUrl}
                alt="Project" 
                />
                <h3>{title}</h3>
                
                <div className="project_footer">
                <p>{description} 
                </p>
                </div>
                {isLogin && <div className="edit_delete_buttons">
                    <button onClick={handleDelete}><DeleteIcon /></button>
                    <button onClick={handleEdit}><EditIcon /></button>
                </div>}
            </div>
        </div>
    )
}

export default Other;
