import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'

import styled from 'styled-components'

interface ValueProps {
  value: string | number
  decimals?: number
  fontSize?: string | number
  color?: string
}

const Value: React.FC<ValueProps> = ({ value, decimals, fontSize, color }) => {
  const [start, updateStart] = useState(0)
  const [end, updateEnd] = useState(0)

  useEffect(() => {
    if (typeof value === 'number') {
      updateStart(end)
      updateEnd(value)
    }
  }, [value])

  return (
    <StyledValue style={{ fontSize: fontSize, color }}>
      {typeof value == 'string' ? (
        value
      ) : (
        <CountUp
          start={start}
          end={end}
          decimals={
            decimals !== undefined ? decimals : end < 0 ? 4 : end > 1e5 ? 0 : 3
          }
          duration={1}
          separator=","
        />
      )}
    </StyledValue>
  )
}

const StyledValue = styled.div`
  font-family: 'Roboto Mono';
  color: ${(props) => props.theme.colors.primary};
  font-size: 40px;
  font-weight: 400;
  @media (max-width: 500px) {
    font-size: 30px;
  }
`

export default Value
