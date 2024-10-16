import React from "react";

const withFooter = (Component) => (props) => {
    return (
        
        <div>
            <Component {...props} style={{marginTop: "40px"}} />
        </div>
    );

}
export default withFooter