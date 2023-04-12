import React, { FormEventHandler } from 'react';
import { useAuthenticateUserMutation } from '../../../api/api';

type SignInFormProps = {}

const SignInForm = ({}: SignInFormProps) => {
  const [authenticateUser, { isLoading, isError }] = useAuthenticateUserMutation();

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    (async () => {
      evt.preventDefault();
      const elements = evt.currentTarget.elements;
      const email = elements.namedItem('user-email') as HTMLInputElement;
      const password = elements.namedItem('user-password') as HTMLInputElement;

      try {
        const response = await authenticateUser({
          password: password.value,
          email: email.value
        }).unwrap();
      } catch (err) {
        console.log(err)
        // const error = err as FetchBaseQueryError;
        // const message = error.data as { error: string };
      }
    })();
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
            className="sign-in__input"
            type="password"
            placeholder="Password"
            name="user-password"
            id="user-password"
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
};

export default SignInForm;
