import React, { ChangeEvent, FormEventHandler } from 'react';
import { useAuthenticateUserMutation } from '../../../api/api';
import { displayToast } from '../../../utils/app';

const SignInForm = () => {
  const [authenticateUser, { isLoading }] = useAuthenticateUserMutation();

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    (async () => {
      evt.preventDefault();
      const elements = evt.currentTarget.elements;
      const emailElement = elements.namedItem('user-email') as HTMLInputElement;
      const passwordElement = elements.namedItem('user-password') as HTMLInputElement;

      try {
        await authenticateUser({
          password: passwordElement.value,
          email: emailElement.value
        }).unwrap();
      } catch (err) {
        displayToast(err);
      }
    })();
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.validity.patternMismatch) {
      evt.target.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      action="#"
      className="sign-in__form"
    >
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <input
            disabled={isLoading}
            className="sign-in__input"
            type="email"
            placeholder="Email address"
            name="user-email"
            id="user-email"
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input
            disabled={isLoading}
            className="sign-in__input"
            type="password"
            placeholder="Password"
            name="user-password"
            id="user-password"
            required
            pattern="^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[^\s].+"
            onChange={handlePasswordChange}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button
          disabled={isLoading}
          className="sign-in__btn"
          type="submit"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
