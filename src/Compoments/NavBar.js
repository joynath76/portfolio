import React, { useContext } from 'react'
import '../Styles/NavBar.css'
import UIContext from '../Context/UIContext'

function NavBar() {
    const { UI, setUI} = useContext(UIContext);
    return (
        <div className="navbar">   
            <nav className="nav">
                <ul>
                    <li onClick={() => setUI({...UI,buttonType: "Project"})} className={UI.buttonType === "Project" ? "active" : ""}>
                        Projects
                    </li>
                    <li onClick={() => setUI({...UI,buttonType: "Experience"})} className={UI.buttonType === "Experience" ? "active" : ""}>
                        Experiences
                    </li>
                    <li onClick={() => setUI({...UI,buttonType: "Education"})} className={UI.buttonType === "Education" ? "active" : ""}>
                        Educations
                    </li>
                    <li onClick={() => setUI({...UI,buttonType: "Other"})} className={UI.buttonType === "Other" ? "active" : ""}>
                        Others
                    </li>  
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
