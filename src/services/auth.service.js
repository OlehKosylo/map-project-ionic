import { defaultUrl } from '../configurations';
import { axiosInstance } from '../helpers';

export class AuthService {
  static logIn(data) {
    return axiosInstance.post(`${defaultUrl}/auth`, data);
  }

  static logOut() {
    return axiosInstance.post(`${defaultUrl}/auth/logout`, {});
  }
}
