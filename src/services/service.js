// key1 AIzaSyDSs5xmGpdPeEwSnafuemVLWY-FE0FT-bk
// key2 AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA
// key 3 AIzaSyALb8KB7Ko5KeWwPaDtEHndFOhACHuI_SU
// key 4 AIzaSyBkd_BttLScF8zHRClfA9LOnKNXlLeZW_U
import axios from 'axios';
import { searchActions } from '../actions';
import store from '../store';

const service = {
  getData: (searchQuery, order, maxResults) => {
    store.dispatch(searchActions.requestData());
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&order=${order ||
          'relevance'}&q=${searchQuery}&type=video&maxResults=${maxResults ||
          12}&key=AIzaSyALb8KB7Ko5KeWwPaDtEHndFOhACHuI_SU`
      )
      .then(item => {
        const res = item.data;
        service.getViews(res);
      })
      .catch(() => store.dispatch(searchActions.requestDataError()));
  },
  getViews: res => {
    const data = res;
    Promise.all(
      data.items.map(u =>
        fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${u.id.videoId}&key=AIzaSyALb8KB7Ko5KeWwPaDtEHndFOhACHuI_SU`
        )
      )
    )
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(resp => {
        for (let i = 0; i < resp.length; i++) {
          data.items[i].statistic = resp[i].items[0].statistics;
        }
        store.dispatch(searchActions.requestDataSuccess(data));
      })
      .catch(() => store.dispatch(searchActions.requestDataError(true)));
  }
};

export default service;
