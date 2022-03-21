import {createContext, useReducer } from "react";
import gitHubReducer from "./GitHubReducer";


const GitHubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(gitHubReducer, initialState)


    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const {items} = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }


    const handleClear = (e) => {
        e.preventDefault();

        dispatch({
            type: 'GET_USERS',
            payload: []
        })
    }

    const setLoading = () => {
        dispatch({type: 'SET_LOADING'})
    }

    return <GitHubContext.Provider value={{users: state.users, loading: state.loading, searchUsers, handleClear}}>
        {children}
    </GitHubContext.Provider>
}

export default GitHubContext;