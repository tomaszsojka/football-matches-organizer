import React from 'react';

const Error = (props) => {
    return (
        <div >
            <p style={{textAlign : "center", marginTop : "90px"}}>{props.message}</p>
        </div>
    );
}

export default Error;