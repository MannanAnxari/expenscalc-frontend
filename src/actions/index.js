export const addUserData = (data) => { 
    return {
        type: "ADD_USER",
        payload: {
            id: new Date().getTime().toString(),
            data: data
        } 
    }
} 
export const addAssets = (data) => { 
    return {
        type: "ADD_ASSET",
        payload: {
            data: data
        } 
    }
} 
export const removeUserData = () => {
    return {
        type: "REMOVE_USER"
    }
}
export const removeAssetData = () => {
    return {
        type: "REMOVE_ASSET"
    }
}
