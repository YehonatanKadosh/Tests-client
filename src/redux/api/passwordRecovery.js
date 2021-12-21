import {
  recoveryRequestAnswered,
  recoveryRequestError,
  requestRecovery,
} from "../reducers/recovery";
import { API_Call } from "./middleware";

export const recoverPassword = (email) =>
  API_Call({
    url: "email",
    method: "post",
    data: { email },
    beforeAll: requestRecovery,
    onSuccess: recoveryRequestAnswered,
    onError: recoveryRequestError,
  });
