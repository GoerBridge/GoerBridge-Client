/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import { BsArrowRight, BsArrowDown, BsArrowUp } from 'react-icons/bs'
import styled from 'styled-components'

const WrapCollapseStyled = styled.div<{ isOpen }>`
  border: 0.5px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;

  .collapse-header {
    color: #343a40;
    padding: 4px 16px;
    background: #eeeeee;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .collapse-header-left-title {
      color: var(--text);
      font-size: 16px;
    }
    .collapse-header-right {
      display: flex;
      align-items: center;
      .collapse-icon {
        width: 24px;
        height: auto;
      }
    }
  }

  .collapsed-body {
    flex: 1 1 auto;
    max-height: ${({ isOpen }) => (isOpen ? `fit-content` : '0px')};
    transition: max-height 0.3s ease-out;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }

  .collapsed-body-pd {
    flex: 1 1 auto;
    padding: 16px;
  }
`

const CollapseBase = ({ initOpen = false, title, expandAll, rightNode, content, collapseIcon, ...props }) => {
  const [open, setOpen] = useState(initOpen)
  useEffect(() => {
    // force open or close by expandAll props
    if (expandAll !== undefined) {
      setOpen(expandAll)
    }
  }, [expandAll])
  return (
    <WrapCollapseStyled isOpen={open} {...props}>
      <div className="collapse-header" onClick={() => setOpen((prev) => !prev)}>
        <a className="collapse-header-left-title">{title}</a>
        <div className="collapse-header-right">
          {rightNode}
          {collapseIcon ? (
            collapseIcon?.(open)
          ) : (
            <>
              {open ? (
                <BsArrowDown className="collapse-icon" color="#292D32" rotate="40deg" />
              ) : (
                <BsArrowRight className="collapse-icon" color="#292D32" />
              )}
            </>
          )}
        </div>
      </div>
      <div className="collapsed-body">
        <div className="collapsed-body-pd">{content}</div>
      </div>
    </WrapCollapseStyled>
  )
}

export default CollapseBase
