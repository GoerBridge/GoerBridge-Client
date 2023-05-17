import { Flex, Text } from '@pancakeswap/uikit'
import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledInput = styled.div`
  position: relative;

  .input_value {
    width: 100%;
    height: 52px;
    border-radius: 12px;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 3px 12px;

    ${({ theme }) => theme.mediaQueries.sm} {
      height: 60px;
      padding: 5px 24px;
    }

    input {
      color: #000;
      font-size: 14px;
      line-height: 23px;
      /* padding: 2px 4px; */

      flex: 1 1 auto;
      background: transparent;
      width: 100%;
      height: 100%;
      border: unset;
      background: transparent;

      &:hover,
      &:focus {
        border: unset;
        outline: unset;
      }

      ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 16px;
        /* padding: 2px 10px; */
      }
    }
  }
  .error_message {
    position: absolute;
    top: 82%;
    left: 0;
  }
`

interface Props {
  labelLeft?: ReactNode
  labelRight?: ReactNode
  leftInput?: ReactNode
  rightInput?: ReactNode
  errorMess?: string
  placeholder?: string
  inputType?: 'number' | 'text'
  [t: string]: any
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const WInput: React.FC<Props> = ({
  labelLeft,
  labelRight,
  leftInput,
  rightInput,
  errorMess,
  placeholder,
  onUserInput,
  inputType = 'text',
  ...props
}) => {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  const inputNumberProps =
    inputType === 'number'
      ? {
        pattern: '^[0-9]*[.,]?[0-9]*$',
        minLength: 1,
        maxLength: 14,
      }
      : {}

  return (
    <StyledInput>
      <Flex mb="6px" justifyContent="space-between" alignItems="center">
        {labelLeft && (
          <Text fontSize={[14, , 16]} bold>
            {labelLeft}
          </Text>
        )}
        {labelRight && (
          <Text fontSize="14px" color="#D2D2DB">
            {labelRight}
          </Text>
        )}
      </Flex>
      <div className="input_value">
        {leftInput && <div className="left_input">{leftInput}</div>}
        <input
          autoComplete="off"
          autoCorrect="off"
          placeholder={placeholder}
          spellCheck="false"
          onChange={(event) => {
            if (inputType === 'number') {
              // replace commas with periods, because we exclusively uses period as the decimal separator
              enforcer(event.target.value.replace(/,/g, '.'))
            } else {
              onUserInput(event.target.value)
            }
          }}
          {...inputNumberProps}
          {...props}
        />
        {rightInput && <div className="right_input">{rightInput}</div>}
      </div>
      {errorMess && (
        <Text className="error_message" color="red" fontSize="12px" mt="2px">
          {errorMess}
        </Text>
      )}
    </StyledInput>
  )
}

export default WInput
