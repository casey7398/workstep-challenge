const reducer = (state = 0, action) => {
    switch (action.type) {
        case "getApplicants":
            return 'blah';
        default:
            return state;
    }
}

export default reducer;