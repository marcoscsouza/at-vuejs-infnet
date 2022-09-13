import { createStore } from 'vuex'

export default createStore({
  state: {
    tarefas: [
      {
        id: 0,
        title: 'tarefa 1',
        description: 'Primeira tarefa apenas para teste.',
        date: '2022-09-15',
        isCompleted: false,
        important: 'Baixo'
      },
      {
        id: 1,
        title: 'tarefa 2',
        description: 'Segunda tarefa apenas para teste.',
        date: '2021-01-01',
        isCompleted: true,
        important: 'Alto'
      }
    ]
  },
  getters: {
    feito(state){
      return state.tarefas.filter((c) =>{
        let count =[]
        
        if(c.isCompleted == true){
          count.push(c)
        }

        return count.length
      }).length
    },
    fazer(state){

      return state.tarefas.filter((c) =>{
        let count =[]
        
        if(c.isCompleted == false){
          count.push(c)
        }

        return count.length
      }).length
    },
    idCalc(state){
      return state.tarefas.length
    }
  },
  mutations: {

    changeTask(state, data){
      const index = state.tarefas.findIndex(t => t.id ===data.id)

      if(index >= 0){
        state.tarefas.splice(index, 1, data)
        console.log('editou')

      }else{
        state.tarefas.push(data)
        console.log('criou')


      }
      console.log('index - ',index)
    },
    
    deleteTask(state, id){
      const idx = state.tarefas.findIndex(o => o.id === id) 
      state.tarefas.splice(idx,1)
      console.log('dentro', state, id)
    },
    createTask(state, data){
      
      state.tarefas.push(data)
    },
    updateTask(state, payload){
      state.tarefas = payload
    }

  },
  actions: {
    addTask(state, data){
      console.log(state, data)

      return new Promise ((resolve) => {
        setTimeout(() => {
          resolve()
          state.commit('createTask', data)
        }, 1500)
      })
    }
  },
  modules: {
  }
})
