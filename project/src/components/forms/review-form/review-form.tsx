import React from 'react';
import { MaxElementCount } from '../../../consts/enum';
import Spinner from '../../spinner/spinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { displayToast } from '../../../utils/app';
import { useAddCommentMutation } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

type FormFields = {
  rating: string;
  'review-text': string;
}

type ReviewFormProps = {
  id: string;
}

const ReviewForm = ({ id }: ReviewFormProps) => {
  const [addComment, { isLoading }] = useAddCommentMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormFields>();
  const error = Object.values(errors).find((err) => Boolean(err.message));

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (!id) {
      return;
    }

    addComment({
      id: id,
      rating: data.rating,
      comment: data['review-text']
    })
      .unwrap()
      .then(() => navigate('..', { relative: 'path' }))
      .catch((err) => displayToast(err));
  };


  return (
    <div className="add-review">
      <form
        onSubmit={(evt) => {
          handleSubmit(onSubmit)(evt);
        }}
        action="#"
        className="add-review__form"
      >
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: MaxElementCount.RatingStar }, (_, index) => (
              <React.Fragment key={index.toString()}>
                <input
                  disabled={isLoading}
                  {...register('rating', { required: 'Поставьте рейтинг' })}
                  className="rating__input"
                  id={`star-${MaxElementCount.RatingStar - index}`}
                  type="radio"
                  value={MaxElementCount.RatingStar - index}
                />
                <label
                  className="rating__label"
                  htmlFor={`star-${MaxElementCount.RatingStar - index}`}
                >
                  Rating {MaxElementCount.RatingStar - index}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            disabled={isLoading}
            {...register('review-text', {
              required: true,
              minLength: {
                value: 50,
                message: 'Отзыв должен состоянть мин из 50 символов'
              },
              maxLength: {
                value: 400,
                message: 'Отзыв должен состоянть макс из 400 символов'
              }
            })}
            className="add-review__textarea"
            id="review-text"
            placeholder="Review text"
          >
          </textarea>
          <div className="add-review__submit">
            <button
              disabled={!isValid || isLoading}
              className="add-review__btn"
              type="submit"
            >
              {isLoading
                ?
                <Spinner
                  style={{ backgroundImage: 'none', backgroundColor: 'transparent' }}
                  variant={'small'}
                  isActive
                />
                :
                'Post'}
            </button>
          </div>

        </div>
      </form>
      {error &&
        <p style={{ textAlign: 'center', color: 'black' }}>{error.message}</p>}
    </div>
  );
};

export default ReviewForm;
