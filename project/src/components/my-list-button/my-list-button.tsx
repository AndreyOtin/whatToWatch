import React, { useState } from 'react';
import { useChangeFavoriteMutation, useGetFavoritesQuery } from '../../api/api';
import Spinner from '../spinner/spinner';
import { toast } from 'react-toastify';
import clsx from 'clsx';

type MyListButtonProps = {
  id: number;
  isFavorite: boolean;
}

const MyListButton = ({ id, isFavorite }: MyListButtonProps) => {
  const myListQuery = useGetFavoritesQuery();
  const [changeFavorite, { isLoading, isError }] = useChangeFavoriteMutation();


  const handleClick = () => {
    changeFavorite({ id, isFavorite: !isFavorite });
  };

  if (isError) {
    toast.error('Произошла ошибка обновления, попробуйте снова', { toastId: id });
  }

  return (
    <button
      onClick={handleClick}
      disabled={myListQuery.isLoading || isLoading}
      className="btn btn--list film-card__button"
      type="button"
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={clsx(!isFavorite && '#add', isFavorite && '#in-list')}></use>
      </svg>
      <Spinner
        style={{ backgroundColor: 'transparent', backgroundImage: 'none' }}
        variant="small"
        isActive={myListQuery.isLoading || isLoading}
      >
        <>
          <span>My list</span>
          <span className="film-card__count">{myListQuery?.data?.length}</span>
        </>
      </Spinner>
    </button>);
};

export default MyListButton;
