import React from 'react';
import { useHistory } from "react-router-dom";

function FetchTableRow({ user }) {

    let history = useHistory()

    function pushToUser() {
		history.push(`/fetch/${user.uuid}`)
	}

    return(
        <tr id={user.uuid} onClick={pushToUser} className="cursor">
            <td>
                <img src={user.picture.thumbnail} className="ui avatar circular image" alt="" />
            </td>
            <td style={{ verticalAlign: 'middle' }}>{user.lastname}</td>
            <td style={{ verticalAlign: 'middle' }}>{user.firstname}</td>
            <td style={{ verticalAlign: 'middle' }}>{user.email}</td>
            <td style={{ verticalAlign: 'middle' }}>{user.cell}</td>
        </tr> 
    )

}

export { FetchTableRow }