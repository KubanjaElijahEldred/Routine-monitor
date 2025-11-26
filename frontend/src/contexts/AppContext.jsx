import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Review code', status: 'To Do', priority: 'Medium' },
  ]);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' },
  ]);

  // Reports State
  const [reports, setReports] = useState([
    { id: 1, title: 'Weekly Update', date: '2023-11-20', type: 'Progress' },
    { id: 2, title: 'Bug Report', date: '2023-11-18', type: 'Issue' },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New task assigned', read: false, date: '2023-11-21' },
    { id: 2, message: 'Project update available', read: true, date: '2023-11-20' },
  ]);

  // CRUD Operations for Tasks
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // CRUD Operations for Team Members
  const addTeamMember = (member) => {
    setTeamMembers([...teamMembers, { ...member, id: Date.now() }]);
  };

  const updateTeamMember = (id, updatedMember) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, ...updatedMember } : member
    ));
  };

  const deleteTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  // CRUD Operations for Reports
  const addReport = (report) => {
    setReports([...reports, { ...report, id: Date.now() }]);
  };

  const updateReport = (id, updatedReport) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, ...updatedReport } : report
    ));
  };

  const deleteReport = (id) => {
    setReports(reports.filter(report => report.id !== id));
  };

  // CRUD Operations for Notifications
  const addNotification = (notification) => {
    setNotifications([...notifications, { ...notification, id: Date.now() }]);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        teamMembers,
        reports,
        notifications,
        addTask,
        updateTask,
        deleteTask,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addReport,
        updateReport,
        deleteReport,
        addNotification,
        markAsRead,
        deleteNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
