import userReducer from "./Reducer";
import AssetReducer from "./AssetReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    userReducer,
    AssetReducer
})

export default rootReducer