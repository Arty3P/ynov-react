import React from 'react';

const UndoButton = ({ text, color, onClick, active }) => {
    return(
        <div className="two wide column">
            <button 
                className={`ui button fluid ${color} ${!active ? "disabled" : null}`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

export { UndoButton }