import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${(props) => props.theme.colors.cardBg};
  display: flex;
  border-radius: 32px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 800;
  flex: 1;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  padding: 16px 0;
`

export default Card
