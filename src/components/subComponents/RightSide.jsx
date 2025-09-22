import React from "react";
import { BookCheck, SquareCheckBig, LogOut, CircleAlert } from "lucide-react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Clock, Home } from "iconsax-reactjs";

const RightSide = () => {
  const cards = [
    {
      id: 1,
      username: "Omkar",
      loginAt: "2025-09-20T10:15:00",
      logoutAt: "2025-09-20T18:50:00",
      userStatus: "active",
      tasks: [
        { taskName: "Check OKR's usage", startedAt: "10:30 AM", status: "completed" },
        { taskName: "Send reminders", startedAt: "12:30 PM", status: "paused" },
        { taskName: "Send reminders", startedAt: "1:00 PM", status: "completed" },
        { taskName: "Update docs again", startedAt: "04:30 PM", status: "ongoing" }
      ]
    },
    {
      id: 2,
      username: "Ashish",
      loginAt: "2025-09-20T11:00:00",
      logoutAt: null,
      userStatus: "active",
      tasks: [
        { taskName: "Follow up", startedAt: "11:10 AM", status: "completed" },
        { taskName: "Client Call", startedAt: "01:15 PM", status: "ongoing" }
      ]
    }
  ];

  const items = [
    { key: "1", label: <a>1st menu item</a> },
    { key: "2", label: <a>2nd menu item</a>, icon: <SmileOutlined />, disabled: true },
    { key: "3", label: <a>3rd menu item (disabled)</a>, disabled: true },
    { key: "4", danger: true, label: "a danger item" }
  ];

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

    // Idle before login
    if (login > officeStart) {
      timeline.push({
        type: "idle",
        start: officeStart,
        end: login,
        minutes: (login - officeStart) / 60000,
        percent: ((login - officeStart) / 60000 / totalMinutes) * 100
      });
    }

    // Sort tasks by start time
    const sortedTasks = tasks
      .map((task) => ({ ...task, startDate: parseTime(task.startedAt) }))
      .sort((a, b) => a.startDate - b.startDate);

    sortedTasks.forEach((task, idx) => {
      const taskStart = task.startDate;

      // Idle segment before this task
      if (taskStart > lastEnd) {
        timeline.push({
          type: "idle",
          start: lastEnd,
          end: taskStart,
          minutes: (taskStart - lastEnd) / 60000,
          percent: ((taskStart - lastEnd) / 60000 / totalMinutes) * 100
        });
      }

      // Task segment
      let taskEnd =
        idx < sortedTasks.length - 1 ? sortedTasks[idx + 1].startDate : logout;
      timeline.push({
        type: task.status.toLowerCase(),
        taskName: task.taskName,
        start: taskStart,
        end: taskEnd,
        minutes: (taskEnd - taskStart) / 60000,
        percent: ((taskEnd - taskStart) / 60000 / totalMinutes) * 100
      });

      lastEnd = taskEnd;
    });

    // Final idle till logout
    if (lastEnd < logout) {
      timeline.push({
        type: "idle",
        start: lastEnd,
        end: logout,
        minutes: (logout - lastEnd) / 60000,
        percent: ((logout - lastEnd) / 60000 / totalMinutes) * 100
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
                : seg.type === "paused" ? "bg-black hover:bg-gray-400"
                  : seg.type === "ongoing" ? "bg-black hover:bg-gray-400"
                    : "bg-black hover:bg-gray-400"
              } hover:scale-y-150 relative group`}
            style={{ flex: seg.percent }}
          >
            {/* Tooltip */}
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

  return (
    <div className="md:w-1/2 w-full flex flex-col">
      {/* Top bar */}
      <div className="flex gap-4 items-center justify-between p-2 sticky top-12 bg-white z-10">
        <div className="flex gap-4 px-3">
          <span className="flex items-center gap-1"><BookCheck size={16} />1</span>
          <span className="flex items-center gap-1"><SquareCheckBig size={16} />2</span>
          <span className="flex items-center gap-1"><CircleAlert size={16} /></span>
          <span className="flex items-center gap-1"><LogOut size={16} /></span>
          <span className="flex items-center gap-1"><Clock size={16} /></span>
          <span className="flex items-center gap-1"><Home size={16} /></span>
        </div>

        <div className="flex items-center">
          {["Hashtags", "Resources", "Status", "Today"].map((label, i) => (
            <div key={i} className="p-2 text-xs cursor-pointer">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>{label}<DownOutlined /></Space>
                </a>
              </Dropdown>
            </div>
          ))}
        </div>
      </div>

      {/* User cards */}
      {cards.map((item) => (
        <div key={item.id} className={`w-full p-3 ${item.userStatus === "loggedOut" ? "opacity-50" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold text-sm">{item.username}</span>
            <span className="text-xs text-gray-500">
              {item.loginAt ? new Date(item.loginAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}
              {item.logoutAt ? " - " + new Date(item.logoutAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
            </span>
          </div>

          <TimelineBar loginAt={item.loginAt} logoutAt={item.logoutAt} tasks={item.tasks} />
          <div className="mt-1 text-xs text-gray-500">
            {item.userStatus === "active" ? "Active" : "Logged Out"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightSide;
