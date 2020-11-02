import React, { useState, useEffect } from 'react';

import { FetchTableRow } from './row'

function FetchTable({ users }) {

    const [data, setData] = useState([]);
    const [lastField, setLastField] = useState('');

    useEffect(() => {
        setData(users)
    }, [users])

    const sortTable = (field) => {
        let order = 'asc'
        setLastField(field)
        if(lastField === field) {
            order = 'desc'
            setLastField('')
        }
        const sorted = [...users].sort(compareValues(field, order))
        setData(sorted)
    };

    const compareValues = (property, order = 'asc') => {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
                return 0
            }

            const varA = (typeof a[property] === 'string') ? a[property].toUpperCase() : a[property]
            const varB = (typeof b[property] === 'string') ? b[property].toUpperCase() : b[property]

            let comparison = 0;
            if (varA > varB) {
                comparison = 1
            } else if (varA < varB) {
                comparison = -1
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            )
        }
    }

    return(
        <table className="ui table striped sortable selectable blue">
            <thead>
                <tr>
                    <th>Picture</th>
                    <th onClick={() => sortTable('lastname')}>Lastname</th>
                    <th onClick={() => sortTable('firstname')}>Firstname</th>
                    <th onClick={() => sortTable('email')}>Email</th>
                    <th onClick={() => sortTable('cell')}>Cell</th>
                </tr>
            </thead>
            <tbody>
                {data.map(user =>
                    <FetchTableRow
                        key={user.uuid}
                        user={user}
                    />
                )}
            </tbody>
        </table>
    )
}

export { FetchTable }
