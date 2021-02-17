import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import useSushi from '../../../hooks/useSushi'
import { getSushiAddress } from '../../../sushi/utils'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import useTokenBalance, { useCakePrice } from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account, connect, status } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  const sushi = useSushi()
  const sushiBalance = useTokenBalance(getSushiAddress(sushi))

  return (
    <StyledAccountButton>
      {!account ? (
        <Button onClick={handleUnlockClick} size="sm" text="Connect Wallet" />
      ) : (
        <Button onClick={onPresentAccountModal} size="sm" text="My Wallet" />
      )}
    </StyledAccountButton>
  )
}

const PriceTag = styled.div`
  position: absolute;
  font-size: 14px;
  color: #7645d9;
  font-weight: 100;
  width: 160px;
  text-align: right;
  right: 0;
  b {
    color: ${(props) => props.theme.colors.primary};
  }
`

const StyledAccountButton = styled.div`
  position: relative;
  display: flex;
  @media (max-width: 850px) {
    display: none;
  }
`

export default AccountButton
