import React, { useEffect, useState } from 'react'
import { User, ClockFading, BookCheck, SquareCheckBig, CreditCard, CopyCheck, LogOut, CircleAlert, MoveRight } from 'lucide-react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Flex, Progress, Tooltip } from 'antd';
import { Clock, Home, Pause, Play, Star1, Stop, TickCircle,Paperclip, } from 'iconsax-reactjs';
import { taskService } from '../../services/APIService';

const LeftSide = () => {
      const [tasks, setTasks] = useState({});
        const [loading, setLoading] = useState(true);
        const [newTaskTitle, setNewTaskTitle] = useState('');
        const [error, setError] = useState(null);
    
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

        useEffect(() => {
            fetchTasks();
        }, []);
       
        

          const fetchTasks = async () => {
                try {
                    setLoading(true);
                    const response = await taskService.getStatusWiseTasks();
                    console.log('Tasks from API:', response.data);
                    
                    // Transform API response to match your current structure
                    const transformedTasks = transformTasksData(response.data);
                    setTasks(transformedTasks);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                    setError('Failed to fetch tasks');
                    // Fallback to default structure if API fails
                    setTasks(getDefaultTasks());
                } finally {
                    setLoading(false);
                }
            };
        
            const transformTasksData = (apiData) => {
                // Map API data to UI structure
                const statusMap = {
                    'todo': { head: 'To Dos', icon: <Stop size={30} />, id: 1 },
                    'paused': { head: 'Paused', icon: <Play size={32} />, id: 2 },
                    'ongoing': { head: 'Ongoing', icon: <Pause size="32" />, id: 3 },
                    'completed': { head: 'Done', icon: <TickCircle size="32" />, id: 4 },
                    'reviewed': { head: 'Reviewed', icon: <Star1 size="32" />, id: 5 },
                };

                const transformed = {};
                Object.keys(statusMap).forEach(status => {
                    const tasksForStatus = apiData[status] || [];
                    transformed[`Group_${statusMap[status].id}`] = {
                        ...statusMap[status],
                        tasks: tasksForStatus.map(task => ({
                            id: task.id,
                            name: task.title || task.name,
                            user: task.assignedTo?.name || 'Unassigned',
                            time: task.time ? `${Math.round(task.time / 60)}m` : '0m',
                            hash: '#general',
                            description: task.description || '',
                            assignedToId: task.assignedToId,
                            completedAt: task.completedAt,
                            createdAt: task.createdAt,
                            createdBy: task.createdBy?.name || '',
                            createdById: task.createdById,
                            deletedAt: task.deletedAt,
                            estimation: task.estimation,
                            histories: task.histories,
                            projection: task.projection,
                            startedAt: task.startedAt,
                            status: task.status,
                            timeTaken: task.timeTaken,
                            updatedAt: task.updatedAt,
                        }))
                    };
                });
                return transformed;
            };
        
            const getDefaultTasks = () => ({
                Group_1: {
                    id: 1,
                    head: "To Dos",
                    icon: <Stop size={30} />,
                    tasks: []
                },
                Group_2: {
                    id: 2,
                    head: "Paused",
                    icon: <Play size={32} />,
                    tasks: []
                },
                Group_3: {
                    id: 3,
                    head: "Ongoing",
                    icon: <Pause size="32" />,
                    tasks: []
                },
                Group_4: {
                    id: 4,
                    head: "Done",
                    icon: <TickCircle size="32" />,
                    tasks: []
                },
                Group_5: {
                    id: 5,
                    head: "Reviewed",
                    icon: <Star1 size="32" />,
                    tasks: []
                },
            });
        
            const handleTaskClick = async (taskId, currentStatus) => {
                try {
                    if (currentStatus === 'paused') {
                        await taskService.playTask(taskId);
                    } else if (currentStatus === 'ongoing') {
                        await taskService.pauseTask(taskId);
                    }
                    // Refresh tasks after action
                    await fetchTasks();
                } catch (error) {
                    console.error('Error updating task:', error);
                    setError('Failed to update task');
                }
            };
        
            const handleAddTask = async (e) => {
                e.preventDefault();
                if (!newTaskTitle.trim()) return;
        
                try {
                    await taskService.createTask(newTaskTitle, '');
                    setNewTaskTitle('');
                    await fetchTasks(); // Refresh tasks
                } catch (error) {
                    console.error('Error creating task:', error);
                    setError('Failed to create task');
                }
            };
        
            if (loading) {
                return (
                    <div className='md:w-1/2 w-full min-h-screen flex items-center justify-center border-0 border-r border-gray-300'>
                        <div className="text-center">Loading tasks...</div>
                    </div>
                );
            }
    // const groups = {
    //     Group_1: {
    //         id: 1,
    //         head: "To Dos",
    //         icon: <Stop size={30} />,
    //         tasks: [
    //             {
    //                 name: "Check OKR'S usage daily and warn users",
    //                 user: "Hussain+1",
    //                 time: "1h 2m",
    //                 hash: "#hastag1 #hastag2"
    //             },
    //             {
    //                 name: "Update daily OKR report",
    //                 user: "Hussain",
    //                 time: "1h 2m",
    //                 hash: "#report #okr"
    //             },
    //             {
    //                 name: "Send reminders to inactive users",
    //                 user: "Hussain+2",
    //                 time: "1h 2m",
    //                 hash: "#reminder #users"
    //             }
    //         ]
    //     },
    //     Group_2: {
    //         id: 2,
    //         head: "Paused",
    //         icon: <Play size={32} />,
    //         tasks: [
    //             {
    //                 name: "Check OKR'S usage daily and warn users",
    //                 user: "Hussain+1",
    //                 time: "1h 2m",
    //                 hash: "#hastag1 #hastag2"
    //             },
    //             {
    //                 name: "Update daily OKR report",
    //                 user: "Hussain",
    //                 time: "1h 2m",
    //                 hash: "#report #okr"
    //             },
    //             {
    //                 name: "Send reminders to inactive users",
    //                 user: "Hussain+2",
    //                 time: "1h 2m",
    //                 hash: "#reminder #users"
    //             }
    //         ]
    //     },
    //     Group_3: {
    //         id: 3,
    //         head: "Ongoing",
    //         icon: <Pause size="32" />,
    //         tasks: [
    //             {
    //                 name: "Check OKR'S usage daily and warn users",
    //                 user: "Hussain+1",
    //                 time: "1h 2m",
    //                 hash: "#hastag1 #hastag2"
    //             },
    //             {
    //                 name: "Update daily OKR report",
    //                 user: "Hussain",
    //                 time: "1h 2m",
    //                 hash: "#report #okr"
    //             },
    //             {
    //                 name: "Send reminders to inactive users",
    //                 user: "Hussain+2",
    //                 time: "1h 2m",
    //                 hash: "#reminder #users"
    //             }
    //         ]
    //     },
    //     Group_4: {
    //         id: 4,
    //         head: "Done",
    //         icon: <TickCircle size="32" />,
    //         tasks: [
    //             {
    //                 name: "Check OKR'S usage daily and warn users",
    //                 user: "Hussain+1",
    //                 time: "1h 2m",
    //                 hash: "#hastag1 #hastag2"
    //             },
    //             {
    //                 name: "Update daily OKR report",
    //                 user: "Hussain",
    //                 time: "1h 2m",
    //                 hash: "#report #okr"
    //             },
    //             {
    //                 name: "Send reminders to inactive users",
    //                 user: "Hussain+2",
    //                 time: "1h 2m",
    //                 hash: "#reminder #users"
    //             }
    //         ]
    //     },
    //     Group_5: {
    //         id: 5,
    //         head: "Reviewed",
    //         icon: <Star1 size="32" />,
    //         tasks: [
    //             {
    //                 name: "Check OKR'S usage daily and warn users",
    //                 user: "Hussain+1",
    //                 time: "1h 2m",
    //                 hash: "#hastag1 #hastag2"
    //             },
    //             {
    //                 name: "Update daily OKR report",
    //                 user: "Hussain",
    //                 time: "1h 2m",
    //                 hash: "#report #okr"
    //             },
    //             {
    //                 name: "Send reminders to inactive users",
    //                 user: "Hussain+2",
    //                 time: "1h 2m",
    //                 hash: "#reminder #users"
    //             }
    //         ]
    //     },
    // };
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
                            {Object.values(tasks).map((group) => (
                                <div key={group.id} className="w-full pl-2 pb-2">
                                    {/* Group Header */}
                                    <div className="font-bold text-lg pb-2">{group.head}</div>

                                    {/* Group Tasks */}
   {group.tasks && group.tasks.length > 0 ? (
                            group.tasks.map((task, index) => (
                                <div key={task.id || index} className="mb-2 flex">
                                    {/* Task Icon */}
                                    <div 
                                        className="flex items-stretch cursor-pointer"
                                        onClick={() => handleTaskClick(task.id, group.head.toLowerCase())}
                                    >
                                        {group.icon}
                                    </div>

                                    {/* Task Text */}
                                    <div className="ml-2 flex-1">
                                        <div className="flex items-center">
                                            <span className="font-semibold text-sm">{task.name}</span>
                                        </div>
                                        <div className="flex gap-3 flex-wrap">
                                            <span className="text-[#4f5050] text-xs flex items-center gap-[2px] font-semibold">
                                                <User size={13} /> {task.user}
                                            </span>
                                            <span className="text-[#4f5050] text-xs flex items-center gap-[2px] font-semibold">
                                                <ClockFading size={13} /> {task.time}
                                            </span>
                                            <span className="text-[#4f5050] text-xs font-semibold">
                                                {task.hash}
                                            </span>
                                            {task.description && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Desc: {task.description}</span>
                                            )}
                                            {task.status && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Status: {task.status}</span>
                                            )}
                                            {task.createdBy && (
                                                <span className="text-[#4f5050] text-xs font-semibold">CreatedBy: {task.createdBy}</span>
                                            )}
                                            {task.createdAt && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Created: {new Date(task.createdAt).toLocaleString()}</span>
                                            )}
                                            {task.updatedAt && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Updated: {new Date(task.updatedAt).toLocaleString()}</span>
                                            )}
                                            {task.completedAt && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Completed: {new Date(task.completedAt).toLocaleString()}</span>
                                            )}
                                            {task.estimation && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Est: {task.estimation}</span>
                                            )}
                                            {task.timeTaken && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Time Taken: {task.timeTaken}</span>
                                            )}
                                            {task.projection && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Projection: {task.projection}</span>
                                            )}
                                            {task.startedAt && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Started: {new Date(task.startedAt).toLocaleString()}</span>
                                            )}
                                            {task.deletedAt && (
                                                <span className="text-[#4f5050] text-xs font-semibold">DeletedAt: {new Date(task.deletedAt).toLocaleString()}</span>
                                            )}
                                            {task.histories && task.histories.length > 0 && (
                                                <span className="text-[#4f5050] text-xs font-semibold">Histories: {task.histories.length}</span>
                                            )}
                                            {task.assignedToId && (
                                                <span className="text-[#4f5050] text-xs font-semibold">AssignedToId: {task.assignedToId}</span>
                                            )}
                                        
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-sm italic ml-8">
                                No tasks in this category
                            </div>
                        )}
                                </div>
                            ))}

                            {/* search bar */}
                            <div className='w-full flex items-center justify-center sticky bottom-0 mt-auto mb-4'>
                                <form onSubmit={handleAddTask} className="flex w-full max-w-md relative">
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
                                </form>
                            </div>

                        </div>

        </div>
    )
}

export default LeftSide
