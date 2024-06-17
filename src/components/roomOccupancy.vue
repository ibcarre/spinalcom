<template>
  <div :class="['card', occupancyClass]">
    <span>{{ room.name }}</span>
    <span>{{ occupation }}</span>
    <div class="dynamicId">{{ room.dynamicId }}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    room: {
      //liste des pièces
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getEndpoints: "endpoints",
    }),
    occupation() {
      //récupère les endpoints et selon la valeur assigne une classe
      const endpoints = this.getEndpoints(this.room.dynamicId);
      const occupancy = endpoints.find(
        (endpoint) => endpoint.type === "Occupation"
      );
      if (occupancy && occupancy.currentValue !== undefined) {
        return occupancy.currentValue ? "Occupé" : "Non Occupé";
      }
      return "Indéfini";
    },
    occupancyClass() {
      const endpoints = this.getEndpoints(this.room.dynamicId);
      const occupancy = endpoints.find(
        (endpoint) => endpoint.type === "Occupation"
      );
      if (occupancy && occupancy.currentValue !== undefined) {
        return occupancy && occupancy.currentValue ? "occupe" : "nonOccupe";
      }
      return "indefini";
    },
  },
};
</script>
<style scoped>
.card {
  position: relative;
  width: 100%;
  border-radius: 2em;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.occupe {
  background-color: rgb(35, 172, 108) !important;
  color: white !important;
}
.nonOccupe {
  background-color: black !important;
  color: #fe7966 !important;
}
.dynamicId {
  position: absolute;
  bottom: 5px;
  right: 15px;
  font-size: 10px;
  font-weight: 200;
}
.indefini {
  color: black;
  background-color: rgb(183, 183, 183);
}
</style>
