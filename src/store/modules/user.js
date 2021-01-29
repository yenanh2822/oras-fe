import { login, getInfo, signup } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  setAccountId,
  removeUserId,
  removeAccountId
} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  accId: '',
  token: getToken(),
  username: getUserId(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_ACCID: (state, accId) => {
    state.accId = accId
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, fullname) => {
    state.name = fullname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        commit('SET_USERNAME', username.trim())
        setToken(data)
        setUserId(username.trim())
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.username, state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        data.roles = [data.role]
        data.introduction = 'I am a super administrator'
        data.avatar = data.role === 'user' ? data.companyById.avatar : 'https://oras-myfile.s3-ap-southeast-1.amazonaws.com/1608561170039-945668.jpg'
        const { id, roles, fullname, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ACCID', id)
        setAccountId(id)
        commit('SET_ROLES', roles)
        commit('SET_NAME', fullname)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_ACCID', '')
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserId()
      removeAccountId()
      resetRouter()

      resolve()
    })
  },

  // update avatar
  updateAvatar({ commit }, url) {
    return new Promise(resolve => {
      commit('SET_AVATAR', url)
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // user sign up
  signup({ commit }, userInfo) {
    const { fullname, email, password, phoneNo, compName, location, compEmail, compPhone, taxCode } = userInfo
    const data = {
      'accountEntity': {
        'active': false,
        'companyId': 0,
        'email': email,
        'fullname': fullname,
        'id': 0,
        'password': password,
        'phoneNo': phoneNo,
        'role': 'user'
      },
      'companyEntity': {
        'avatar': 'https://paailajob.com/uploads/employer/profileImg/default.jpg',
        'description': 'New company',
        'email': compEmail,
        'id': 0,
        'location': location,
        'name': compName,
        'phoneNo': compPhone,
        'taxCode': taxCode,
        'verified': false
      }
    }
    return new Promise((resolve, reject) => {
      signup(data).then(response => {
        // const { message } = response
        console.log(response)
        resolve()
      }).catch(response => {
        reject(response)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
