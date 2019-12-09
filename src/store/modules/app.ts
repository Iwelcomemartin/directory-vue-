const state = {
    search: ''
}

const mutations = {
    FIND_VALUE: (state, search) => {
        state.search = search
    }
}

const actions = {
    findValue({commit}, search ) {
        commit('FIND_VALUE', search)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }