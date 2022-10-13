const NYC = 'NYC'
const NYC_NAMES = new Set(['nyc', 'new york city'])

const BOSTON = 'Boston'
const BOSTON_NAMES = new Set(['boston'])

const OTHER = 'Other'

interface City {
  label: string,
  names: Set<string>
}

const CITIES: City[] = [
  {
    label: NYC,
    names: NYC_NAMES
  },
  {
    label: BOSTON,
    names: BOSTON_NAMES
  }
]
const groupInputCity = (inputCity: string) => {
  const city = CITIES.find((city) => {
    return city.names.has(inputCity.toLowerCase())
  })
  return (city) ? city.label : OTHER
}

const cityToEmoji: any = new Map([[NYC, '🗽'], [BOSTON, ''], [OTHER, '']])
const getCityWithEmoji = (city: string) => (cityToEmoji.has(city)) ? `${city} ${cityToEmoji.get(city)}` : city

export {
  CITIES,
  NYC,
  BOSTON,
  groupInputCity,
  getCityWithEmoji
}