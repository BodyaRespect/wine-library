import type { SvgIcons } from '../../assets/images/svg/svg-icons'

import sprite from '/images/sprite.svg'

interface Props {
  icon: SvgIcons
  size?: number
}

export const Icon = ({ icon, size }: Props) => (
  <svg aria-hidden="true" className="icon" style={{ width: size, height: size }}>
    <use xlinkHref={`${sprite}#${icon}`}></use>
  </svg>
)
