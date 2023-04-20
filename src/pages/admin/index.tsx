import AdminHomePage from 'views/Admin/Home'
import AdminLayout from 'components/Admin/Layout'

const pageSupportedChains = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [5, 97] : [1, 56]

const Admin = () => {
  return <AdminHomePage />
}

Admin.chains = pageSupportedChains
Admin.mp = true
Admin.Layout = AdminLayout
export default Admin
