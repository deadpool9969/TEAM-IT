import React from 'react'
import { User, ClockFading, BookCheck, SquareCheckBig, CreditCard, CopyCheck, LogOut, CircleAlert, MoveRight } from 'lucide-react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Flex, Progress, Tooltip } from 'antd';
import { Clock, Home, Pause, Play, Star1, Stop, TickCircle,Paperclip, } from 'iconsax-reactjs';

const LeftSide = () => {
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
    return (
        <div className='md:w-1/2 w-full min-h-screen flex flex-col border-0 border-r border-gray-300 relative'>

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
                            </div>
                        </div>

                        {/* Group */}
                        <div className="left w-full mt-2 px-4 flex-col flex h-[95vh] overflow-y-auto">
                            {Object.values(groups).map((group) => (
                                <div key={group.id} className="w-full pl-2 pb-2">
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

                            {/* search bar */}
                            <div className='w-full flex items-center justify-center sticky bottom-0 mt-auto mb-4'>
                                <div className="flex w-full max-w-md relative">
                                    <input
                                        type="text"
                                        placeholder="Add Task..."
                                        className=" flex-grow pl-4 py-2 shadow-md text-sm border border-gray-300 rounded-full"
                                    />
                                    <button className='absolute right-7 top-1 w-[30px] h-[30px] text-gray-500'>
                                        <Paperclip size={16} />
                                    </button>

                                    <button className="px-2 absolute right-1 top-1 w-[30px] h-[30px] bg-black text-white rounded-full">
                                        <MoveRight size={14} />
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
    )
}

export default LeftSide
