
import type { FC } from "react"
import { CryptoCurrencies as Crypto } from '@/components/custom'
import { useGetCoins } from "@/state/queries"

const CryptoCurrencies: FC = () => {
  const { data, isLoading, isError, error } = useGetCoins({ limit: '50' })
  const coins = data?.coins

  return (
    <Crypto coins={coins}/>
  )
}

export default CryptoCurrencies