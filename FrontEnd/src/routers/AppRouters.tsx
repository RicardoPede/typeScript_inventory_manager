import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Inventory from '../pages/inventory/Inventory'
import CategoryMakeCarrousel from '../pages/category/CategoryMakeCarrousel'
import Register from '../pages/Register'
import Users from '../pages/users/user'
import MovementHistoryPage from '../pages/movement/MovementHistories'
import RegisterMovement from '../pages/movement/components/RegisterMovement'
import PrivateRoute from './PrivateRoutes'
import MainLayout from '../pages/components/MainLayout'
import Make from '../pages/make/Make'

export default function AppRouters() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute component={() => <MainLayout><Home /></MainLayout>} />} />
            <Route path="/inventory" element={<PrivateRoute component={() => <MainLayout><Inventory /></MainLayout>} />}/>
            <Route path="/category" element={<PrivateRoute component={() => <MainLayout><CategoryMakeCarrousel /></MainLayout>} />} />
            <Route path="/user" element={<PrivateRoute component={() => <MainLayout><Users /></MainLayout>} />} />
            <Route path="/reports" element={<PrivateRoute component={() => <MainLayout><MovementHistoryPage /></MainLayout>} />} />
            <Route path="/reports/registermovement" element={<PrivateRoute component={() => <MainLayout><RegisterMovement /></MainLayout>} />} />
        </Routes>
    </Router>
  )
}
