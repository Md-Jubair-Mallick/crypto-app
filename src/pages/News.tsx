import { ErrorAlert, SkeletonCard } from '@/components/custom'
import { useGetNews } from '@/state/queries'
import { Card, Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography;
export type NewsType = {
  uuid: string;
  title: string;
  url: string;
  thumbnail?: string;
  createdAt: string;
}

const News = () => {
  const { data, isLoading, error, isError } = useGetNews({})
  console.log(data)
  if (isLoading) return <SkeletonCard />
  if (isError) return <ErrorAlert error={error?.message || ''} />

  return (
    <div className="my-6">
      <Title level={2} className='heading py-5'>Latest Crypto News</Title>

      <Row gutter={[32, 32]}>
        {data?.map((news:NewsType, index: number) => (
          <Col xs={24} sm={12} lg={6} key={news?.uuid || index}>
            <Link to={news?.url}>
              <Card title={news?.title}
                hoverable
              >
                <img src={news?.thumbnail} className='object-contain h-50' />
                <p className="my-5">Click to see description</p>
                <p className="mt-5">{news?.createdAt}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News