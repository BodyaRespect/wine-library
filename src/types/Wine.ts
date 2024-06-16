export interface Wine {
  id: number
  name: string
  trademark: string
  country: string
  year: {
    value: number
    leap: boolean
  }
  liquidVolume: number
  alcoholContent: number
  wineType: 'RED' | 'WHITE' | 'ROSE' | 'SPARKLING' | 'DESSERT' | 'FORTIFIED'
  recommendedFood: {
    name: string
  }[]
  sweetness: 'DRY' | 'SEMI_DRY' | 'SWEET'
  acidity: 'LOW' | 'MEDIUM' | 'HIGH'
  description: string
  inventory: number
  price: number
  imageUrl: string
}
