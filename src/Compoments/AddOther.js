import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../Context/UserContext';
import '../Styles/AddProject.css';
import BackupIcon from '@material-ui/icons/Backup';
import UIContext from '../Context/UIContext';
import { uploadFile, postCall } from '../Server/APIRequests';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CircularProgress } from '@material-ui/core/';

function AddOther() {

    const { dispatch, updateData } = useContext(UserContext);
    const { UI, setUI } = useContext(UIContext);
    const [Data, setData] = useState({
        title : "",
        description : "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState({
        isImage: false,
        isButton: false
    });
    const handleChange = (event) => {
        setData({...Data,[event.target.name] : event.target.value});
    }
    
    const handleUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file',file,file.name)
        setLoading({...loading, isImage: true});
        uploadFile(formData)
        .then(url => {
            setData({...Data,imageUrl : url});
            setLoading({...loading, isImage: false});
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading({...loading, isButton: true});
        const routePath = UI.isUpdateModel ? `/Others/update/${Data.otherId}` : '/Others';
        postCall(routePath, Data)
        .then(data => {
            UI.isUpdateModel ? dispatch({type: 'UPDATE_USERDATA', id: Data.otherId, idName: 'otherId', name: 'Others', value: Data}) :
            dispatch({type: 'ADD_OTHER', otherId : data.otherId, Data});
            setLoading({...loading, isButton: false});
        })
        .then(() => setUI({...UI, isModelOpen : false, isUpdateModel: false}))
        .catch(err => console.error(err.response));
    }
    useEffect(() => {
        if(UI.isUpdateModel) return setData({...Data,...updateData});
    }, [UI.isUpdateModel,updateData])
    return (
        <div className="addProject"> 
            
            <form>
                {/* Title */}
                <div>
                    <label 
                    className={ Data.title.trim() !== '' ? "place_label" : ""}
                    >Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={Data.title}
                        onChange={handleChange}
                    />
                    <label 
                    className="error_label"
                    >Must not be empty</label>
                </div>
                {/* description */}
                <div>
                    <label 
                    className={ Data.description.trim() !== '' ? "place_label" : ""}
                    >Description</label>
                    <textarea 
                        rows="5"
                        type="text" 
                        name="description" 
                        value={Data.description}
                        onChange={handleChange}
                    />
                    <label 
                    className="error_label"
                    >Must not be empty</label>
                </div>
                
                <div>
                    <input 
                    type="file" 
                    name="imageUrl"
                    id="image_file" 
                    accept="image/*" 
                    onChange={handleUpload}
                    hidden
                    />
                    <label
                    className="uploadLabel"
                    htmlFor="image_file"
                    >{Data.imageUrl === "" ? <BackupIcon /> : <CheckCircleIcon /> } Upload Project Image</label>
                    {loading.isImage && <CircularProgress size={25} 
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "35%"
                        }} 
                    />}
                </div>
                
                <div>
                    <button onClick={handleSubmit}>{UI.isUpdateModel ? 'UPDATE' : 'ADD'}</button>
                    {loading.isButton && UI.isUpdateModel && <CircularProgress size={25} 
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "48%"
                        }} 
                    />}
                    {loading.isButton && !UI.isUpdateModel && <CircularProgress size={25} 
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "43%"
                        }} 
                    />}
                </div>
            </form>
        
        </div>
    )
}

export default AddOther
