import React, { createContext, useState } from 'react';

const UIContext = createContext();
export function UIProvider(props) {
    const [UI, setUI] = useState({
        modelType: "login",
        buttonType: "",
        isModelOpen: false,
        isUpdateModel: false
    });
    
    
    return (
        <UIContext.Provider value={
            {
                UI,
                setUI
            }
        }>
            {props.children}
        </UIContext.Provider>
    )
}

export default UIContext;
