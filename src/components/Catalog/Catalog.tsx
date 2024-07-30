import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import type { Wine } from '../../types/Wine'

import { Icon } from '../../components/Icon'
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
      { title: 'Red', count: 28 },
      { title: 'White', count: 10 },
      { title: 'Rose', count: 3 },
      { title: 'Dessert', count: 1 },
      { title: 'Fortified', count: 2 },
      { title: 'Fruit', count: 3 },
      { title: 'Biodynamic', count: 3 },
      { title: 'Sparkling', count: 4 },
    ],
  },
  {
    title: 'Sweetness',
    list: [
      { title: 'Dry', count: 35 },
      { title: 'Semi-dry', count: 9 },
      { title: 'Sweet', count: 4 },
      { title: 'Semi-sweet', count: 3 },
      { title: 'Brut', count: 3 },
    ],
  },
  {
    title: 'Countries',
    list: [
      { title: 'Argentina', count: 3 },
      { title: 'Australia', count: 3 },
      { title: 'Chile', count: 2 },
      { title: 'France', count: 17 },
      { title: 'Germany', count: 2 },
      { title: 'Italy', count: 8 },
      { title: 'Portugal', count: 2 },
      { title: 'Lebanon', count: 3 },
      { title: 'Spain', count: 5 },
      { title: 'USA', count: 7 },
      { title: 'New Zealand', count: 2 },
    ],
  },
  {
    title: 'Vintages',
    list: [
      { title: '2001', count: 1 },
      { title: '2004', count: 2 },
      { title: '2009', count: 2 },
      { title: '2011', count: 1 },
      { title: '2012', count: 1 },
      { title: '2014', count: 2 },
      { title: '2015', count: 4 },
      { title: '2016', count: 6 },
      { title: '2017', count: 5 },
      { title: '2018', count: 3 },
      { title: '2019', count: 7 },
      { title: '2020', count: 9 },
      { title: '2021', count: 7 },
      { title: '2022', count: 2 },
      { title: '2023', count: 1 },
      { title: '2024', count: 1 },
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
  const [filterVisibility, setFilterVisibility] = useState<boolean[]>(new Array(filters.length + 1).fill(true))

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

  const toggleFilterVisibility = (index: number) => {
    setFilterVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility]
      newVisibility[index] = !newVisibility[index]
      return newVisibility
    })
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

  const getStyle = (index: number) => ({
    maxHeight: filterVisibility[index] ? '1000px' : '0',
    opacity: filterVisibility[index] ? 1 : 0,
    transition: 'max-height 0.5s ease, opacity 0.5s ease',
    overflow: 'hidden',
    display: 'grid',
    gridRowGap: '10px',
    paddingBottom: '32px',
  })

  return (
    <>
      <section className="catalog">
        <div className="container">
          <div className="catalog__grid">
            <aside className="catalog__filters">
              <div className="catalog__filter-block">
                <div className="catalog__filter-head">
                  <h4 className="catalog__filter-title">Price</h4>
                  <button className="catalog__filter-toggle" onClick={() => toggleFilterVisibility(0)} type="button">
                    <Icon icon={filterVisibility[0] ? 'icon_chevron_up' : 'icon_chevron_down'} size={32} />
                  </button>
                </div>
                <div className="catalog__filter-content" style={getStyle(0)}>
                  <RangeSlider onChange={handlePriceChange} />
                </div>
              </div>

              {filters.map(({ title, list }, blockIndex) => (
                <div className="catalog__filter-block" key={title}>
                  <div className="catalog__filter-head">
                    <h4 className="catalog__filter-title">{title}</h4>
                    <button className="catalog__filter-toggle" onClick={() => toggleFilterVisibility(blockIndex + 1)} type="button">
                      <Icon icon={filterVisibility[blockIndex + 1] ? 'icon_chevron_up' : 'icon_chevron_down'} />
                    </button>
                  </div>
                  <div className="catalog__filter-content" style={getStyle(blockIndex + 1)}>
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
                <ProductList column={3} nextPage={false} wines={filteredCatalog} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
