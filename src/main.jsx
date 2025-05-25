// 从 React 库中引入 StrictMode，这是一个帮助开发时发现潜在问题的工具
import { StrictMode } from 'react'

// 从 react-dom/client 中引入 createRoot，用于创建 React 应用的根节点（React 18 新写法）
import { createRoot } from 'react-dom/client'

// 引入全局样式文件 index.css
import './index.css'

// 引入我们自己编写的主组件 App
import App from './App.jsx'

// 创建 React 根节点，将 React 应用挂载到 HTML 中 id 为 "root" 的元素上
createRoot(document.getElementById('root')).render(
  // 使用 <StrictMode> 包裹 App 组件，启用严格模式，帮助检测潜在问题（仅在开发模式生效）
  <StrictMode>
    <App />
  </StrictMode>,
)
