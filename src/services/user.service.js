import { defaultUrl } from '../configurations';
import { axiosInstance } from '../helpers';

export class UserService {
  static createUser(data) {
    return axiosInstance.post(`${defaultUrl}/auth/registration`, data);
  }

  static createPlacesUser(data) {
    return axiosInstance.post(`${defaultUrl}/users/by/jwt`, data);
  }

  static getUser() {
    return axiosInstance.get(`${defaultUrl}/users/by/jwt`)
  }
}
