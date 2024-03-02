import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ABI_ACTION_TYPE } from 'state/admin/types'
import ResultText from './ResultText'
import ResultForm from './ResultForm'

const ContractResultStyled = styled.div``

const ContractResult = ({ type, address, abi, contract }) => {
  const [valueConstant, setValueConstant] = useState(undefined)
  const [valueForm, setValueForm] = useState({
    status: undefined,
    data: null,
    error: null,
    loading: false,
  })

  useEffect(() => {
    async function fetchViewData() {
      if (address && contract && abi.inputs?.length <= 0) {
        try {
          const result = await contract[abi.name]()
          setValueConstant(result)
        } catch (error) {
          console.error(`fetch ${abi.name} error`, error)
        }
      }
    }
    fetchViewData()
  }, [abi.name, address, contract, abi])

  const onSubmitRead = async (form) => {
    if (address && contract && abi.inputs?.length > 0) {
      try {
        const parseParams = []
        for (let i = 0; i < Object.values(form).length; i++) {
          const v = Object.values(form)[i]
          parseParams.push(v)
        }

        if (parseParams.length !== abi.inputs?.length) return

        setValueForm({ ...valueForm, loading: true, data: null, error: null })

        const result = await contract[abi.name](...parseParams)
        setValueForm({ ...valueForm, loading: false, status: true, data: result })
      } catch (error) {
        console.error(`fetch ${abi.name} error`, error)
        setValueForm({ ...valueForm, loading: false, status: false, error })
      }
    }
  }

  const onSubmitWrite = async (form) => {
    if (address && contract && abi.inputs?.length > 0) {
      try {
        const parseParams = []
        for (let i = 0; i < Object.values(form).length; i++) {
          const v = Object.values(form)[i]
          parseParams.push(v)
        }

        if (parseParams.length !== abi.inputs?.length) return

        setValueForm({ ...valueForm, loading: true, data: null, error: null })

        const result = await contract[abi.name](...parseParams)
        setValueForm({ ...valueForm, loading: false, status: true, data: result })
      } catch (error) {
        console.error(`fetch ${abi.name} error`, error)
        setValueForm({ ...valueForm, loading: false, status: false, error })
      }
    }
  }

  const handleSubmitForm = (form) => {
    if (type === ABI_ACTION_TYPE.read) {
      onSubmitRead(form)
    } else {
      onSubmitWrite(form)
    }
  }

  return (
    <ContractResultStyled>
      {type === ABI_ACTION_TYPE.write || abi.inputs?.length > 0 ? (
        <ResultForm address={address} abi={abi} type={type} result={valueForm} onSubmit={handleSubmitForm} />
      ) : (
        <ResultText address={address} result={valueConstant} abi={abi} />
      )}
    </ContractResultStyled>
  )
}

export default ContractResult
