// export const BASE_URL="https://task-manager-server-j5gu.onrender.com"

//本地测试
//export const BASE_URL = "http://localhost:8000"
export const BASE_URL = "http://54.219.50.64:8000" // AWS


//utils/apiPath.js
export const API_PATHS ={
    AUTH:{
        REGISTER:"/api/auth/register", // Register a new user (Admin or Member)
        LOGIN:"/api/auth/login", // Authenticate user & return JWT token
        GET_PROFILE:"/api/auth/profile", // Get logged-in user details
    },
    USERS:{
        GET_ALL_USERS:"/api/users", // Get all users (Admin only)
        GET_USER_BY_ID:(userId) =>`/api/users/${userId}`,
        CREATE_USER:"/api/users", // Create a new user (Admin only)
        UPDATE_USER:(userId) =>`/api/users/${userId}`,
        DELETE_USER:(userId) =>`/api/users/${userId}`,

    },
    TASKS:{
        GET_DASHBOARD_DATA:"/api/tasks/dashboard-data",// Get Dashboard Data
        GET_USER_DASHBOARD_DATA:"/api/tasks/user-dashboard-data", // Get User Dashboard Data
        GET_ALL_TASKS:"/api/tasks", // Get all tasks Admin:all,User:only assigned tasks
        GET_TASK_BY_ID:(taskId)=>`/api/tasks/${taskId}`,
        CREATE_TASK:"/api/tasks", // Create a new task (Admin only)
        UPDATE_TASK:(taskId)=>`/api/tasks/${taskId}`,
        DELETE_TASK:(taskId)=>`/api/tasks/${taskId}`,

        UPDATE_TASK_STATUS:(taskId)=>`/api/tasks/${taskId}/status`,
        UPDATE_TODO_CHECKLIST:(taskId)=>`/api/tasks/${taskId}/todo`,
    },
    REPORTS:{
        EXPORT_TASKS:"/api/reports/export/tasks", // Download all tasks as an excel report
        EXPORT_USERS:"/api/reports/export/users", // Download user-task report
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image",
    },
}