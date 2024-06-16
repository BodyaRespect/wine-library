export const Comment = () => {
  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__head">
          <div className="comment__name">Olena</div>

          <div className="stars stars--4">
            <span className="stars__star"></span>
            <span className="stars__star"></span>
            <span className="stars__star"></span>
            <span className="stars__star--half"></span>
            <span className="stars__star"></span>
          </div>
        </div>

        <div className="comment__date">04.06.2024</div>
      </div>

      <p className="comment__content">
        Summer evenings, friends, a refreshing aroma - my favourite wine.
      </p>

      <div className="comment__pros"></div>
      <ul>
        <li>Fragrance: Unique, bright, reminiscent of summer.</li>
        <li>Quality: Marlborough, high quality, excellent wine.</li>
      </ul>

      <div className="comment__cons"></div>
      <ul>
        <li>Fragrance: May be too strong for some.</li>
        <li>Menu: Not suitable for all dishes, limited combinations.</li>
      </ul>

      <div className="comment__bottom">
        <button className="comment__reply">
          <span className="comment__next"></span>
          Reply
        </button>

        <div className="comment__estimation">
          <button className="comment__like"></button>
          <button className="comment__dislike"></button>
        </div>
      </div>
    </div>
  )
}
