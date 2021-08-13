import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
    count:0
};
const actions={
    increment({commit}){
        commit('INCREMENT')
    },
    decrement({commit}){
        commit('DECREMENT')
    },
    incrementIfOdd({state,commit}){
        if (!(state.count&1)){
            commit('INCREMENT')
        }
    },
    incrementAsync({commit}){
        setTimeout(()=>{
            commit('INCREMENT')
        },1000)
    }
};
const mutations={
    INCREMENT(){
        this.state.count+=1
    },
    DECREMENT(){
        this.state.count-=1
    },
};
const store=new Vuex.Store({
    state,
    actions,
    mutations
})
export  default store