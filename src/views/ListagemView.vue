<template>
  <div>
    <h1>tela de listagem</h1>

    <ListaTarefas/>
  </div>
</template>

<script>
import ListaTarefas from "@/components/Tarefas/TarefaItems.vue"


export default {
  components:{
      ListaTarefas
  },
  setup() {
    
  },
}
</script>