import React from 'react';

function FetchInput({ size, onChange, placeholder }) {
    return(
        <div className={`${size} wide column`}>
            <div className="ui input fluid icon">
                <input type="search" onChange={onChange} placeholder={placeholder} />
                <i className="search icon"></i>
            </div>
        </div>
    )
}

export { FetchInput }