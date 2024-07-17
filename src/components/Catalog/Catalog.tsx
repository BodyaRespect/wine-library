import type { Wine } from '@/types/Wine'

import { Icon } from '@/components/Icon'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import { AutoCompleteDropdown } from '../AutoDropdown'
import { ProductList } from '../ProductList/ProductList'
import { RangeSlider } from '../RangeSlider'

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
    title: 'Colors',
    list: [
      { title: 'Red', count: 14 },
      { title: 'White', count: 9 },
      { title: 'Rose', count: 15 },
      { title: 'Dessert', count: 12 },
      { title: 'Fortified', count: 2 },
      { title: 'Fruit', count: 13 },
      { title: 'Biodynamic', count: 16 },
    ],
  },
  {
    title: 'Sweetness',
    list: [
      { title: 'Dry', count: 4 },
      { title: 'Semi-dry', count: 6 },
      { title: 'Sweet', count: 17 },
      { title: 'Semi-sweet', count: 11 },
      { title: 'Brut', count: 19 },
      { title: 'Sparkling', count: 5 },
    ],
  },
  {
    title: 'Countries',
    list: [
      { title: 'Argentina', count: 20 },
      { title: 'Australia', count: 13 },
      { title: 'Chile', count: 12 },
      { title: 'France', count: 5 },
      { title: 'Germany', count: 4 },
      { title: 'Italy', count: 1 },
      { title: 'Portugal', count: 2 },
      { title: 'South Africa', count: 18 },
      { title: 'Spain', count: 7 },
      { title: 'USA', count: 15 },
    ],
  },
  {
    title: 'Vintages',
    list: [
      { title: '2019', count: 13 },
      { title: '2020', count: 19 },
      { title: '2021', count: 10 },
      { title: '2022', count: 12 },
      { title: '2023', count: 8 },
      { title: '2024', count: 5 },
    ],
  },
]

const createQueryString = (filters: Record<string, string[]>, minPrice?: number, maxPrice?: number): string => {
  const filterString = Object.entries(filters)
    .map(([key, values]) => `${key}=${values.map(value => value.toUpperCase()).join(',')}`)
    .join('&')
    .replace('-', '_')

  const priceString = minPrice !== undefined && maxPrice !== undefined
    ? `&minPrice=${minPrice}&maxPrice=${maxPrice}`
    : ''

  return filterString + priceString
}

export const Catalog = () => {
  const [catalog, setCatalog] = useState<Wine[]>([])
  const [filteredCatalog, setFilteredCatalog] = useState<Wine[]>([])
  const [selectedFilters, setSelectedFilters] = useState<any>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFilterChange = (blockIndex: number, _checkIndex: number, title: string) => {
    const key = filters[blockIndex].title.toLowerCase().replace(/ /g, '')

    setSelectedFilters((prevFilters: any) => {
      const currentValues = prevFilters[key] || []
      const newValues = currentValues.includes(title)
        ? currentValues.filter((item: string) => item !== title)
        : [...currentValues, title]

      return { ...prevFilters, [key]: newValues }
    })
  }

  const handleLogoClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    setSearchQuery('')
  }

  useEffect(() => {
    const queryString = createQueryString(selectedFilters, minPrice, maxPrice)

    axios
      .get(`https://api.winelibrary.wuaze.com/wines/search?${queryString}`)
      .then(response => setCatalog(response.data))
      .catch(error => console.error('Error fetching filtered wine data:', error))
  }, [selectedFilters, minPrice, maxPrice])

  useEffect(() => {
    const result = catalog.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredCatalog(result)
  }, [searchQuery, catalog])

  useEffect(() => {
    let sortedCatalog = [...catalog]

    switch (selectedOption) {
      case 'Newest':
        sortedCatalog = [...catalog].sort((a, b) => new Date(b.year).getFullYear() - new Date(a.year).getFullYear())
        break
      case 'Oldest':
        sortedCatalog = [...catalog].sort((a, b) => new Date(a.year).getFullYear() - new Date(b.year).getFullYear())
        break
      case 'Lowest price':
        sortedCatalog = [...catalog].sort((a, b) => a.price - b.price)
        break
      case 'Highest price':
        sortedCatalog = [...catalog].sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setFilteredCatalog(sortedCatalog)
  }, [selectedOption, catalog])

  useEffect(() => {
    let result = catalog.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    switch (selectedOption) {
      case 'Newest':
        result = result.sort((a, b) => new Date(b.year).getFullYear() - new Date(a.year).getFullYear())
        break
      case 'Oldest':
        result = result.sort((a, b) => new Date(a.year).getFullYear() - new Date(b.year).getFullYear())
        break
      case 'Lowest price':
        result = result.sort((a, b) => a.price - b.price)
        break
      case 'Highest price':
        result = result.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setFilteredCatalog(result)
  }, [searchQuery, selectedOption, catalog])

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min)
    setMaxPrice(max)
  }

  console.log({ catalog })

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
                <RangeSlider onChange={handlePriceChange} />
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
                        <input
                          id={`filter-${blockIndex}-${checkIndex}`}
                          onChange={() => handleFilterChange(blockIndex, checkIndex, title)}
                          type="checkbox"
                        />
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
              <div className="catalog__bar-search">
                <div className="catalog__bar-search-logo" onClick={handleLogoClick}></div>
                <input
                  className="catalog__bar-search-input"
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Enter a search query"
                  ref={inputRef}
                  value={searchQuery}
                />
              </div>

              <div className="catalog__bar-filter">
                <div className="catalog__bar-filter-logo"></div>
                <AutoCompleteDropdown
                  options={[
                    'Newest',
                    'Oldest',
                    'Lowest price',
                    'Highest price',
                  ]}
                  logo={false}
                  onSelectOption={setSelectedOption}
                  placeholder="Sort by"
                />
              </div>
            </div>

            <div className="catalog__list">
              <ProductList column={3} wines={filteredCatalog.slice(0, 12)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
