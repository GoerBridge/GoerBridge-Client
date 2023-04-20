import { useBreadcrumbsPath } from 'hooks/useBreadcrumbPath'
import { Breadcrumb } from 'antd'
import Link from 'next/link'

const BreadCrumbs = () => {
  const breadCrumb = useBreadcrumbsPath()

  function isNumeric(value) {
    return /^-?\d+$/.test(value)
  }

  return (
    <Breadcrumb style={{ marginBottom: '1rem' }}>
      {breadCrumb.map((route) => {
        return (
          <Breadcrumb.Item key={route.toLocaleLowerCase()}>
            <Link href={`/admin/${route.toLocaleLowerCase()}`}>{route}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default BreadCrumbs
