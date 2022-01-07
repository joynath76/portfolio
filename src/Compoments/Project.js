import React, { useContext } from 'react'
import '../Styles/Project.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import { deleteCall } from '../Server/APIRequests';
import UserContext from '../Context/UserContext';
import UIContext from '../Context/UIContext';

function Project({ id, title, imageUrl, videoUrl, description, sourceCodeUrl, liveDemoUrl, isLogin }) {
    const { User, dispatch, setUpdateData } = useContext(UserContext);
    const { UI, setUI} = useContext(UIContext);
    const handleDelete = () => {
        deleteCall(`/Projects/${id}`)
        .then(message => {
            console.log(message);
        })
        .then(() => {
            dispatch({type: 'REMOVE_USERDATA', name: 'Projects', id: id, idName: 'projectId'});
        })
        .catch( err => console.log(err.response.data));
    }
    const handleEdit = () => {
        setUpdateData(User.Projects.find(data => data.projectId === id));
        setUI({...UI, isModelOpen: true, modelType: 'project' , isUpdateModel: true});
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
                    <div>
                        { sourceCodeUrl ? <a href={sourceCodeUrl} 
                            target="_blank" rel="noopener noreferrer" aria-disabled={true}>Source Code{<LinkIcon />}</a>: null}
                        
                        { liveDemoUrl ? <a href={liveDemoUrl} 
                            target="_blank" rel="noopener noreferrer">Live demo {<LinkIcon />}</a> : null}
                    </div>
                </div>
                {isLogin && <div className="edit_delete_buttons">
                    <button onClick={handleDelete}><DeleteIcon /></button>
                    <button onClick={handleEdit}><EditIcon /></button>
                </div>}
            </div>
            <video
                src={videoUrl}
                controls
            />
            
            
        </div>
    )
}

export default Project
