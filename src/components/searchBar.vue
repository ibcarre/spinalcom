<template>
  <div>
    <input
      placeholder="Rechercher un étage"
      v-model="query"
      @input="recherche"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    recherche() {
      this.$emit("search", this.query);
    },
  },
};
</script>
<style scoped>
input {
  height: 50px;
  border-radius: 20px;
  width: 100%;
  font-size: 20px;
  padding-left: 15px;
  margin-right: 15px;
}
</style>
