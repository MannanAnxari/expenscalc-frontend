import { Link, useLocation } from "react-router-dom"

const Sidebar = ({ toggle }) => {

    const loc = useLocation();

    return (
        <>
            <div className={`flex flex-col items-center ${toggle ? 'w-16' : 'w-1/5'} transition-all h-full overflow-hidden text-gray-400 bg-gray-800`}>
                <a className="flex items-center w-full px-3 mt-3" href="#">
                    <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    {toggle ? '' : <span className="ml-2 text-sm font-bold md:block hidden">The Expenses</span>}
                </a>
                <div className="w-full px-2">
                    <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${loc.pathname === '/dashboard' ? 'text-gray-200 bg-gray-700' : 'hover:bg-gray-700 hover:text-gray-300'} `} to="/dashboard">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {toggle ? '' : <span className="ml-2 text-sm font-medium md:block hidden">Dasboard</span>}
                        </Link>
                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${loc.pathname === '/dashboard/manage-transactions' ? 'text-gray-200 bg-gray-700' : 'hover:bg-gray-700 hover:text-gray-300'} `} to="/dashboard/manage-transactions">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {toggle ? '' : <span className="ml-2 text-sm font-medium md:block hidden">Manage Transaction</span>}
                        </Link>
                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${loc.pathname === '/dashboard/show-visual-data' ? 'text-gray-200 bg-gray-700' : 'hover:bg-gray-700 hover:text-gray-300'} `} to="/dashboard/show-visual-data">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {toggle ? '' : <span className="ml-2 text-sm font-medium md:block hidden">Chart View</span>}
                        </Link>
                    </div>
                    <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${loc.pathname === '/dashboard/manage-assets' ? 'text-gray-200 bg-gray-700' : 'hover:bg-gray-700 hover:text-gray-300'} `} to="/dashboard/manage-assets">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            {toggle ? '' : <span className="ml-2 text-sm font-medium md:block hidden">Manage Assets</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar