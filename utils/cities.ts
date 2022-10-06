export const NYC = 'NYC'
export const BOSTON = 'Boston'
export const CITIES = [NYC, BOSTON]

export const cityToEmoji: any = new Map([[NYC, '🗽'], [BOSTON, '']])

export const getCityWithEmoji = (city: string) => (cityToEmoji.has(city)) ? `${city} ${cityToEmoji.get(city)}` : city