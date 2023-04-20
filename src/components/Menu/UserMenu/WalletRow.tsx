import { ReactNode } from 'react'
import { Box, Flex, FlexProps } from '@pancakeswap/uikit'
import styled from 'styled-components'

interface WalletRowProps extends FlexProps {
  leftNode: ReactNode
  rightNode: ReactNode
}

const Wrapper = styled(Flex)`
  align-items: center;
  /* background-color: ${({ theme }) => theme.colors.dropdown}; */
  height: 68px;
  background: #000000;
  border-radius: 12px;
  position: relative;
`

const Address = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  flex: 1;
  position: relative;
  padding-left: 24px;
`

const WalletRow: React.FC<WalletRowProps> = ({ leftNode, rightNode, ...props }) => {
  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Address>{leftNode}</Address>
        <Flex margin="12px 24px">
          <Address>{rightNode}</Address>
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default WalletRow
