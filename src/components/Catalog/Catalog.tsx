import { Icon } from '@/components/Icon'

interface FilterList {
  title: string
  count: number
}

interface FilterBlock {
  title: string
  list: FilterList[]
}

const filters: FilterBlock[] = [
  {
    title: 'Wine colour',
    list: [
      {
        title: 'Red',
        count: 14,
      },
      {
        title: 'White',
        count: 9,
      },
      {
        title: 'Rose',
        count: 15,
      },
      {
        title: 'Dessert',
        count: 12,
      },
      {
        title: 'Fortified',
        count: 2,
      },
      {
        title: 'Fruit',
        count: 13,
      },
      {
        title: 'Biodynamic',
        count: 16,
      },
    ],
  },
  {
    title: 'Sweetness',
    list: [
      {
        title: 'Dry',
        count: 4,
      },
      {
        title: 'Semi-dry',
        count: 6,
      },
      {
        title: 'Sweet',
        count: 17,
      },
      {
        title: 'Semi-sweet',
        count: 11,
      },
      {
        title: 'Brut',
        count: 19,
      },
      {
        title: 'Sparkling',
        count: 5,
      },
    ],
  },
  {
    title: 'Country',
    list: [
      {
        title: 'Argentina',
        count: 20,
      },
      {
        title: 'Australia',
        count: 13,
      },
      {
        title: 'Chile',
        count: 12,
      },
      {
        title: 'France',
        count: 5,
      },
      {
        title: 'Germany',
        count: 4,
      },
      {
        title: 'Italy',
        count: 1,
      },
      {
        title: 'Portugal',
        count: 2,
      },
      {
        title: 'South Africa',
        count: 18,
      },
      {
        title: 'Spain',
        count: 7,
      },
      {
        title: 'United States',
        count: 15,
      },
    ],
  },
  {
    title: 'Vintage',
    list: [
      {
        title: '2019',
        count: 13,
      },
      {
        title: '2020',
        count: 19,
      },
      {
        title: '2021',
        count: 10,
      },
      {
        title: '2022',
        count: 12,
      },
      {
        title: '2023',
        count: 8,
      },
      {
        title: '2024',
        count: 5,
      },
    ],
  },
]

export const Catalog = () => {
  return (
    <section className="catalog">
      <div className="container">
        <div className="catalog__grid">

          <aside className="catalog__filters">

            <div className="catalog__filter-block">
              <div className="catalog__filter-head">
                <h4 className="catalog__filter-title">Price</h4>
                <button className="catalog__filter-toggle" type="button">
                  <Icon icon="icon_chevron_up" />
                </button>
              </div>
              <div className="catalog__filter-content">
                Price
              </div>
            </div>

            {filters.map(({ title, list }, blockIndex) => (
              <div className="catalog__filter-block" key={title}>
                <div className="catalog__filter-head">
                  <h4 className="catalog__filter-title">{title}</h4>
                  <button className="catalog__filter-toggle" type="button">
                    <Icon icon="icon_chevron_up" />
                  </button>
                </div>
                <div className="catalog__filter-content">
                  <div className="catalog__filter-list">
                    {list.map(({ title, count }, checkIndex) => (
                      <div className="catalog__filter-check" key={title}>
                        <input id={`filter-${blockIndex}-${checkIndex}`} type="checkbox" />
                        <label htmlFor={`filter-${blockIndex}-${checkIndex}`}>
                          {title}
                          <span>{count}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </aside>

          <div className="catalog__content">

            <div className="catalog__bar">

            </div>

            <div className="catalog__list">
              List
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
