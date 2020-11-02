import React from 'react'

export const users = {
    list: [],
    selected: {},
};

export const UserContext = React.createContext(
    users
);