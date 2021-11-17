import { defaultUrl } from '../configurations';
import { axiosInstance } from '../helpers';

export class RatingsService {
  static createRating(data) {
    return axiosInstance.post(`${defaultUrl}/rating`, data);
  }

  static deleteRating(id) {
    return axiosInstance.delete(`${defaultUrl}/rating/${id}`)
  }
}
