import React from 'react'
import SkyQ_logo from '../assets/SkyQ_logo.svg'
import { User, ClockFading, BookCheck, SquareCheckBig, CreditCard, CopyCheck, LogOut, CircleAlert } from 'lucide-react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Flex, Progress, Tooltip } from 'antd';
import { Clock, Home, Pause, Play, Star1, Stop, TickCircle } from 'iconsax-reactjs';



const Clocky = () => {

    const onChange = e => {
        console.log(`checked = ${e.target.checked}`);
    };

    const cards = [
        {
            id: 1,
            username: "Omkar",
            loginWith: "Card",
            duration: "1h 2m",
            createdAt: "10:00 AM",
            createdBy: "User",
            remarks: [{ remarkDetails: "On time" }],
            tasks: [
                {
                    taskName: "Check OKR's usage",
                    startedAt: "10:00 AM",
                    endedAt: "04:00 PM",
                    status: "completed",
                    percentage: 100
                }
            ],
            userStatus: "active"
        },
        {
            id: 2,
            username: "Ashish",
            loginWith: "Card",
            duration: "1h 2m",
            createdAt: "10:30 Am",
            createdBy: "User",
            remarks: [{ remarkDetails: "Good performance" }],
            tasks: [
                {
                    taskName: "Send reminders",
                    startedAt: "10:00 AM",
                    endedAt: "04:00 PM",
                    status: "completed",
                    percentage: 90
                }
            ],
            userStatus: "active"
        },
        {
            id: 3,
            username: "Tanmay",
            loginWith: "Carc",
            duration: "1h 2m",
            createdAt: "11:00 AM",
            createdBy: "User",
            remarks: [{ remarkDetails: "Joined late" }],
            tasks: [
                {
                    taskName: "Update report",
                    startedAt: "11:00 AM",
                    endedAt: "04:00 PM",
                    status: "completed",
                    percentage: 75
                }
            ],
            userStatus: "active"
        },
        {
            id: 4,
            username: "Pratik",
            loginWith: "Card",
            duration: "1h 2m",
            createdAt: "10:30 AM",
            createdBy: "User",
            remarks: [{ remarkDetails: "Handled critical task" }],
            tasks: [
                {
                    taskName: "Review OKR's",
                    startedAt: "10:30 AM",
                    endedAt: "04:00 PM",
                    status: "completed",
                    percentage: 100
                }
            ],
            userStatus: "active"
        },
        {
            id: 5,
            username: "Deepak",
            loginWith: "Card",
            duration: "1h 2m",
            createdAt: "10:00 AM",
            createdBy: "User",
            remarks: [{ remarkDetails: "Pending follow-up" }],
            tasks: [
                {
                    taskName: "Send notifications",
                    startedAt: "10:00 AM",
                    endedAt: "04:00 PM",
                    status: "completed",
                    percentage: 85
                }
            ],
            userStatus: "active"
        },
        {
            id: 6,
            username: "Pratik",
            loginWith: "Card",
            duration: "1h 2m",
            createdAt: "10:00 AM",
            createdBy: "User",
            remarks: [{ remarkDetails: "User logged out early" }],
            tasks: [
                {
                    taskName: "Prepare summary",
                    startedAt: "10:00 AM",
                    endedAt: "04:00 PM",
                    status: "completed",
                    percentage: 60
                }
            ],
            userStatus: "loggedOut"
        }
    ];


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

    const groups = {
        Group_1: {
            id: 1,
            head: "To Dos",
            icon: <Stop size={30} />,
            tasks: [
                {
                    name: "Check OKR'S usage daily and warn users",
                    user: "Hussain+1",
                    time: "1h 2m",
                    hash: "#hastag1 #hastag2"
                },
                {
                    name: "Update daily OKR report",
                    user: "Hussain",
                    time: "1h 2m",
                    hash: "#report #okr"
                },
                {
                    name: "Send reminders to inactive users",
                    user: "Hussain+2",
                    time: "1h 2m",
                    hash: "#reminder #users"
                }
            ]
        },
        Group_2: {
            id: 2,
            head: "Paused",
            icon: <Play size={32} />,
            tasks: [
                {
                    name: "Check OKR'S usage daily and warn users",
                    user: "Hussain+1",
                    time: "1h 2m",
                    hash: "#hastag1 #hastag2"
                },
                {
                    name: "Update daily OKR report",
                    user: "Hussain",
                    time: "1h 2m",
                    hash: "#report #okr"
                },
                {
                    name: "Send reminders to inactive users",
                    user: "Hussain+2",
                    time: "1h 2m",
                    hash: "#reminder #users"
                }
            ]
        },
        Group_3: {
            id: 3,
            head: "Ongoing",
            icon: <Pause size="32" />,
            tasks: [
                {
                    name: "Check OKR'S usage daily and warn users",
                    user: "Hussain+1",
                    time: "1h 2m",
                    hash: "#hastag1 #hastag2"
                },
                {
                    name: "Update daily OKR report",
                    user: "Hussain",
                    time: "1h 2m",
                    hash: "#report #okr"
                },
                {
                    name: "Send reminders to inactive users",
                    user: "Hussain+2",
                    time: "1h 2m",
                    hash: "#reminder #users"
                }
            ]
        },
        Group_4: {
            id: 4,
            head: "Done",
            icon: <TickCircle size="32" />,
            tasks: [
                {
                    name: "Check OKR'S usage daily and warn users",
                    user: "Hussain+1",
                    time: "1h 2m",
                    hash: "#hastag1 #hastag2"
                },
                {
                    name: "Update daily OKR report",
                    user: "Hussain",
                    time: "1h 2m",
                    hash: "#report #okr"
                },
                {
                    name: "Send reminders to inactive users",
                    user: "Hussain+2",
                    time: "1h 2m",
                    hash: "#reminder #users"
                }
            ]
        },
        Group_5: {
            id: 5,
            head: "Reviewed",
            icon: <Star1 size="32" />,
            tasks: [
                {
                    name: "Check OKR'S usage daily and warn users",
                    user: "Hussain+1",
                    time: "1h 2m",
                    hash: "#hastag1 #hastag2"
                },
                {
                    name: "Update daily OKR report",
                    user: "Hussain",
                    time: "1h 2m",
                    hash: "#report #okr"
                },
                {
                    name: "Send reminders to inactive users",
                    user: "Hussain+2",
                    time: "1h 2m",
                    hash: "#reminder #users"
                }
            ]
        },
    };


    const SegmentedBar = ({ percent = 60, segments = 10 }) => {
        const filled = Math.round((percent / 100) * segments);

        return (
            <div className="flex w-full gap-[1px] items-center">
                {Array.from({ length: segments }).map((_, i) => {
                    const isFilled = i < filled;
                    return (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-sm cursor-pointer transition-transform duration-200 ${isFilled ? "bg-black hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"} hover:scale-y-150`}
                        />
                    );
                })}
            </div>
        );
    };



    return (
        <>
            {/* screen */}
            <div className='w-screen h-screen'>

                {/* Header */}
                <div className='w-full min-h-12 md:pl-4 flex flex-col md:flex-row items-center justify-between sticky top-0 bg-white z-10'>
                    <img src={SkyQ_logo} alt="" className='w-14 pt-1 md:pt-0' />

                    <div className='flex flex-col md:flex-row items-center gap-1 md:gap-3 m-auto pt-1 md:pt-0'>
                        <div className='flex items-center gap-1'>
                            <span><User size={16} /></span>
                            <span className='text-sm font-semibold text-[#4f5050]'>8/12(13)</span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <span><ClockFading size={16} /></span>
                            <span className=' text-sm font-semibold text-[#4f5050]'>53 Hours 22 Minutes (680%)</span>
                        </div>
                    </div>
                </div>


                {/* Boards */}
                <div className='w-full flex flex-col md:flex-row '>

                    {/* Left section */}
                    <div className='md:w-1/2 w-full flex flex-col border-0 border-r border-gray-300'>

                        {/* icons/dropdown */}
                        <div className='flex items-center justify-between p-2 sticky top-12 bg-white z-10'>
                            {/* left task icons */}
                            <div className='flex gap-4 px-3'>
                                <span className='flex items-center gap-1'><BookCheck size={16} />1</span>
                                <span className='flex items-center gap-1'><SquareCheckBig size={16} />2</span>
                                <span className='flex items-center gap-1'><CircleAlert size={16} /></span>
                                <span className='flex items-center gap-1'><LogOut size={16} /></span>
                                <span className='flex items-center gap-1'><Clock size={16} /></span>
                                <span className='flex items-center gap-1'><Home size={16} /></span>
                            </div>

                            {/* left hastag */}
                            <div className='flex items-center'>
                                <div className="dropdown p-2 px-4 cursor-pointer text-xs">
                                    <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                Hastags
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>

                                {/* left dropdown */}
                                <div className="dropdown pr-4 cursor-pointer text-xs">
                                    <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                Resources
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>

                                <div className="dropdown pr-4 cursor-pointer text-xs">
                                    <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                Status
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>

                                <div className="dropdown pr-4 cursor-pointer text-xs">
                                    <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                Today
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                        {/* Group */}
                        <div className="left w-full mt-2 px-4 flex-col flex max-h-screen overflow-y-auto overflow-x-hidden">
                            {Object.values(groups).map((group) => (
                                <div key={group.id} className="w-1/2 pl-2 pb-4">
                                    {/* Group Header */}
                                    <div className="font-bold text-lg pb-2">{group.head}</div>

                                    {/* Group Tasks */}
                                    {group.tasks.map((task, index) => (
                                        <div key={index} className="mb-2 flex">
                                            {/* Big Checkbox */}

                                            <div className="flex items-stretch">
                                                {group.icon}
                                            </div>



                                            {/* Task Text */}
                                            <div className="ml-2">
                                                <div className="flex items-center">
                                                    <span className="font-semibold text-sm">{task.name}</span>
                                                </div>
                                                <div className="flex gap-3">
                                                    <span className="text-[#4f5050] text-xs flex items-center gap-[2px] font-semibold">
                                                        <User size={13} /> {task.user}
                                                    </span>
                                                    <span className="text-[#4f5050] text-xs flex items-center gap-[2px] font-semibold">
                                                        <ClockFading size={13} /> {task.time}
                                                    </span>
                                                    <span className="text-[#4f5050] text-xs font-semibold">
                                                        {task.hash}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* <div className='w-px bg-gray-200 min-h-screen'></div> */}


                    {/* Right section */}
                    <div className='md:w-1/2 w-full flex flex-col'>

                        {/* right icons/dropdown */}
                        <div className='flex gap-4 items-center justify-between p-2 sticky top-12 bg-white z-10'>

                            {/* Right Task icons */}
                            <div className='flex gap-4 px-3'>
                                <span className='flex items-center gap-1'><BookCheck size={16} />1</span>
                                <span className='flex items-center gap-1'><SquareCheckBig size={16} />2</span>
                                <span className='flex items-center gap-1'><CircleAlert size={16} /></span>
                                <span className='flex items-center gap-1'><LogOut size={16} /></span>
                                <span className='flex items-center gap-1'><Clock size={16} /></span>
                                <span className='flex items-center gap-1'><Home size={16} /></span>
                            </div>

                            {/* right hastag */}
                            <div className='flex items-center'>
                                <div className="dropdown p-2 text-xs cursor-pointer">
                                    <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                Hastags
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>

                                <div className="dropdown p-2 text-xs cursor-pointer">
                                    <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                Resources
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>

                                <div className="dropdown p-2 text-xs cursor-pointer">
                                    <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                Status
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>

                                {/* Right dropdown */}
                                <div className='pr-7 text-xs'>
                                    <div className='cursor-pointer'>
                                        <Dropdown className='text-black' menu={{ items }} trigger={['click']}>
                                            <a onClick={e => e.preventDefault()}>
                                                <Space>
                                                    Today
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Card */}
                        {cards.map((item) => (
                            <div
                                key={item.id}
                                className={`w-full max-h-screen overflow-y-auto overflow-x-hidden p-2 px-4 ${item.userStatus === "loggedOut" ? "opacity-50 pointer-events-none" : ""
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 pl-[3px]">
                                        <User size={13} />
                                        <span className="font-semibold text-sm">{item.username}</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="pt-[1px]"><CreditCard size={13} /></span>
                                        <span className="text-xs font-semibold text-[#4f5050]">
                                            {(item.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="pt-[1px]"><ClockFading size={13} /></span>
                                        <span className="text-xs text-[#4f5050] font-semibold">
                                            {item.duration}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-1">
                                    <SegmentedBar percent={60} segments={20} />
                                </div>

                                <div className="mt-1 flex flex-col relative h-6 overflow-hidden pl-[4px]">
                                    <span
                                        className={`font-semibold absolute text-xs text-[#4f5050] ${item.userStatus === "active" ? "animate-slideUp" : ""
                                            }`}
                                    >
                                        {item.userStatus === "loggedOut" ? "Logged Out" : "late (23m)"}
                                    </span>

                                    {item.userStatus === "active" && (
                                        <span className="font-semibold absolute text-xs text-[#4f5050] animate-slideIn [animation-delay:2s]">
                                            Ideal
                                        </span>
                                    )}
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Clocky
