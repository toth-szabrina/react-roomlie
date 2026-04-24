import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './RoomManager'
import RoomManager from './RoomManager'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RoomManager/>
  </StrictMode>,
)
