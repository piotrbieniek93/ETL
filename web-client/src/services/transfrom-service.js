import Api from './api';

export default {
  get(id){
    return Api().get('/transform/' + id);
  }
}
