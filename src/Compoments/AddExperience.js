import React, { useState, useContext, useEffect } from 'react';
import '../Styles/AddExperience.css';
import UserContext from '../Context/UserContext';
import BackupIcon from '@material-ui/icons/Backup';
import UIContext from '../Context/UIContext';
import { uploadFile, postCall } from '../Server/APIRequests';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CircularProgress } from '@material-ui/core';

function AddExperience() {
    const { updateData, dispatch } = useContext(UserContext);
    const { UI, setUI } = useContext(UIContext);
    const [Data, setData] = useState({
        title: "",
        employeType: "",
        logoUrl: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
    });
    const [loading, setLoading] = useState({
        isLogo: false,
        isButton: false
    });
    const handleChange = (event) => {
        setData({...Data,[event.target.name] : event.target.value});
    }
    
    const handleUpload = (event) => {
        setLoading({...loading, isLogo: true});
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file',file,file.name);
        uploadFile(formData)
        .then(url => {
            setData({...Data,logoUrl : url});
            setLoading({...loading, isLogo: false});
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading({...loading, isButton: true});
        const routePath = UI.isUpdateModel ? `/Experiences/update/${Data.experienceId}` : '/Experiences';
        postCall(routePath, Data)
        .then(data => {
            UI.isUpdateModel ? dispatch({type: 'UPDATE_USERDATA', id: Data.experienceId, idName: 'experienceId', name: 'Experiences', value: Data}) :
            dispatch({type: 'ADD_EXPERIENCE', experienceId : data.experienceId, Data});
            setLoading({...loading, isButton: false});
        })
        .then(() => setUI({...UI, isModelOpen: false}))
        .catch(err => console.error(err.response.data));
    }
    useEffect(() => {
        if(UI.isUpdateModel) return setData({...Data,...updateData});
    }, [UI.isUpdateModel,updateData])
    return (
        <div className="addExperience">
            <form>
                {/* title */}
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
                {/* Logo url */}
                <div>
                    <input 
                    type="file" 
                    name="logoUrl" 
                    id="logoUrl" 
                    accept="image/*"
                    onChange={handleUpload}
                    hidden
                    />
                    <label
                    className="uploadLabel"
                    htmlFor="logoUrl"
                    >{Data.logoUrl === "" ? <BackupIcon /> : <CheckCircleIcon /> } Upload Logo</label>
                    {loading.isLogo && <CircularProgress size={25} 
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "22%"
                        }} 
                    />}
                </div>
                {/* Employment Type */}
                <div>
                    <label 
                    className={ Data.employeType.trim() !== '' ? "place_label" : ""}
                    >Employment Type</label>
                    <select name="employeType" onChange={handleChange} >
                        <option ></option>
                        <option value="Full_time" selected={Data.employeType === "Full_time"}>Full_time</option>
                        <option value="Part-time" selected={Data.employeType === "Part-time"}>Part-time</option>
                        <option value="Self-Employed" selected={Data.employeType === "Self-Employed"}>Self-Employed</option>
                        <option value="Freelance" selected={Data.employeType === "Freelance"}>Freelance</option>
                        <option value="Internship" selected={Data.employeType === "Internship"}>Internship</option>
                        <option value="Trainee" selected={Data.employeType === "Trainee"}>Trainee</option>
                    </select>
                </div>
                {/* companyName */}
                <div>
                    <label 
                    className={Data.companyName.trim() !== '' ? "place_label" : ""}
                    >Company Name</label>
                    <input 
                        type="text" 
                        name="companyName"
                        value={Data.companyName}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >Must not be empty</label>
                </div>
                {/* location */}
                <div>
                    <label 
                    className={Data.location.trim() !== '' ? "place_label" : ""}
                    >Location</label>
                    <input 
                        type="text" 
                        name="location"
                        value={Data.location}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >Must not be empty</label>
                </div>
                
                {/* Start Date */}
                <div>
                    <label 
                    className="place_label"
                    >Start Date</label>
                    <input 
                        type="date" 
                        name="startDate"
                        value={Data.startDate}
                        onChange={handleChange} 
                    />
                </div>
                {/* End Date */}
                <div>
                    <label 
                    className="place_label"
                    >End Date</label>
                    <input 
                        type="date" 
                        name="endDate"
                        value={Data.endDate}
                        onChange={handleChange} 
                    />
                </div>
                {/* description */}
                <div>
                    <label 
                    className={Data.description.trim() !== '' ? "place_label" : ""}
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
                {/* Add Button */}
                <div>
                    <button type="submit" onClick={handleSubmit}>ADD</button>
                    {loading.isButton && <CircularProgress size={25} 
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "48%"
                        }} 
                    />}
                </div>
            </form>
        </div>
    )
}

export default AddExperience
