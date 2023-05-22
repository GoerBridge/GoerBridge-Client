import styled from 'styled-components'
import { Box, Text, Flex, Button } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { formatCode } from 'helpers'
import { getBlockExploreLink } from 'utils'
import { ApprovalState } from 'hooks/useApproveCallback'

const TransferContentStyled = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: none;
    /* height: 90vh; */
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
    height: auto;
  }

  button {
    background: #052c83;
    // box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;
    border-radius: 8px;
  }

  button:disabled {
    background: #e0e0eb;
    color: rgb(143, 155, 179);
  }

  .box-transfer {
    // background: #000000;
    border-radius: 12px;
    padding: 24px 16px;
    margin-bottom: 24px;

    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 24px;
    }

    .wIcon {
      > svg {
        width: 28px;
        height: 28px;
        ${({ theme }) => theme.mediaQueries.sm} {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
`

export const TransferContent = ({ dataModal, approvalState, handleApprove, loading, handleTransfer }) => {
  const { fromNetwork, toNetwork, currency, address, sendAmount, receiveAmount, gasFee, native } = dataModal || {}

  return (
    <TransferContentStyled>
      <div className="box-transfer">
        <Text fontSize={[16, , 20]} mb={[12, 24]}>
          From
        </Text>
        <Flex justifyContent="space-between" mb={[12, 24]}>
          <Flex alignItems="center">
            <Box className="wIcon" mr="6px">
              <ChainLogo chainId={fromNetwork.chainid} />
            </Box>
            <Text fontSize={[14, , 16]} ml={[0, , '10px']}>
              {fromNetwork.title}
            </Text>
          </Flex>
          <Text fontSize={[14, , 16]} textAlign="right">
            -{sendAmount} {currency.code}
          </Text>
        </Flex>{' '}
        <Flex justifyContent="space-between">
          <Text fontSize={[14, , 16]}>Address</Text>
          <Text
            as="a"
            fontSize={[14, , 16]}
            textAlign="right"
            href={getBlockExploreLink(currency.token_address, 'address', fromNetwork.chainid)}
            target="_blank"
            rel="noreferrer"
          >
            {formatCode(address, 8, 8)}
          </Text>
        </Flex>
      </div>
      <div className="box-transfer">
        <Text fontSize={[16, , 20]} mb={[12, 24]}>
          To
        </Text>
        <Flex justifyContent="space-between" mb={[12, 24]}>
          <Flex alignItems="center">
            <Box className="wIcon" mr="6px">
              <ChainLogo chainId={toNetwork.chainid} />
            </Box>
            <Text fontSize={[14, , 16]}>{toNetwork.title}</Text>
          </Flex>
          <Text fontSize={[14, , 16]} textAlign="right">
            +{receiveAmount} {currency.code}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize={[14, , 16]}>Address</Text>
          <Text
            as="a"
            fontSize={[14, , 16]}
            textAlign="right"
            href={getBlockExploreLink(currency.token_address, 'address', toNetwork.chainid)}
            target="_blank"
            rel="noreferrer"
          >
            {formatCode(address, 8, 8)}
          </Text>
        </Flex>
      </div>
      <div className="card-info">
        <Flex justifyContent="space-between" mb="5px">
          <Text fontSize={['13px', '', '16px']} color="#008037">
            System Fee ({currency?.system_fee || '--'}%):
          </Text>
          <Text fontSize={['13px', '', '16px']} color="#F98C36">
            {+sendAmount * (+currency?.system_fee / 100)}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="5px">
          <Text fontSize={['13px', '', '16px']} color="#008037">
            Gas Fee:
          </Text>
          <Text fontSize={['13px', '', '16px']} color="#F98C36">
            {gasFee || '--'} {native?.symbol}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="5px">
          <Text fontSize={['13px', '', '16px']} color="#008037">
            Estimated Time:
          </Text>
          <Text fontSize={['13px', '', '16px']} color="#F98C36">
            60 seconds
          </Text>
        </Flex>
      </div>
      <Flex justifyContent="center" mt="24px">
        {approvalState !== ApprovalState.APPROVED ? (
          <Button width="100%" height="44px" onClick={handleApprove}>
            Approve
          </Button>
        ) : (
          <Button width="100%" height="44px" disabled={loading} onClick={handleTransfer}>
            Confirm
          </Button>
        )}
      </Flex>
    </TransferContentStyled>
  )
}

const TransferSuccessContentStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #052c83;

  > img {
    width: 300px;
    height: 300px;
  }
`

export const TransferSuccessContent = ({ onDismiss }) => {
  return (
    <TransferSuccessContentStyled>
      <img src="/images/tick-success.png" alt="" />
      <Text m={['32px 0 16px', , '64px 0 16px']} bold fontSize={[20, , 24]}>
        Transfer successfully!
      </Text>
      <Flex width="100%">
        <Button width="100%" onClick={onDismiss}>
          Done
        </Button>
      </Flex>
    </TransferSuccessContentStyled>
  )
}
