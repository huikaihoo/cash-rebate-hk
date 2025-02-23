import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TopNavBar from './TopNavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TopNavBar />
    <div className="max-w-[840px] mx-auto p-4">
      <App />
    </div>
  </StrictMode>,
)
