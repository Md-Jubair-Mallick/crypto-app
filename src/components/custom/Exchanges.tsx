import type { FC } from "react"
import { Card, Col, Row, Typography } from "antd"
import { Link } from "react-router-dom"
import millify from "millify"

const { Title } = Typography

type ExchangesProps = {
    exchanges: any[]
    children?: React.ReactNode
}

const Exchanges: FC<ExchangesProps> = ({ exchanges, children }) => {
    return (
        <div className="my-6">
            <Title level={2} className='heading py-5'>Top Exchanges in the world</Title>

            <Row gutter={[32, 32]}>
                {exchanges?.map((item) => (
                    <Col xs={24} sm={12} lg={6} key={item?.id}>
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
            </Row>
            {children}
        </div>
    )
}

export default Exchanges
