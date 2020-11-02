import React from 'react';

function FetchButton({ size, color, loading, onClick, text }) {
    return(
        <div className={`${size} wide column`}>
            <button 
                className={`ui button fluid ${color} ${loading ? "loading disabled" : ""}`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

export { FetchButton }