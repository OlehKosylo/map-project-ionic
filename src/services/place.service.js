import { defaultUrl } from '../configurations';
import { axiosInstance } from '../helpers';

export class PlaceService {
  static createPlace(data) {
    return axiosInstance.post(`${defaultUrl}/places`, data);
  }

  static getPlaces() {
    return axiosInstance.get(`${defaultUrl}/places`)
  }

  static deletePlace(id) {
    return axiosInstance.delete(`${defaultUrl}/places/${id}`)
  }
}
