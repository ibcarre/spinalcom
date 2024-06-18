<template>
  <div v-if="floorSelected" class="container">
    <ul>
      <li v-for="room in rooms" :key="room.dynamicId">
        <room :room="room"></room>
      </li>
    </ul>
  </div>
</template>

<script>
import room from "./roomOccupancy.vue";
export default {
  components: {
    room,
  },
  data() {
    return {
      rooms: [],
    };
  },
  computed: {
    floorSelected() {
      //récupère l'id de l'étage séléctionné
      return this.$store.getters.floorId;
    },
  },
  methods: {
    fetchRooms() {
      if (this.floorSelected) {
        console.log("FETCHING");
        console.log(this.floorSelected);
        const floorList = this.$store.getters.buildings;
        console.log(floorList[0].dynamicId);
        const selectedFloor = floorList.find(
          (floor) => floor.dynamicId === this.floorSelected
        );
        if (selectedFloor) {
          this.rooms = selectedFloor.children;
        } else {
          this.rooms = [];
        }
      }
    },
  },
  watch: {
    floorSelected: {
      handler: "fetchRooms",
      immediate: true,
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 0px;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 15px;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
