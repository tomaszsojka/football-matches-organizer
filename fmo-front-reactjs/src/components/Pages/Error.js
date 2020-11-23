import React from 'react';

export const Error = (props) => {
    return (
        <div >
            <p style={{textAlign : "center", marginTop : "90px"}}>{props.message}</p>
        </div>
    );
}
