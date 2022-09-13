<template>
  <div class="home">
    <h1>Tela de home</h1>
    <TelaInicial/>
  </div>
</template>

<script>
import TelaInicial from '@/components/TelaInicial.vue'

export default {
  name: 'HomeView',
  components: {
    TelaInicial
  }
}
</script>
