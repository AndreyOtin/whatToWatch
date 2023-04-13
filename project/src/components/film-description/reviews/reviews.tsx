import React from 'react';
import { useGetCommentsQuery } from '../../../api/api';
import dayjs from 'dayjs';
import Spinner from '../../spinner/spinner';

type ReviewsProps = {
  id: number;
}

const Reviews = ({ id }: ReviewsProps) => {
  const reviewsQuery = useGetCommentsQuery(id);
  const reviews = reviewsQuery.data;

  const errorElement = (
    <div>
      <p>Произошла ошибка</p>
      <button
        style={{
          borderRadius: '15px',
          backgroundColor: '#eee5b5',
          borderColor: 'white'

        }}
        onClick={() => reviewsQuery.refetch()}
      >
        Попробуйте еще раз
      </button>
    </div>
  );

  return (
    <div
      style={{
        height: reviewsQuery.isLoading ? '230px' : ''
      }}
      className="film-card__reviews film-card__row"
    >
      <Spinner
        style={{
          backgroundColor: '#e1b0b2',
          backgroundImage: 'none'
        }}
        variant="secondary"
        isActive={reviewsQuery.isLoading}
      >
        <div className="film-card__reviews-col">
          {reviewsQuery.isError && errorElement}
          {reviews?.map((review) => (
            <div className="review" key={review.id}>
              <blockquote className="review__quote">
                <p className="review__text">
                  {review.comment}
                </p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time
                    className="review__date"
                    dateTime={dayjs(review.date).toDate().toJSON()}
                  >
                    {dayjs(review.date).format('MMMM DD[,] YYYY')}
                  </time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          ))}
        </div>
      </Spinner>
    </div>
  );
};

export default Reviews;
