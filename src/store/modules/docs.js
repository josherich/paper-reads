import request from 'superagent'
// import jsonp from 'superagent-jsonp'
import config from '@/config'

const state = {
  docs: [],
  temp: [],
  skip: 0,
  noMore: false,
  perPage: 10,
  docItem: {},
  docMeta: {},
  similarDocs: []
}

const mutations = {
  loadMoreDocs (state, payload) {
    state.skip += 10
    state.docs = state.docs.concat(payload.res)
    if (payload.res.length < state.perPage) {
      state.noMore = true
    }
  },
  getSingleDoc (state, payload) {
    state.docItem = payload.res
  },
  getSimilarDocs (state, payload) {
    state.similarDocs = payload.res
  },
  getDocMeta (state, payload) {
    state.docMeta = payload.res
  }
}

const actions = {
  newdoc ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      request
        .post(config.api + '/doc/')
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .send(payload)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  },
  updateDocRating ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      request
        .post(config.api + `/doc/${payload.id}/rating`)
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .send({rating: payload.rating})
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  },
  updatedoc ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      request
        .put(config.api + `/doc/${payload.id}`)
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .send(payload.item)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  },
  deletedoc ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      request
        .post(config.api + `/doc/${payload.id}/delete`)
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  },
  /**
   * Loading more data
   * skip: 10 default
   * count: 10 default
   */
  loadMoreDocs ({commit, state}) {
    if (state.noMore) return
    request
      .get(config.api + '/doc?start=' +
        state.skip + '&count=10')
      // .use(jsonp)
      .end((err, res) => {
        if (!err) {
          commit({
            type: 'loadMoreDocs',
            res: res.body
          })
        }
      })
  },
  /**
   * Getting single event
   * id: event id
   */
  getSingleDoc ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      request
        .get(config.api + '/doc/' + payload.id)
        // .use(jsonp)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'getSingleDoc',
              res: res.body
            })
            resolve(res)
          }
        })
    })
  },
  getSimilarDocs ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      request
        .get(config.api + `/doc/${payload.id}/more`)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'getSimilarDocs',
              res: res.body
            })
            resolve(res)
          }
        })
    })
  },
  getDocMeta ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      request
        .get(config.api + `/doc/${payload.uuid}/meta`)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'getDocMeta',
              res: res.body
            })
            resolve(res)
          }
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}