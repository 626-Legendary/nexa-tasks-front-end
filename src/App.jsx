// 引入 React 的 useContext，用于访问上下文中的用户信息
import { useContext } from 'react'

// 引入 react-router-dom 中的必要组件：路由容器、路径配置、重定向等
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'

// 引入管理员页面组件
import Dashboard from "./pages/Admin/Dashboard"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import ManageTasks from "./pages/Admin/ManageTasks"
import CreateTask from "./pages/Admin/CreateTask"
import ManageUsers from "./pages/Admin/ManageUsers"
import AdminMyTasks from "./pages/Admin/AdminMyTasks"

// 引入普通用户页面组件
import UserDashboard from './pages/User/UserDashboard'
import MyTasks from "./pages/User/MyTasks"
import ViewTaskDetails from './pages/User/ViewTaskDetails'

// 引入自定义的私有路由组件，用于保护某些页面需要登录或权限
import PrivateRoute from './routes/PrivateRoute'

// 引入用户上下文，包含 Provider 和上下文本体
import UserProvider, { UserContext } from "./context/userContext"

// 引入 react-hot-toast 用于全局提示信息
import { Toaster } from 'react-hot-toast'

// 主组件 App
const App = () => {
  return (
    // 用 UserProvider 包裹整个应用，使所有组件都能访问用户信息
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* 登录和注册页面的路由，不需要登录就能访问 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* 管理员权限保护的路由 */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/my-tasks" element={<AdminMyTasks />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>

            {/* 普通用户权限保护的路由 */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
            </Route>

            {/* 默认路由：根路径 '/' 会根据登录状态跳转 */}
            <Route path='/' element={<Root />} />
          </Routes>
        </Router>
      </div>

      {/* 全局 toast 提示组件设置 */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

export default App

// 根路径跳转逻辑组件
const Root = () => {
  // 通过上下文获取当前用户信息和加载状态
  const { user, loading } = useContext(UserContext);

  // 如果还在加载用户信息，保留当前页面结构但不跳转
  if (loading) return <Outlet />

  // 如果用户未登录，重定向到登录页
  if (!user) {
    return <Navigate to='/login' />
  }

  // 根据用户角色跳转到不同的主页
  return user.role === 'admin'
    ? <Navigate to="/admin/dashboard" />
    : <Navigate to="/user/dashboard" />
}
