import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Login', href: '/login', current: false },
    { name: 'Register', href: '/register', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {

    const { removeUserData, dispatch, user, removeAssetData } = useContext(AppContext);

    const loc = useLocation();

    console.log(loc.pathname);

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white ">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <svg className="h-6 w-6 " fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="192px" height="192px"><path d="M6.5 3.427l9.385 4.693-1.988 1.193L6.5 6.025V3.427M5 1v6l9 4 5-3L5 1 5 1zM17.5 12.621v2.452l-4.903 2.452L17.5 12.621M19 9L5 23l14-7V9L19 9zM6.5 11l.735.551L6.5 13.757V11M5 8v15l4-12L5 8 5 8z" /></svg>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <Link
                                            to={'/'}
                                            className={`${loc.pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium transition-all`}
                                        >
                                            Home
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden sm:block">
                                {!user?.data ?
                                    <>
                                        <Link to='/login'>
                                            <motion.button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all" whileTap={{ scale: 0.95 }}>Login</motion.button>
                                        </Link>
                                        <Link to='/register'>
                                            <motion.button className="text-white bg-blue-500 hover:bg-blue-600 ml-4 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all" whileTap={{ scale: 0.95 }}>Register</motion.button>
                                        </Link>
                                    </>
                                    :
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-offset-2">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/dashboard"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 transition-all')}
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a onClick={() => { dispatch(removeUserData()); dispatch(removeAssetData()) }}
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 transition-all')}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                }

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item, i) => (
                                <Link
                                    key={i}
                                    to={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Header