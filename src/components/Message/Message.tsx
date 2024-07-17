interface Props {
  message: string
}

export const Message: React.FC<Props> = ({ message }) => {
  return (
    <div className="message-container">
      <div className="message">
        {message}
      </div>
    </div>
  )
}
