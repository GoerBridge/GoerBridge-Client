import React from 'react'
import styled from 'styled-components'

const FormStyled = styled.form`
  width: 100%;
`

const Form = ({ children, ...props }) => {
  return <FormStyled {...props}>{children}</FormStyled>
}

export default Form
