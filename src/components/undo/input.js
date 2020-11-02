import React from 'react';

const UndoInput = ({ onChange, value }) => {
    return(
        <div className="ui input fluid">
            <input type="text" onChange={onChange} value={value} />
        </div>
    )
}

export { UndoInput }