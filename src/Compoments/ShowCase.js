import React, { useContext, useEffect, useRef } from 'react';
import '../Styles/Showcase.css';
import Project from './Project';
import Experience from './Experience';
import Education from './Education';
import Model from './Model';
import UIContext from '../Context/UIContext';
import UserContext from '../Context/UserContext';
import Other from './Other';

function ShowCase({ isLogin }) {
    const PROJECT_BUTTON = "project";
    const EXPERIENCE_BUTTON = "experience";
    const EDUCATION_BUTON = "education";
    const OTHER_BUTTON = "other";

    const handleClick = (button) => {
        switch(button){
            case PROJECT_BUTTON:
                setUI({...UI,modelType: PROJECT_BUTTON,isModelOpen: true});
                break;
            case EXPERIENCE_BUTTON:
                setUI({...UI,modelType: EXPERIENCE_BUTTON,isModelOpen: true});
                break;
            case EDUCATION_BUTON:
                setUI({...UI,modelType: EDUCATION_BUTON,isModelOpen: true});
                break;
            case OTHER_BUTTON:
                setUI({...UI,modelType: OTHER_BUTTON,isModelOpen: true});
                break;
            default:
                setUI({...UI,isModelOpen: false});
        }
    };
    window.addEventListener('click', (e) => {
        if(e.target === document.getElementsByClassName("model")[0]){
            setUI({...UI,isModelOpen: false});
        }
        
    });
    const { UI, setUI } = useContext(UIContext);
    const refElement = useRef(null);
    const { User } = useContext(UserContext);
    const scrollToRef = () => {
        if (refElement.current !== null)
            return window.scrollTo(0, refElement.current.offsetTop + 500)};
    useEffect(() => {
        scrollToRef();
    }, [UI.buttonType])
    
    return (
        <div className="showcasee" >
            <div id="Projects"  
                onMouseOver={() => setUI({...UI,buttonType: "Project"})}>
                <div className="showcase_items_title">
                    <h1>Projects</h1>
                    {isLogin && <span onClick={() => handleClick("project")}>ADD</span>}
                </div>
                <div  className="showcase_items" ref={UI.buttonType === "Project" ? refElement : null}>
                    {!User.Projects?console.log("loading") : User.Projects.map(project => {
                        return (
                            <Project 
                            key = {project.projectId}
                            id = {project.projectId}
                            title= {project.title}
                            imageUrl={project.imageUrl}
                            videoUrl={project.videoUrl}
                            description={project.description}
                            sourceCodeUrl={project.sourceCodeUrl} 
                            liveDemoUrl={project.liveDemoUrl}
                            isLogin = {isLogin}
                        />
                        )
                    })}
                </div>  
            </div>
            <div id="Experiences" ref={UI.buttonType === "Experience" ? refElement : null}
                onMouseOver={() => setUI({...UI,buttonType: "Experience"})}>
                <div className="showcase_items_title">
                    <h1>Experiences</h1>
                    {isLogin && <span onClick={() => handleClick("experience")}>ADD</span>}
                </div>
                <div className="showcase_items">
                    {!User.Experiences?console.log("loading") : User.Experiences.map(experience => {
                        return (
                            <Experience 
                            key={experience.experienceId}
                            id={experience.experienceId}
                            title= {experience.title}
                            companyName={experience.companyName}
                            employmentType={experience.employeType}
                            startDate={experience.startDate}
                            endDate={experience.endDate}
                            location={experience.location}
                            description={experience.description}
                            logoUrl={experience.logoUrl}
                            isLogin = {isLogin}
                        />
                        )
                    })}
                </div>  
            </div>
            <div id="Educations" ref={UI.buttonType === "Education" ? refElement : null}
                onMouseOver={() => setUI({...UI,buttonType: "Education"})} >
                <div className="showcase_items_title">
                    <h1>Educations</h1>
                    {isLogin && <span onClick={() => handleClick("education")}>ADD</span>}
                </div>
                <div  className="showcase_items">
                {!User.Educations?console.log("loading") : User.Educations.map(education => {
                    return (
                        <Education 
                        key={education.educationId}
                        id={education.educationId}
                        school= {education.school}
                        degree={education.degree}
                        fieldOfStudy={education.fieldOfStudy}
                        startDate={education.startDate}
                        endDate={education.endDate}
                        grade={education.grade}
                        location={education.location}
                        logoUrl={education.logoUrl}
                        isLogin = {isLogin}
                    />
                    )
                })}
                </div>  
            </div>
            <div id="Others" ref={UI.buttonType === "Other" ? refElement : null}
                onMouseOver={() => setUI({...UI,buttonType: "Other"})}>
                <div className="showcase_items_title">
                    <h1>Others</h1>
                    {isLogin && <span onClick={() => handleClick("other")}>ADD</span>}
                </div>
                <div className="showcase_items">
                {!User.Others?console.log("loading") : User.Others.map(other => {
                    return (
                        <Other 
                        key={other.otherId}
                        id={other.otherId}
                        imageUrl={other.imageUrl}
                        title={other.title}
                        description={other.description}
                        isLogin = {isLogin}
                    />
                    )
                })}
                </div>  
            </div>
            {UI.isModelOpen ? <Model modelType={UI.modelType} /> : null}
        </div>
    )
}

export default ShowCase
