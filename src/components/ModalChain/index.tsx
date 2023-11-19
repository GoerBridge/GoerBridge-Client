import React from 'react'
import styled from 'styled-components'
import CardPopup from 'react-modal'
import { Text, CloseIcon, Box } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'

interface Props {
  title?: string
  isOpen?: boolean
  onRequestClose?: (val: any) => void
  onAfterOpen?: () => void
  content?: any
  data?: any
  currency?: any
}

const ModalChain: React.FC<Props> = ({ isOpen, onRequestClose, onAfterOpen, data, currency }) => {
  const { blockchainList, chainId, titlePopup } = data

  const _renderContent = () => {
    if (blockchainList.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Text color="red" bold pl="12px" fontSize={[18, , 24]}>
            {!currency ? 'Please Sellect Currency !!!' : 'Not found supported chains'}
          </Text>
        </div>
      )
    }
    return blockchainList?.map((chain) => {
      return (
        <Box
          className="network-item"
          key={chain?.chainid}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            border: '1px solid #ccc',
            padding: '10px 15px',
            borderRadius: '10px',
            marginBottom: '15px',
            opacity: chain?.chainid !== chainId ? 1 : 0.5,
            cursor: chain?.chainid !== chainId ? 'pointer' : 'not-allowed',
          }}
          onClick={() => onRequestClose(chain)}
        >
          <ChainLogo chainId={chain?.chainid} />

          <Text
            color={chain?.chainid === chainId ? 'secondary' : 'text'}
            bold={chain?.chainid === chainId}
            pl="12px"
            fontSize={[12, , 14]}
          >
            {chain?.title}
          </Text>
        </Box>
      )
    })
  }

  return (
    <CardPopup
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      closeTimeoutMS={300}
      style={customStyles}
      shouldCloseOnOverlayClick
      ariaHideApp={false}
    >
      <ContentModal>
        <div className="modal-header">
          <div className="title">
            <Text fontWeight={600} fontSize="15px">
              {titlePopup}
            </Text>
          </div>
          <button type="button" className="close" onClick={() => onRequestClose(null)}>
            <CloseIcon />
          </button>
        </div>
        <Box padding="30px" paddingTop="0">
          {_renderContent()}
        </Box>
      </ContentModal>
    </CardPopup>
  )
}

export default ModalChain

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 21,
  },
  content: {
    backgroundColor: 'transparent',
    border: 'none',
    overflow: 'initial',
    position: 'initial',
  },
}

const ContentModal = styled.div`
  background: #fff;
  width: 380px;
  border-radius: 20px;
  div.img-card {
    margin-top: 20px;
    width: 278px;
    height: 362px;
    margin: auto;
    background: linear-gradient(360deg, #bf893d 0%, #ffd493 137.5%);
    border-radius: 5px;
    padding-left: 1px;
    padding-right: 1px;
    padding-top: 1px;
    img {
      width: 100%;
      height: auto;
    }
  }
  div.modal-header {
    background: #fff;
    height: 80px;
    display: flex;
    align-items: center;
    position: relative;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    button.close {
      position: absolute;
      right: 15px;
      width: 50px;
      height: 50px;
      display: block;
      justify-items: center;
      text-align: center;
      padding-top: 7px;
      border: none;
      background: transparent;
      &:hover {
        cursor: pointer;
      }
      svg {
        width: 16px;
        path {
          stroke: #272727;
        }
      }
    }
    .title {
      flex: 1;
      text-align: center;
    }
  }
  div.modal-content {
    padding: 30px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img-thumb {
      width: 175px;
      height: 227px;
      background: linear-gradient(360deg, #bf893d 0%, #ffd493 137.5%);
      border-radius: 20px;
      padding: 1px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: auto;
        border-radius: 20px;
      }
    }
    .name-nft {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 20px;
    }
    .input-text {
      margin-bottom: 15px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      box-shadow: none;
      background: transparent;
      ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: rgba(255, 255, 255, 0.5);
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgba(255, 255, 255, 0.5);
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .total {
      margin-top: 5px;
      justify-content: space-between;
      width: 90%;
      .price {
        margin-right: 5px;
      }
    }
    .rule {
      cursor: pointer;
    }
  }
`
