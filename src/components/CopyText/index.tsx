import { ReactNode, useState } from 'react'
import { Box } from '@pancakeswap/uikit'
import { copyText } from '@pancakeswap/utils/copyText'
import styled from 'styled-components'

const Tooltip = styled.div<{
  isTooltipDisplayed: boolean
  tooltipTop: number
  tooltipRight: number
  tooltipFontSize?: number
}>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline' : 'none')};
  position: absolute;
  padding: 8px;
  top: ${({ tooltipTop }) => `${tooltipTop}px`};
  right: ${({ tooltipRight }) => (tooltipRight ? `${tooltipRight}px` : 0)};
  text-align: center;
  font-size: ${({ tooltipFontSize }) => `${tooltipFontSize}px` ?? '100%'};
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  width: max-content;
`

interface CopyButtonProps {
  text: string
  tooltipMessage: string
  tooltipTop: number
  tooltipRight?: number
  tooltipFontSize?: number
  children?: ReactNode
}

export const CopyText: React.FC<CopyButtonProps> = ({
  text,
  tooltipMessage,
  tooltipTop,
  tooltipRight,
  tooltipFontSize,
  children,
  ...props
}) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

  const displayTooltip = () => {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  return (
    <>
      <Box style={{ cursor: 'pointer' }} onClick={() => copyText(text, displayTooltip)} {...props}>
        {children}
      </Box>
      <Tooltip
        isTooltipDisplayed={isTooltipDisplayed}
        tooltipTop={tooltipTop}
        tooltipRight={tooltipRight}
        tooltipFontSize={tooltipFontSize}
      >
        {tooltipMessage}
      </Tooltip>
    </>
  )
}
