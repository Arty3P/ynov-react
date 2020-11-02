import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios'

import { Header } from '../components/header'
import { FetchButton } from '../components/fetch/button'
import { FetchInput } from '../components/fetch/input'
import { FetchTable } from '../components/fetch/table'

import './fetch.css'

const initialState = {
    api: "https://randomuser.me/api/?results=",
    data: [],
    success: false,
    pending: false,
    error: false
};

const apiCall = (state, action) => {
    switch (action.type) {
        case 'apiSuccess':
            return {
                ...state,
                data: [...state.data, ...action.data],
                success: true,
                pending: false,
                error: false,
            }
        case 'apiError':
            return {
                ...state,
                success: false,
                pending: false,
                error: true,
            }
        case 'apiPending':
            return {
                ...state,
                pending: true
            }
        case 'clearData':
            return {
                ...state,
                data: []
            }
        default:
            throw new Error();
    }
}

function Fetch() {

    const [filter, setFilter] = useState("")
    const [state, dispatch] = useReducer(apiCall, initialState, undefined);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users'))
        if(users) {
            dispatch({ type: 'apiSuccess', data: users })
        } else {
            fetchUsers(5)
        }
    }, [])

    const clearUsers = () => {
        localStorage.setItem('users', JSON.stringify([]))
        dispatch({ type: 'clearData' })
        fetchUsers(5)
    }

    const fetchUsers = async (nbUsers) => {
        dispatch({ type: 'apiPending' })
        try {
            const { data: { results } } = await axios.get(`${state.api + nbUsers}`)
            let usersList = []
            results.map(res => {
                    return usersList.push({
                        uuid: res.login.uuid,
                        firstname: res.name.first,
                        lastname: res.name.last,
                        email: res.email,
                        cell: res.cell,
                        picture: res.picture
                    });
                }
            )
            dispatch({ type: 'apiSuccess', data: usersList })
            const storageUsers = [...state.data, ...usersList]
            localStorage.setItem('users', JSON.stringify(storageUsers))
        } catch(e) {
            console.error(e)
            dispatch({ type: 'apiError' })
        } finally {
            // success
        }
    }

    const filterUsers = (value) => {
        setFilter(value)
    }

	return(
        <div id="fetch">
            <Header />
            <div className="ui container" style={{ padding: '1rem 0' }}>
                <div className="ui grid stackable">
                    <FetchButton size="two" color="primary" loading={state.pending} onClick={() => fetchUsers(10)} text="FETCH" />
                    <FetchButton size="two" color="red" onClick={() => clearUsers()} text="CLEAR" />
                    <FetchInput size="five" onChange={(e) => filterUsers(e.target.value)} placeholder="Nom de famille ..." />
                </div>
                {state.pending ?
                    <div className="ui message orange">
                        <div className="header">
                            API : LOADING
                        </div>
                    </div>
                :
                    <div className={state.error ? "ui message red" : "ui message green"}>
                        <div className="header">
                            API : {state.error ? "KO" : "OK" }
                        </div>
                    </div>
                }
               <FetchTable
                    users={state.data.filter(data => data.lastname.toUpperCase().includes(filter.toUpperCase()))}
                />
            </div>
        </div>
    )

}

export { Fetch }
