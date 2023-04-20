import { Box, Text, Flex, FlexProps } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { CopyText } from '../../CopyText'

interface CopyAddressProps extends FlexProps {
  account: string
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
  flex: 1;
  position: relative;
  padding-left: 24px;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    font-weight: 600;
    font-size: 16px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.background}00,
      ${({ theme }) => theme.colors.background}E6
    );
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`

const CopyAddress: React.FC<React.PropsWithChildren<CopyAddressProps>> = ({ account, ...props }) => {
  const { t } = useTranslation()
  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Address title={account}>
          <input type="text" readOnly value={account} />
        </Address>
        <Flex margin="12px 24px">
          <CopyText text={account} tooltipMessage={t('Copied')} tooltipTop={-40}>
            <Text color="#008037" style={{ cursor: 'pointer' }}>
              Copy
            </Text>
          </CopyText>
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default CopyAddress
