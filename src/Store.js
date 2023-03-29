
import { createStore } from 'redux'
import rootReducer from './Reducer'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "persist-user",
    storage
}
// import { Reducer } from './Component/Reducer/Reducer'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


// const persistConfig = {
//     key: 'root',
//     storage,
// }

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store)
export default store;