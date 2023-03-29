import Home from "./screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./screens/Register";
import { removeUserData, addUserData, addAssets, removeAssetData } from './actions';
import { AppContext } from "./context/AppContext.js";
import { useSelector, useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import ManageAssets from "./components/ManageAssets";
import ManageTransaction from "./components/ManageTransaction";

export default function App() {
  // react query
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const assets = useSelector((state) => state.AssetReducer.assets);

  const values = { removeUserData, addUserData, dispatch, user, addAssets, removeAssetData, assets };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={values}>
          <BrowserRouter>
            <Header />
            <Toaster
              position="top-center"
            />
            <Routes>
              <Route exact path="/" element={<Home />} />

              {/* auth */}
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />

              {/* dashboard */}
              <Route exact path="dashboard" element={<Dashboard />} >
                <Route exact path="manage-assets" element={<ManageAssets />} />
                <Route exact path="manage-transactions" element={<ManageTransaction />} />
              </Route>
            </Routes>
            {/* <Footer /> */}
          </BrowserRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </>
  )
}
