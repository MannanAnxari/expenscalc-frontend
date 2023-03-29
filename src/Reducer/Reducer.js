const initialData = {
    user: {}
}

const userReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_USER":
            const { id, data } = action.payload;
            // return {
            //     ...state,
            //     user: [
            //         ...state.user,
            //         {
            //             id: id,
            //             data: data

            //         }]
            // }
            return {
                user: {
                    id: id,
                    data: data
                }
            }
        case "REMOVE_USER":
            return {
                user: {}
            }

        default:
            return state;
    }
}
export default userReducer