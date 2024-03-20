/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link'

const NextLink = (props) => {
  const isHttp = props.href?.startsWith('http')
  if (props.href && isHttp) {
    return (
      <a className={props.className} href={props.href} rel="noreferrer" onClick={props.onClick} {...props}>
        {props.children}
      </a>
    )
  }
  if (!props.href) {
    return (
      <a className={props.className} onClick={props.onClick} {...props}>
        {props.children}
      </a>
    )
  }
  return (
    <Link href={props.href} {...props}>
      <a className={props.className} onClick={props.onClick}>
        {props.children}
      </a>
    </Link>
  )
}

NextLink.defaultProps = {
  className: '',
}

export default NextLink
