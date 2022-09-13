<template>
  <div class="lista">
    <h5>lista de tarefas</h5>

    <h1 v-if="$store.state.tarefas.length <= 0">Não há tarefas</h1>
    <Tarefa
    v-else
      v-for="t in $store.state.tarefas"
      :key="t.id"
      :tarefa="t"/>

  </div>
</template>

<script>

import Tarefa from "./TarefaItem.vue"
export default {
  components:{
Tarefa
  },
  setup() {
  },
}
</script>

<style scoped>

</style>