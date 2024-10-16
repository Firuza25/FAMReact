import React from "react";

const withSearchingBar = (Component) => (props) => {


    return <div>
        <Component {...props}/>
    </div>
    
}

export default withSearchingBar