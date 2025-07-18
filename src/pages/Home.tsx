// import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Statistic, Typography } from "antd";
import { useGetCoins, useGetExchange } from '@/state/queries';
import millify from 'millify'
import { ErrorAlert, SkeletonCard } from '@/components/custom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { navigationMenuItem } from '@/contents';
import { CryptoCurrencies as Crypto } from '@/components/custom'

const { Title } = Typography

const Home = () => {
  const cryptoLink = navigationMenuItem?.find(item => item?.label === 'Cryptocurrencies')

  const { data, isLoading, isError, error } = useGetCoins({ limit: '10' })
  const stats = data?.stats
  const coins = data?.coins

  const { exData, exIsLoading, exIsError, exError } = useGetExchange({ per_page: '10', page: '1' })
  const exchanges = exData;

  console.log(stats, coins)
  if (isLoading && exIsLoading) return <SkeletonCard />
  if (isError) return <ErrorAlert error={error?.message || ''} />
  if (exIsError) return <ErrorAlert error={exError?.message || ''} />
  return (
    <div className='py-6'>
      <div className="my-6">
        <Title level={2} className='heading'>Global Crypto Stats</Title>

        <Row gutter={16} className=''>
          <Col span={12}>
            <Statistic title={'Total Crypto Currencies'} value={millify(stats?.totalCoins)} />
          </Col>
          <Col span={12}>
            <Statistic title={'Total Markets'} value={millify(stats?.totalMarkets)} />
          </Col>
          <Col span={12}>
            <Statistic title={'Total Exchanges'} value={millify(stats?.totalExchanges)} />
          </Col>
          <Col span={12}>
            <Statistic title={'Total Market Cap'} value={millify(stats?.totalMarketCap)} />
          </Col>
          <Col span={12}>
            <Statistic title={'Total Volume (24h)'} value={millify(stats?.totalExchanges)} />
          </Col>
        </Row>
      </div>

      <Crypto coins={coins} >
        <Button className='my-6 mx-auto' variant={'outline'}>
          <Link to={cryptoLink?.path}>
            See More
          </Link>
        </Button>
      </Crypto>

      <div className="my-6">
        <Title level={2} className='heading'>Top 10 Exchanges in the world</Title>

        <Row gutter={[32, 32]}>
          {exchanges?.map((item, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Link to={`${item?.url}`}>
                <Card
                  title={`${item?.name}`}
                  extra={<img src={item?.image} alt='icon' className='w-7 rounded-full' />}
                  hoverable
                >
                  <p>Country: {item?.country}</p>
                  <p>Year Established: {item?.year_established}</p>
                  <p>Trust Score Rank: {item?.trust_score_rank}</p>
                  <p>Trust Score: {item?.trust_score}</p>
                  <p>Trade Volume 24h BTC: {millify(item?.trade_volume_24h_btc)}</p>
                  <p>Trading Incentive: {item?.has_trading_incentive ? "Yes" : "No"}</p>
                  <p>Description: ... </p>
                </Card>
              </Link>
            </Col>
          ))}
          <Col span={12}>
            <Button className='my-6 mx-auto' variant={'outline'}>
              <Link to={cryptoLink?.path}>
                See More
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home
