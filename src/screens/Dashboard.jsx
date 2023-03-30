import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useMutation } from 'react-query';
import axios from "axios";
import { toast } from 'react-hot-toast';
import UserInfo from './UserInfo';
import AddAssets from '../components/AddAssets';
import Spinner from '../components/Spinner';
import Sidebar from '../components/Sidebar';

const getDashboard = async (json) => {
  const { data } = await axios.post('https://expenscalc-server.vercel.app/api/dashboard/get-dashboard', json);
  return data;
};

const Dashboard = () => {

  const { addAssets, dispatch, user } = useContext(AppContext);

  const navigate = useNavigate();

  const loc = useLocation();

  const [data, setData] = useState()

  const { mutate, isLoading } = useMutation(getDashboard, {
    onSuccess: (json) => {
      if (json.success) {
        setData(json);
        console.log(json);
        dispatch(addAssets(json?.assets[0]))
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });

  useEffect(() => {

    if (!user.data) { return window.location.href = '/login' };

    mutate({ userid: user?.data?._id });

  }, [user])

  const [toggle, setToggle] = useState(false);


  return (
    <React.Fragment>
      {isLoading ?
        <Spinner />
        :
        data?.status === 0 ?
          <AddAssets setData={setData} />
          :
          <div className="w-full flex h-screen">
            <Sidebar toggle={toggle} />
            {loc.pathname === '/dashboard' || loc.pathname === '/dashboard#' || loc.pathname === '/dashboard/' ?
              <UserInfo /> : ""}
            <Outlet />
          </div>
      }

      <div className='absolute top-5 left-5'>
        <button className="btn btn-primary" onClick={() => setToggle(!toggle)}>
          <svg className="w-4 h-4" aria-hidden="true" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            {toggle ?
              <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z" />
              :
              <path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z" />
            }
          </svg>
        </button>
      </div>

    </React.Fragment>
  )
}

export default Dashboard