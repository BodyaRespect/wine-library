// eslint-disable-next-line import/no-extraneous-dependencies
import type { TypedUseSelectorHook } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
