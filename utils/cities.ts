export const NYC = 'NYC'
export const BOSTON = 'Boston'
export const OTHER = 'Other'
export const CITIES = [NYC, BOSTON, OTHER]

export const cityToEmoji: any = new Map([[NYC, '🗽'], [BOSTON, ''], [OTHER, '']])

export const getCityWithEmoji = (city: string) => (cityToEmoji.has(city)) ? `${city} ${cityToEmoji.get(city)}` : city