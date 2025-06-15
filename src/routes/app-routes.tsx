import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/home"
import { Room } from "../pages/room"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route
        path="*"
        element={
          <div>
            <h1>Página no encontrada</h1>
          </div>
        }
      />
    </Routes>
  )
}

export default AppRoutes