import type { FC } from "react"
import { Card, Col, Row, Typography } from "antd"
import millify from "millify"
import { Link } from "react-router-dom"

const { Title } = Typography
const CryptoCurrencies: FC = ({ coins, children }) => {
    return (
        <div className="my-6">
            <Title level={2} className='heading py-5'>Top Cryptocurrencies in the world</Title>


            <Row gutter={[32, 32]}>
                {coins?.map((coin) => (
                    <Col xs={24} sm={12} lg={6} key={coin?.uuid}>
                        <Link to={`/crypto/${coin?.uuid}`}>
                            <Card
                                title={`${coin?.name}. (${coin?.symbol})`}
                                extra={<img src={coin?.iconUrl} alt='icon' className='w-7' />}
                                hoverable
                            >
                                <p>Rank: {coin?.rank}</p>
                                <p>Price: {millify(coin?.price)}</p>
                                <p>Market Cap: {millify(coin?.marketCap)}</p>
                                <p>Change (24h): {millify(coin?.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            {children}
        </div>
    )
}

export default CryptoCurrencies
