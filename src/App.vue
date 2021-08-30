<template>
  <div id="app">
    <validation-provider
      rules="required|rut-valid"
      name="rut-full"
      slim
      v-slot="{ errors }"
    >
      <input v-rut v-model="rut" />
      <p>{{ errors[0] }}</p>
    </validation-provider>
    <validation-provider
      rules="required"
      name="rut"
      class="container"
      tag="div"
      v-slot="{ errors }"
    >
      <div class="rut-number">
        <input v-thousands v-model="rut2" />
      </div>
      <validation-provider
        slim
        rules="required|length:1|rut-valid-number:@rut"
        class="rut-validator"
        name="Digito Validador"
        v-slot="{ errors: errors2 }"
      >
        <input v-model="validatorNumber" />
        <div class="errors">
          <p>{{ errors[0] }}</p>
          <p>{{ errors2[0] }}</p>
        </div>
      </validation-provider>
    </validation-provider>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    rut: "123",
    rut2: "",
    validatorNumber: "",
  }),
  computed: {
    valueRut() {
      return Number(this.rut2.replace(/\./, ""));
    },
  },
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  display: flex;
  align-items: center;

  justify-content: center;
  input {
    height: 100%;
  }
}
.rut-number {
  input {
    width: 100%;
  }
}
.rut-validator {
  margin-left: 10px;
  width: 30px;
  input {
    width: 100%;
  }
  .errors {
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>
