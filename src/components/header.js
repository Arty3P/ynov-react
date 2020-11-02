import React from 'react';

function Header() {
    return(
        <div className="ui top attached menu">
            <div className="ui dropdown icon item">
                <i className="wrench icon"></i>
            </div>
            <a className="item" href="/fetch">
                Fetch
            </a>
            <a className="item" href="/undo">
                Undo
            </a>
        </div>
    )
}

export { Header }