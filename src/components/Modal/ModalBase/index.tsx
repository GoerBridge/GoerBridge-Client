/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

const WModalBase = styled(Modal)`
  padding: 12px;
  .modal-base-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.35rem;
    outline: 0;
  }
  .modal-base-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 16px;
    border-bottom: 1px solid #e7eaf3;
    border-top-left-radius: calc(0.35rem - 1px);
    border-top-right-radius: calc(0.35rem - 1px);
  }

  .modal-base-title {
    color: var(--text);
    font-size: 18px;
    font-weight: 500;
  }
  .modal-base-close-ico {
    color: var(--text);
    font-size: 32px;
    font-weight: 400;
    line-height: 1;
    cursor: pointer;
  }

  .modal-base-content {
    padding: 16px;
  }
`

const ModalBase = ({ isOpen, title, maxWidth = '500px', onClose, children, ...props }) => {
  return (
    <WModalBase
      isOpen={isOpen}
      // onAfterOpen={() => {}}
      onRequestClose={onClose}
      ariaHideApp={false}
      closeTimeoutMS={100}
      style={{
        content: {
          width: '100%',
          maxWidth,
          margin: '0 auto',
        },
        overlay: {
          background: 'rgba(0,0,0, 0.4)',
        },
      }}
      {...props}
    >
      <div className="modal-base-body">
        <div className="modal-base-header">
          <div className="modal-base-title">{title}</div>
          <span className="modal-base-close-ico" onClick={onClose}>
            ×
          </span>
        </div>
        <div className="modal-base-content">{children}</div>
      </div>
    </WModalBase>
  )
}

export default ModalBase
