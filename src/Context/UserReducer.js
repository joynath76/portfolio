

const UserReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_PROJECT':
            return {...state,Projects: [...state.Projects,{ ...action.Data, projectId: action.projectId }]};
        case 'ADD_EDUCATION':
            return {...state,Educations: [...state.Educations,{ ...action.Data, educationId: action.educationId }]};
            case 'ADD_EXPERIENCE':
            return {...state,Experiences: [...state.Experiences,{ ...action.Data, experienceId: action.experienceId }]};
            case 'ADD_OTHER':
            return {...state,Others: [...state.Others,{ ...action.Data, otherId: action.otherId }]};
        case 'SET_USERDATA':
            return action.data;
        case 'REMOVE_USERDATA':
            return {...state, [action.name]: state[action.name].filter(data => data[action.idName] !== action.id)};
        case 'UPDATE_USERDATA':
            return {...state, [action.name]: state[action.name].map(data => data[action.idName] === action.id ? action.value : data)}
        default:
            return state;
    }
}
export default UserReducer;