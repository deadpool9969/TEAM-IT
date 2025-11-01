import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookCheck, SquareCheckBig, LogOut, CircleAlert } from "lucide-react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Clock, Home } from "iconsax-reactjs";
import { authService, taskService } from "../../services/APIService";

const RightSide = () => {
  const selfUser = useSelector((state) => state.auth.user);
  console.log("Self User:", selfUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const items = [
    { key: "1", label: <a>1st menu item</a> },
    { key: "2", label: <a>2nd menu item</a>, icon: <SmileOutlined />, disabled: true },
    { key: "3", label: <a>3rd menu item (disabled)</a>, disabled: true },
    { key: "4", danger: true, label: "a danger item" }
  ];

  useEffect(() => {
    fetchUserTasks();
  }, []);

  // Restore checked out users and logoutAt from localStorage
  useEffect(() => {
    if (users.length > 0) {
      const checkedOutIds = JSON.parse(localStorage.getItem("checkedOutUserIds") || "[]");
      const checkedOutData = JSON.parse(localStorage.getItem("checkedOutData") || "{}");
      if (checkedOutIds.length > 0) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            checkedOutIds.includes(u.id)
              ? {
                  ...u,
                  userStatus: "loggedOut",
                  logoutAt: checkedOutData[u.id] || u.logoutAt || new Date().toISOString(),
                }
              : u
          )
        );
      }
    }
  }, [users.length]);

  const fetchUserTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getUserWiseTasks();
      console.log("User tasks from API (full response):", response.data);

      const transformedUsers = transformUserTasksData(response.data);
      setUsers(transformedUsers);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      setError("Failed to fetch user tasks");
      // Fallback to localStorage data if API fails
      const checkedOutIds = JSON.parse(localStorage.getItem("checkedOutUserIds") || "[]");
      const checkedOutData = JSON.parse(localStorage.getItem("checkedOutData") || "{}");
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          checkedOutIds.includes(u.id)
            ? {
                ...u,
                userStatus: "loggedOut",
                logoutAt: checkedOutData[u.id] || u.logoutAt || new Date().toISOString(),
              }
            : u
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const transformUserTasksData = (apiData) => {
    const checkedOutIds = JSON.parse(localStorage.getItem("checkedOutUserIds") || "[]");
    const checkedOutData = JSON.parse(localStorage.getItem("checkedOutData") || "{}");
    return apiData.map((user, index) => {
      const isCheckedOut = checkedOutIds.includes(user.id);
      return {
        id: user.id || index + 1,
        username: user.name || user.username || "Unknown User",
        mobile: user.mobile || "",
        loginAt: user.checkinTime || new Date().toISOString(),
        logoutAt: isCheckedOut ? (checkedOutData[user.id] || user.checkoutTime || new Date().toISOString()) : user.checkoutTime || null,
        userStatus: isCheckedOut || user.checkoutTime ? "loggedOut" : "active",
        tasks: user.tasks?.map((task) => ({
          taskName: task.title || task.name,
          startedAt: formatTime(task.startTime) || "10:00 AM",
          status: task.status?.toLowerCase() || "completed",
        })) || [],
      };
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return null;
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getDefaultUsers = () => [
    {
      id: 1,
      username: "No Data",
      loginAt: new Date().toISOString(),
      logoutAt: null,
      userStatus: "active",
      tasks: [],
    },
  ];

  const handleCheckin = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          await authService.checkin("Office", latitude, longitude, "127.0.0.1", "Desktop");
          await fetchUserTasks();
        });
      } else {
        await authService.checkin("Office", 18.9885633, 73.1105123, "127.0.0.1", "Desktop");
        await fetchUserTasks();
      }
    } catch (error) {
      console.error("Error checking in:", error);
      setError("Failed to check in");
    }
  };

  const handleCheckout = async (userId) => {
    const checkoutTime = new Date().toISOString();
    // Optimistically update UI
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId ? { ...u, userStatus: "loggedOut", logoutAt: checkoutTime } : u
      )
    );
    // Update localStorage
    const checkedOutIds = JSON.parse(localStorage.getItem("checkedOutUserIds") || "[]");
    const checkedOutData = JSON.parse(localStorage.getItem("checkedOutData") || "{}");
    if (!checkedOutIds.includes(userId)) {
      checkedOutIds.push(userId);
      checkedOutData[userId] = checkoutTime;
      localStorage.setItem("checkedOutUserIds", JSON.stringify(checkedOutIds));
      localStorage.setItem("checkedOutData", JSON.stringify(checkedOutData));
    }
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          await authService.checkout("Office", latitude, longitude, "127.0.0.1", "Desktop");
          await fetchUserTasks();
        });
      } else {
        await authService.checkout("Office", 18.9885633, 73.1105123, "127.0.0.1", "Desktop");
        await fetchUserTasks();
      }
    } catch (error) {
      setError("Failed to check out");
    }
  };

  const parseTime = (timeStr) => {
    const today = new Date();
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    today.setHours(hours, minutes || 0, 0, 0);
    return new Date(today);
  };

  const buildTimeline = (loginAt, logoutAt, tasks) => {
    const officeStart = new Date();
    officeStart.setHours(10, 0, 0, 0);
    const officeEnd = new Date();
    officeEnd.setHours(19, 0, 0, 0);

    const login = loginAt ? new Date(loginAt) : officeStart;
    const logout = logoutAt ? new Date(logoutAt) : new Date();
    const totalMinutes = (officeEnd - officeStart) / 60000;

    let timeline = [];
    let lastEnd = login;

    if (login > officeStart) {
      timeline.push({
        type: "idle",
        start: officeStart,
        end: login,
        minutes: (login - officeStart) / 60000,
        percent: ((login - officeStart) / 60000 / totalMinutes) * 100,
      });
    }

    const sortedTasks = tasks
      .map((task) => ({ ...task, startDate: parseTime(task.startedAt) }))
      .sort((a, b) => a.startDate - b.startDate);

    sortedTasks.forEach((task, idx) => {
      const taskStart = task.startDate;

      if (taskStart > lastEnd) {
        timeline.push({
          type: "idle",
          start: lastEnd,
          end: taskStart,
          minutes: (taskStart - lastEnd) / 60000,
          percent: ((taskStart - lastEnd) / 60000 / totalMinutes) * 100,
        });
      }

      let taskEnd = idx < sortedTasks.length - 1 ? sortedTasks[idx + 1].startDate : logout;
      timeline.push({
        type: task.status.toLowerCase(),
        taskName: task.taskName,
        start: taskStart,
        end: taskEnd,
        minutes: (taskEnd - taskStart) / 60000,
        percent: ((taskEnd - taskStart) / 60000 / totalMinutes) * 100,
      });

      lastEnd = taskEnd;
    });

    if (lastEnd < logout) {
      timeline.push({
        type: "idle",
        start: lastEnd,
        end: logout,
        minutes: (logout - lastEnd) / 60000,
        percent: ((logout - lastEnd) / 60000 / totalMinutes) * 100,
      });
    }

    return timeline;
  };

  const TimelineBar = ({ loginAt, logoutAt, tasks }) => {
    const segments = buildTimeline(loginAt, logoutAt, tasks);

    const officeStart = new Date();
    officeStart.setHours(10, 0, 0, 0);
    const login = new Date(loginAt);
    let loginDeviationText = "";
    if (login > officeStart) {
      const lateMinutes = Math.round((login - officeStart) / 60000);
      loginDeviationText = `Late by ${lateMinutes} min`;
    } else if (login < officeStart) {
      const earlyMinutes = Math.round((officeStart - login) / 60000);
      loginDeviationText = `Early by ${earlyMinutes} min`;
    }

    return (
      <div className="flex h-3 gap-[1px] relative">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-sm cursor-pointer transition-transform duration-200
              ${seg.type === "idle" ? "bg-gray-400 hover:bg-black"
              : seg.type === "paused" ? "bg-yellow-500 hover:bg-gray-400"
              : seg.type === "ongoing" ? "bg-green-500 hover:bg-gray-400"
              : "bg-gray-600 hover:bg-gray-400"
              } ${!logoutAt && seg.type === "idle" ? "bg-gray-400" : ""} hover:scale-y-150 relative group`}
            style={{ flex: seg.percent }}
          >
            <div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2
                pointer-events-none bg-black text-white text-[8px] px-1 py-0.5 rounded
                whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
            >
              {seg.taskName ? seg.taskName : seg.type} <br />
              {seg.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
              {seg.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              {idx === 0 && loginDeviationText && (
                <div className="text-white">{loginDeviationText}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const isCurrentUser = (item) => {
    if (!selfUser || !item) {
      console.log("SelfUser or item is null/undefined:", { selfUser, item });
      return false;
    }

    const selfMobile = (selfUser.mobile || selfUser.mobileNumber || "").trim();
    const itemMobile = (item.mobile || "").trim();
    const selfId = selfUser.id || "";
    const itemId = item.id || "";
    const selfName = (selfUser.name || "").toLowerCase().trim();
    const itemName = (item.name || "").toLowerCase().trim();

    console.log("Debug - Comparing:", { selfMobile, itemMobile, selfId, itemId, selfName, itemName });
    return selfMobile === itemMobile || (selfId && itemId && selfId === itemId) || (selfName && itemName && selfName === itemName);
  };

  if (loading) {
    return (
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="text-center">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="md:w-1/2 w-full flex flex-col">
      <div className="flex gap-4 items-center justify-between p-2 sticky top-12 bg-white z-10">
        <div className="flex gap-4 px-3">
          <span className="flex items-center gap-1"><BookCheck size={16} />1</span>
          <span className="flex items-center gap-1"><SquareCheckBig size={16} />2</span>
          <span className="flex items-center gap-1"><CircleAlert size={16} /></span>
          <span
            className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
            onClick={() => handleCheckout(selfUser?.id)}
            title="Check Out"
          >
            <LogOut size={16} />
          </span>
          <span className="flex items-center gap-1"><Clock size={16} /></span>
          <span
            className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
            onClick={handleCheckin}
            title="Check In"
          >
            <Home size={16} />
          </span>
        </div>

        {/* right hastag */}
        <div className="flex items-center">
          {["Status"].map((label, i) => (
            <div key={i} className="p-2 text-xs cursor-pointer pr-7">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>{label}<DownOutlined /></Space>
                </a>
              </Dropdown>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.length > 0 ? (
          users.map((item) => (
            <div
              key={item.id}
              className={`w-full p-3 ${item.userStatus === "loggedOut" ? "opacity-50" : ""} group/active-row`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-sm">{item.username}</span>
                <span className="text-xs text-gray-500">
                  {item.loginAt
                    ? new Date(item.loginAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "--"}
                  {item.logoutAt
                    ? " - " + new Date(item.logoutAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : ""}
                </span>
              </div>

              {item.tasks && item.tasks.length > 0 ? (
                <TimelineBar loginAt={item.loginAt} logoutAt={item.logoutAt} tasks={item.tasks} />
              ) : (
                <div className="h-1 bg-gray-200 rounded"></div>
              )}

              <div className="mt-1 text-xs text-gray-500 flex justify-between items-center relative group/active-row">
                <span className="flex items-center gap-2 relative">
                  {item.userStatus === "active" ? (
                    <>
                      <span>Active</span>
                      {isCurrentUser(item) && (
                        <button
                          className="ml-2 px-2 py-0.5 text-xs bg-black text-white rounded hidden group-hover/active-row:inline-block transition"
                          onClick={() => handleCheckout(item.id)}
                          type="button"
                          style={{ marginLeft: "8px" }}
                        >
                          Check Out
                        </button>
                      )}
                    </>
                  ) : (
                    <span>Logged Out</span>
                  )}
                </span>
                <span>{item.tasks?.length || 0} tasks</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">No user data available</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSide;