import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
  text?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-weight: 300;
  line-height: 40px;
  padding: 0 20px;
`

export default CardTitle
