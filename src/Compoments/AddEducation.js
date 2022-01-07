import React, { useState, useContext, useEffect } from 'react';
import '../Styles/AddEducation.css';
import UserContext from '../Context/UserContext';
import BackupIcon from '@material-ui/icons/Backup';
import UIContext from '../Context/UIContext';
import { uploadFile, postCall } from '../Server/APIRequests';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CircularProgress } from '@material-ui/core';

function AddEducation() {
    const { updateData, dispatch } = useContext(UserContext);
    const { UI, setUI } = useContext(UIContext);
    const [Data, setData] = useState({
        school: "",
        logoUrl: "",
        fieldOfStudy: "",
        degree: "",
        startDate: "",
        endDate: "",
        grade: ""
    })
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
        formData.append('file',file,file.name)
        uploadFile(formData)
        .then(url => {
            setData({...Data,logoUrl : url});
            setLoading({...loading, isLogo: false});
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading({...loading, isButton: true});
        const routePath = UI.isUpdateModel ? `/Educations/update/${Data.educationId}` : '/Educations';
        postCall(routePath, Data)
        .then(data => {
            UI.isUpdateModel ? dispatch({type: 'UPDATE_USERDATA', id: Data.educationId, idName: 'educationId', name: 'Educations', value: Data}) :
            dispatch({type: 'ADD_EDUCATION', educationId : data.educationId, Data});
            setLoading({...loading, isButton: false});
        })
        .then(() => setUI({...UI, isModelOpen: false}))
        .catch(err => console.error(err.response.data));
    }
    useEffect(() => {
        if(UI.isUpdateModel) return setData({...Data,...updateData});
    }, [UI.isUpdateModel,updateData])
    return (
        <div className="addEducation">
            <form>
                {/* school */}
                <div>
                    <label 
                    className={ Data.school.trim() !== '' ? "place_label" : ""}
                    >school</label>
                    <input 
                        type="school" 
                        name="school" 
                        value={Data.school}
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
                            left: "18%"
                        }} 
                    />}
                </div>
                {/* fieldOfStudy */}
                <div>
                    <label 
                    className={Data.fieldOfStudy.trim() !== '' ? "place_label" : ""}
                    >Field Of Study (ex: Computer Science)</label>
                    <input 
                        type="fieldOfStudy" 
                        name="fieldOfStudy"
                        value={Data.fieldOfStudy}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >Must not be empty</label>
                </div>
                {/* Grade */}
                <div>
                    <label 
                    className={Data.grade.trim() !== '' ? "place_label" : ""}
                    >Grade</label>
                    <input 
                        type="text" 
                        name="grade"
                        value={Data.grade}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >Must not be empty</label>
                </div>
                <div>
                    <label 
                    className={Data.degree.trim() !== '' ? "place_label" : ""}
                    >Degree</label>
                    <input 
                        type="text" 
                        name="degree"
                        value={Data.degree}
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
                {/* Add Button */}
                <div>
                    <button type="submit" onClick={handleSubmit}>ADD</button>
                    {loading.isButton && <CircularProgress size={25} 
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "42%"
                        }} 
                    />}
                </div>
            </form>
            
        </div>
    )
}

export default AddEducation
