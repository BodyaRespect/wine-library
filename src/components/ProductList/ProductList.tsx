import type { Wine } from '@/types/Wine'

import { CartItem } from '../CartItem'

interface Props {
  wines: Wine[]
}

export const ProductList: React.FC<Props> = ({ wines }) => {
  return (
    <div className="product__list">
      {wines.map(wine => (
        <div className="product__list-item" key={wine.id}>
          <CartItem wine={wine} />
        </div>
      ))}
    </div>
  )
}
