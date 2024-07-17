export const renderStars = (rate: number) => {
  const fullStars = Math.floor(rate)
  const halfStar = rate % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  return (
    <div className="stars">
      {[...Array(fullStars)].map((_, i) => (
        <span className="stars__star stars__star--full" key={`full-${i}`}></span>
      ))}
      {halfStar === 1 && <span className="stars__star stars__star--half"></span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span className="stars__star" key={`empty-${i}`}></span>
      ))}
      <p className="stars__rating">{`${rate}/5`}</p>
    </div>
  )
}
