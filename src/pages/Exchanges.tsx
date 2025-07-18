import { Exchanges as Exchange, SkeletonCard } from '@/components/custom'
import { useGetExchange } from '@/state/queries'

const Exchanges = () => {
  const { exData, exIsLoading, exIsError, exError } = useGetExchange({ per_page: '50', page: '1' })
  const exchanges = exData

  return (
    <>
      {exIsLoading && <SkeletonCard />}
      {exIsError && <div>Error: {exError?.message}</div>}
      {!exIsLoading && !exIsError && exchanges && exchanges.length > 0 &&
        <Exchange exchanges={exchanges} />
      }
      {!exIsLoading && !exIsError && exchanges && exchanges.length === 0 &&
        <div>No exchanges found.</div>
      }
    </>
  )
}

export default Exchanges