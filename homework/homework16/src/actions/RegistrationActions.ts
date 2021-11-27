import { Dispatch } from 'redux';
import { RegistrationAction } from '../types/actions';
import {
  GET_USER_ID, CHANGE_REDIRECT, CANCEL_REDIRECT,
} from '../constants/actions/registration';
import { ProfileResponse } from '../types/dumMyApiResponses';
import { createUser } from '../api/dumMyApi';

const getUserIdAction = (user: ProfileResponse): RegistrationAction => ({
  type: GET_USER_ID,
  userId: user.id,
});

const redirectAction = (): RegistrationAction => ({
  type: CHANGE_REDIRECT,
});

const cancelRedirectAction = (): RegistrationAction => ({
  type: CANCEL_REDIRECT,
});

export const sendData = (values: ProfileResponse) => (dispatch: Dispatch) => {
  const {
    firstName, lastName, email, phone, gender, picture,
  } = values;
  const isDateOfBirth = values.dateOfBirth;
  let dateOfBirth;
  if (isDateOfBirth) {
    const fullDate = new Date(isDateOfBirth);
    dateOfBirth = `${fullDate.getMonth() + 1}/${fullDate.getDate()}/${fullDate.getFullYear()}`;
  }
  createUser({
    firstName, lastName, email, phone, gender, dateOfBirth, picture,
  }).then((resp:any) => {
    dispatch(getUserIdAction(resp));
    dispatch(redirectAction());
  }).then(() => dispatch(cancelRedirectAction()));
};
