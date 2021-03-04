import React from 'react'
import styled from 'styled-components'

import Card from '../Card'
import Label from '../Label'
import Value from '../Value'
import Spacer from '../Spacer'
import Button from '../Button'
import SmallValue from '../../views/Syrup/components/Value'

interface StyledLabelProps {
  value: number
  text: string
}

const StyledLabel: React.FC<StyledLabelProps> = ({ value, text }) => {
  return (
    <StyledLabelWrapper>
      <StyledValue>
        <p>{text}</p>
        <SmallValue value={value} />
      </StyledValue>
    </StyledLabelWrapper>
  )
}

interface GenericCardProps {
  title: string
  multiplier: string
  isFinished?: Boolean
  isRunning?: Boolean
  staxEarned?: number
  ctaText: string
  ctaHandler: () => void
  informations: Map<string, string>
}

const GenericCard: React.FC<GenericCardProps> = ({
  title,
  multiplier,
  isFinished,
  isRunning,
  staxEarned,
  ctaText,
  ctaHandler,
  informations,
}) => (
  <CardWrapper>
    <Card>
      <CardContent>
        <StyledCardHeader>
          <Title>{title}</Title>
          <Multiplier>{multiplier}</Multiplier>
        </StyledCardHeader>
        <StyledCardContent>
          {isFinished && <Label text={'Campaign over'} />}
          {isRunning && (
            <>
              <Value value={staxEarned} color="rgba(255, 255, 255, 0.5)" />
              <Spacer size="sm" />
              <Label text={`STAX earned`} />
            </>
          )}
        </StyledCardContent>
        <StyledCardActions>
          <Button
            onClick={ctaHandler}
            size="md"
            text={ctaText}
            borderRadius={32}
          />
        </StyledCardActions>
        <Informations>
          {informations &&
            Object.keys(informations).map((key) => (
              <StyledLabel key={key} text={key} value={informations[key]} />
            ))}
        </Informations>
      </CardContent>
    </Card>
  </CardWrapper>
)

export default GenericCard

const CardWrapper = styled.div`
  width: 350px;
  margin: 16px 0;
`

const CardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0;
  width: 100%;
`

const StyledCardHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`

const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 20px;
  font-weight: 900;
  line-height: 60px;
`

const Multiplier = styled.div`
  line-height: 60px;
  font-size: 24px;
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 900;
  top: 20px;
`

const StyledCardContent = styled.div`
  text-align: center;
  padding: 10px 20px;
  img {
    width: 60px;
    padding: 15px;
  }
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
`

const StyledValue = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`

const Informations = styled.div``

const StyledLabelWrapper = styled.div`
  border-top: 1px solid rgb(118 69 217 / 0.2);
  &:first-child {
    border-top: none;
  }
`
