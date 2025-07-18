
import type { FC } from "react"
import { CryptoCurrencies as Crypto } from '@/components/custom'
import { useGetCoins } from "@/state/queries"

const CryptoCurrencies: FC = () => {
  const { data, isLoading, isError, error } = useGetCoins({ limit: '50' })
  const coins = data?.coins

  return (
    isLoading ? <div>Loading...</div> :
    isError ? <div>Error: {error?.message}</div> :
    !coins || coins.length === 0 ? <div>No coins available</div> :
    coins && coins.length > 0 &&
    <Crypto coins={coins}/>
  )
}

export default CryptoCurrencies