import AdminHomePage from 'views/Admin/Home'
import AdminLayout from 'components/Admin/Layout'
import { chains } from 'utils/wagmi'

const pageSupportedChains = chains.map((chain) => chain.id)

const Admin = () => {
  return <AdminHomePage />
}

Admin.chains = pageSupportedChains
Admin.mp = true
Admin.Layout = AdminLayout
export default Admin
