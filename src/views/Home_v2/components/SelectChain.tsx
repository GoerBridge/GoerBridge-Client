import React from 'react'
import { Flex, Text, Box } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { ArrowDownIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'

interface Props {
  data?: any,
  onSelect?: () => void,
  selectTitle?:string
}

function SelectChain({ data, onSelect, selectTitle }: Props) {

  const { chainid, title } = data

  return (
    <SelectWrap onClick={onSelect}>
      <Text>{selectTitle}</Text>
      <Flex bg="#f5f7fc" p={2} style={{ borderRadius: 10, minWidth: 220 }} justifyContent="space-between">
        <ChainLogo chainId={chainid} />
        <Text>{title || " Select Network"}</Text>
        <ArrowDownIcon color='red' />
      </Flex>
    </SelectWrap>
  )
}

const SelectWrap = styled.div`
  display:flex ;
  align-items:center ;
  gap:15px;
  svg path {
    fill:#000
  }
`

export default SelectChain