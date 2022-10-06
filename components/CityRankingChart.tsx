import { getCityWithEmoji } from '../utils/cities'


interface CityRankingChartProps {
  city: string, 
  rankings: Ranking[]
}

interface Ranking {
  neighborhood: string,
  count: number
}

const getNumberExtension = (i: number) => {
  switch(i) {
    case 1: 
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

const getBackgroundColor = (place: number) => {
  switch (place) {
    case 1:
      return 'bg-blue-300'
    case 2:
      return 'bg-red-300'
    case 3:
      return 'bg-amber-300'
    default:
      return 'bg-gray-100'
  }
}


function CityRankingChart({ city, rankings }: CityRankingChartProps) {
  
  if (rankings.length === 0) {
    return <></>;
  }
  
  return (
    <div className="rounded-xl shadow-md">
      <div className='flex flex-col w-full p-5'>
        <header className='text-2xl justify-center w-full items-center'>{getCityWithEmoji(city)}</header>
        <table className='border-separate text-lg w-full mt-3'>
          <thead>
            <tr>
              <th className='text-xs md:text-lg lg:text-xl font-light'>Place</th>
              <th className='text-xs md:text-lg lg:text-xl font-light'>Neighborhood</th>
              <th className='text-xs md:text-lg lg:text-xl font-light'>Sign Ups</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking, i) => {
              const place = i + 1
              const ext = getNumberExtension(place)
              const backgroundColor = getBackgroundColor(place)
              return (
                <tr key={i} className={`rounded-lg ${backgroundColor}`}>
                  <th className='text-sm md:text-lg lg:text-xl font-light'>{`${place}${ext}`}</th>
                  <th className='text-sm md:text-lg lg:text-xl font-light'>{ranking.neighborhood}</th>
                  <th className='text-sm md:text-lg lg:text-xl font-light'>{ranking.count}</th>
                </tr>
              )})}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CityRankingChart