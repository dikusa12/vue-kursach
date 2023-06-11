import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'http://vue-kursach/wp-json/wp/v2',
});
export const uploadImage = async (image) => {
  return await axiosInstance.post('/media', image, {
    headers: {
      'Authorization': 'Basic ' + window.btoa('admin:admin'),
      'content-type': 'multipart/form-data'
    }
  })
}

export const getImageById = async (id) => {
  return await axiosInstance.get('/media/' + id)
}

