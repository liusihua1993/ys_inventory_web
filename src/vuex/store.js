import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import {treeCont} from '../api/api'
import en from '../common/js/util'
Vue.use(Vuex)

// 应用初始状态
const state = {
    defaultRouter: ''
}

// 定义所需的 mutations
const mutations = {
    ADDITEM(state, item) {
        
    },
    EDIT(state, item) {
        
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})