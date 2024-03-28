import http from "../http-common";

class HospitalDataService {
  getAll() {
    return http.get("/hospitals");
  }

  get(id) {
    return http.get(`/hostpitals/${id}`);
  }

  findByState(state) {
    return http.get(`/hospitals?state=${state}`);
  }

  findByGeoLocation(lat, lon) {
    return http.get(`/hospitals?lat=${lat}&lon=${lon}`)
  }
}

export default new HospitalDataService();