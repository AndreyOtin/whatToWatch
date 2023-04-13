import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const displayToast = (error: unknown) => {
  const err = error as FetchBaseQueryError;

  if (err.status === 'FETCH_ERROR') {
    toast.error(err.error, { toastId: err.status });
    return;
  }

  const message = err.data as { error: string };
  toast.error(message.error, { toastId: err.status });
};

export const rateNumber = (num: number) => {
  const ratingMap = {
    '0-3': 'Bad',
    '3-5': 'Normal',
    '5-8': 'Good',
    '8-10': 'Very good',
    '10': 'Awesome'
  };

  Object.keys(ratingMap);

  for (const range of Object.keys(ratingMap)) {
    const [min, max] = range.split('-').map(Number);

    if (num >= min && num <= max) {
      return ratingMap[range as keyof typeof ratingMap];
    }
  }
};
