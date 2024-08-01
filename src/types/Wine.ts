export interface RecommendedFood {
  name: 'MEAT' | 'CHEESE' | 'COLD SNACKS' | 'FISH' | 'POULTRY' | 'SEAFOOD'
}

export interface Wine {
  id: number
  name: string
  trademark: string
  country: string
  countryFlagUrl: string
  year: string
  liquidVolume: number
  alcoholContent: number
  wineType: 'RED' | 'WHITE' | 'ROSE'
  recommendedFood: [{
    name: string
    imageUrl: string
  }]
  sweetness: string
  acidity: 'LOW' | 'MEDIUM' | 'HIGH'
  description: string
  inventory: number
  price: number
  imageUrl: string
  averageRating: number
  commentsCount: number
}
