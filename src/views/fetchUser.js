import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { useHistory, useParams } from "react-router-dom";

import { Header } from '../components/header'
import { FetchButton } from '../components/fetch/button'

function FetchUser() {

    let history = useHistory();
    const [user, setUser] = useState({ uuid: '', firstname: '', lastname: '', picture: '', email: '', cell: '' })
    const { uuid } = useParams()

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users'))
        const user = users.filter(user => user.uuid === uuid)[0]
        setUser(user)
    }, [])

    return(
        <div className="fetch-user">
            <Header />
            <div className="ui container" style={{ padding: '1rem 0' }}>
                <div className="ui grid">
                    <FetchButton size="two" color="orange" loading={false} onClick={() => history.goBack()} text="BACK" />
                </div>
                <div className="ui card fluid">
                    <div className="content">
                        <img className="right floated mini ui image" src={user.picture.thumbnail} alt="" />
                        <div className="header">
                            {user.firstname + ' ' + user.lastname}
                        </div>
                        <div className="meta">
                            {user.cell}
                        </div>
                        <div className="description">
                            {user.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { FetchUser }
