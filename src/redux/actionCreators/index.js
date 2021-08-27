export const getApplicants = () => {
    return(dispatch) => {
        dispatch({
            type: "getAll",
            payload: applicants
        })
    }
}