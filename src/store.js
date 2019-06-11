import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0,
    diaSta:false,
    userShow:false,
    roleChangeShow:false,
    enumeration:{
      zgztObj:{},
      zgztData:[],
      cflxObj:{},
      cflxdata:[],
      zgztObj:{},
      zgztData:[],
      cflxObj:{},
      cflxdata:[],
    },
    enumSelection:{},
    enumData:{}
   
  },
  mutations: {
    increment (state) {
      state.count++
    },
    changeDiaSta(state){
      state.diaSta=!state.diaSta
    },
    changeUserShow(state){
      state.userShow=!state.userShow
    },
    changeRoleChangeShow(state){
      state.roleChangeShow=!state.roleChangeShow
    },
    enumerationData(state,data){  //enum data
      state.enumData=data;
    },
    enumSelectionChange(state,data){//enum selection
      state.enumSelection=data;
    }
  },
  actions: {

  }
})
