interface Props {
  title: string
  text: string | JSX.Element
}

export const Characteristic: React.FC<Props> = ({ title, text }) => {
  return (
    <p className="characterisctics__characterisctic">
      <p className="characterisctics__title">
        {title}
      </p>

      <p className="characterisctics__text">
        {text}
      </p>
    </p>
  )
}
