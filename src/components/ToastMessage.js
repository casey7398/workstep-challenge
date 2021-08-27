import React from "react";

function ToastMessage(props) {
    console.log(props)
    return (
        <>
            <div className="toast-message">
                <span>Successfully updated {props.applicant}!</span>
            </div>
        </>
    );
};

export default ToastMessage;