const initialData = {
    assets: {}
}

const AssetReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_ASSET":
            const { data } = action.payload;
            return {
                assets: data
            }
        case "REMOVE_ASSET":
            return {
                assets: {}
            }
        default:
            return state;
    }
}
export default AssetReducer