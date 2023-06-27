import axios from 'axios'

const REST_API_URL = 'http://localhost:8080/phone';

class Service {

  getAllEmployees() {
    return axios.get(REST_API_URL)
  }

  getAllSearch(search) {
    return axios.get(REST_API_URL+ '/search/' + search);
  }

  createEmployee(phone) {
    return axios.post(REST_API_URL, phone);
  }

  getEmployeeById(phoneId) {
    return axios.get(REST_API_URL + '/' + phoneId);
  }

  updateEmployee(phoneId, phone) {
    return axios.put(REST_API_URL + '/' + phoneId, phone);
  }

  deleteEmployee(phoneId) {
    return axios.delete(REST_API_URL + '/' + phoneId);
  }
}
const service = new Service();
export default service;
