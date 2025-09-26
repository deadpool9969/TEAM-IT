import React, { useEffect, useState } from 'react'
import SkyQ_logo from "../../assets/SkyQ_logo.svg"
import { User, ClockFading, BookCheck, SquareCheckBig, CreditCard, CopyCheck, LogOut, CircleAlert,Bell } from 'lucide-react'
import { Dropdown, Space } from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

const Header = () => {

     const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        users: { active: 8, total: 12, pending: 13 },
        time: { hours: 53, minutes: 22, percentage: 680 }
    });

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

        const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(); // Refresh to show login modal
    };

     const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    2nd menu item
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ];

    return (
       <div className="w-full min-h-12 md:pl-4 flex flex-col md:flex-row items-center justify-between ">
                    <div className="relative flex items-center justify-center w-full md:w-14">
                        {/* Centered Logo */}
                        <img src={SkyQ_logo} alt="" className="w-14 pt-1 md:pt-0" />

                        {/* Bell right */}
                        <span className="absolute md:hidden right-2">
                            <Bell size={16} />
                        </span>
                    </div>


                    <div className="flex flex-col md:flex-col items-center m-auto pt-1 md:pt-1">
                        <div className="flex gap-3">
                            <div className="flex items-center gap-1">
                                <span>
                                    <User size={16} />
                                </span>
                                <span className="text-sm font-semibold text-[#4f5050]">
                                    8/12(13)
                                </span>
                            </div>

                            <div className='flex items-center gap-1'>
                                <span><ClockFading size={16} /></span>
                                <span className=' text-sm font-semibold text-[#4f5050]'>{stats.time.hours} Hours {stats.time.minutes} Minutes ({stats.time.percentage}%)</span>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="dropdown p-2 text-xs cursor-pointer">
                                <Dropdown
                                    className="text-black"
                                    menu={{ items }}
                                    trigger={["click"]}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            Hashtags
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>

                            <div className="dropdown p-2 text-xs cursor-pointer">
                                <Dropdown
                                    className="text-black"
                                    menu={{ items }}
                                    trigger={["click"]}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            Resources
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>

                            <div className="dropdown p-2 cursor-pointer text-xs">
                                <Dropdown
                                    className="text-black"
                                    menu={{ items }}
                                    trigger={["click"]}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            Today
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    <span className='pr-8 md:flex hidden'>
                        <Bell size={16} />
                    </span>
                     {user && (
                                        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                                            <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded'>
                                                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <span className="text-sm font-medium hidden md:block">
                                                    {user.name || 'User'}
                                                </span>
                                                <DownOutlined className="text-xs" />
                                            </div>
                                        </Dropdown>
                                    )}
                </div>

    )
}

export default Header
