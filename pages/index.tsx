import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import useSWR from 'swr';

import CityRankingChart from '../components/CityRankingChart';
import { CITIES } from '../utils/cities';
import Loading from '../components/Loading';

const COMPANY_NAME = 'Village Loot'

interface WaitlistRecord {
  neighborhood: string,
  city: string
} 

interface CityRanking {
  city: string,
  rankings: Ranking[]
}

interface Ranking {
  neighborhood: string,
  count: number
}


const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Home: NextPage = () => {
  const { data: records, error } = useSWR('/api/waitlist', fetcher, { refreshInterval: 1000 })

  const getSortedCountsOfNeighborhoodByCity = (city: string) => {
    if (!records) return [];
    
    const cityRecords = records.filter((record: WaitlistRecord) => record.city === city);

    const neighborhoodCountsMap = new Map();
    cityRecords.forEach((record: WaitlistRecord) => {
      const hood = record.neighborhood
      neighborhoodCountsMap.set(hood, neighborhoodCountsMap.get(hood) + 1 || 1);
    });

    const neighborhoodCounts = Array.from(neighborhoodCountsMap, ([key, value]) => ({ neighborhood: key, count: value }));
    const rankings = neighborhoodCounts.sort((a, b) => b.count - a.count)
    
    return {city, rankings};
  }

  const calculateTotalSignups = (cityRankings: any) => {
    let totalSignUps = 0
    cityRankings.forEach((cityRanking: CityRanking) => 
      cityRanking.rankings.forEach((ranking: Ranking) => totalSignUps += ranking.count)
    )
    return totalSignUps
  }


  if (!records) {
    return <Loading />
  }

  const cityRankings: any = CITIES.map((city) => getSortedCountsOfNeighborhoodByCity(city))
  const totalSignUps: number = calculateTotalSignups(cityRankings)

  return (
    <div className="">
      <Head>
        <title>{COMPANY_NAME} Rankings</title>
        <meta name="description" content="Village Loot Waitlist Rankings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen">
        <div className='mx-5 mt-7 md:mx-20'>
          <div className='flex flex-col md:flex-row w-full items-center md:justify-between'>
            <div className='text-base'>
              {COMPANY_NAME} Waitlist Rankings
            </div>
            <div className='mt-4 md:mt-0 text-base'>
              {totalSignUps} total sign ups
            </div>
            <div className='mt-4 md:mt-0'>
              <a className='text-sm p-3 bg-blue-200 hover:bg-blue-100 active:bg-blue-200 justify-center text-sm md:text-md lg:text-normal rounded-lg' href="https://villageloot.carrd.co">
                Join the waitlist!
              </a>
            </div>
          </div>

          
          
          <div className='mt-4 grid grid-cols-1 gap-4'>
            {cityRankings.map(({ city, rankings }: any, i: number) => 
              <CityRankingChart key={i} city={city} rankings={rankings} />
            )}
          </div>
        </div>
      </main>

      <footer className="">
      </footer>
    </div>
  )
}

export default Home
