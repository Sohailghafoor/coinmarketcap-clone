import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';

const coinGecoClient =new CoinGecko();

export default function Home(props) {
  const { data } = props.result;
  console.log(data);
  const formatPercent = number => 
  `${new Number(number).toFixed(2)}%`
  const formatDollar = (number, maximumSignificantDigits) =>
  new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'usd',
      maximumSignificantDigits
    }
  )
  .format(number);
  return (
    <div className={styles.container}>
      <Head>
        <title>CoinMarketCap Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 >CoinMarketCap Clone</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market cap</th>        
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
              <td>
                <img
                  src={coin.image}
                  style={{width: 25, height: 25, marginRight: 10}}
                  />
                {coin.symbol.toUpperCase()}</td>
                <td> 
<span
     className={coin.price_change_percentage_24h > 0 ? (
        'text-success') : 'text-danger'} >
     {formatPercent(coin.price_change_percentage_24h)}
</span>
              
</td>
              <td>{formatDollar(coin.current_price,20)}</td>
              <td>{formatDollar(coin.market_cap, 12)}</td>
            </tr>
          ))}
        </tbody>
      </table>
   </div>
  )
}
export async function getServerSideProps(context) {
  const params ={
    oder: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await coinGecoClient.coins.markets({params});
  return {
    props: {
      result
    }
  };
}
