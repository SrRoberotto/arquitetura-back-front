import http from "./http-common";

class TutorialDataService {
  getAll() {
    return http.get("/disciplinas");
  }

  get(id) {
    return http.get(`/disciplinas/${id}`);
  }

  create(data) {
    return http.post("/disciplinas", data);
  }

  update(id, data) {
    return http.put(`/disciplinas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/disciplinas/${id}`);
  }

  deleteAll() {
    return http.delete(`/disciplinas`);
  }

  findByTitle(title) {
    return http.get(`/disciplinas?title=${title}`);
  }

  //debug
  getURL(){
    return "Axios: " + http.defaults.baseURL;
  }

}

export default new TutorialDataService();