import axiosInstance from "src/api/core/AxiosInstance";

class CRUDInstance {
  constructor(url) {
    this.url = url;
  }

  getAll() {
    return axiosInstance.get(this.url);
  }

  delete(id) {
    return axiosInstance.delete(`${this.url}/${id}`)
  }

  update(payload) {
    return axiosInstance.put(this.url, payload)
  }

  create(payload) {
    return axiosInstance.post(this.url, payload)
  }
}

export default CRUDInstance;
