import {createContext, useReducer } from "react";
import gitHubReducer from "./GitHubReducer";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


const GitHubContext = createContext();

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(gitHubReducer, initialState)



    //Get Single Users

    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if (response.status === 404) {
            window.location = '/notfound'
        } else {

            const data = await response.json();

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }


    //Get user repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await response.json();

        dispatch({
            type: 'GET_REPOS',
            payload: data
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

    return <GitHubContext.Provider value={{...state, dispatch, handleClear, getUser, getUserRepos}}>
        {children}
    </GitHubContext.Provider>
}

export default GitHubContext;