import React from 'react'

const BlockMethod = ({ props }) => {
  return (
    <div className="block-contract">
      <div className="left">{props}</div>
      <div className="right">
        <img src="/images/icon/link-2.png" alt="" />
        <img src="/images/icon/arrow-right-black.png" alt="" />
      </div>
    </div>
  )
}

export default BlockMethod
