import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    buildings: [], //Si non séléction bâtiment : liste des bâtiments
    //Si séléction bâtiment : renvoie le bâtiment choisi
    loading: false,
    error: null,
    selectedBuildingId: null, //si séléction alors renvoie Id bâtiment séléctionné
    building: "", //renvoie le nom du bâtiment séléctionné
    filteredBuildings: [], //liste des bâtiments filtrés
    endpoints: {}, //liste des endpoints
    floorSelected: 0, //Id de l'étage séléctionné
  },
  mutations: {
    SET_BUILDINGS(state, buildings) {
      state.buildings = buildings;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SELECTED_BUILDING_ID(state, id) {
      state.selectedBuildingId = id;
    },
    SET_BUILD(state, build) {
      state.building = build;
    },
    SET_FILTEREDBUILDINGS(state, filt) {
      state.filteredBuildings = filt;
    },
    SET_ENDPOINTS(state, { RoomId, endpoints }) {
      Vue.set(state.endpoints, RoomId, endpoints);
    },
    SET_SELECTEDFLOOR(state, floorId) {
      state.floorSelected = floorId;
    },
  },
  actions: {
    async fetchBuildings({ commit }) {
      //récupère les bâtiments de l'API et set buildings dans le store
      commit("SET_LOADING", true);
      try {
        const response = await axios.get(
          "https://api-developers.spinalcom.com/api/v1/geographicContext/space"
        );
        const buildings = response.data;
        commit("SET_BUILDINGS", buildings.children);
        commit("SET_FILTEREDBUILDINGS", buildings.children);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async fetchEndpoints({ commit }, RoomId) {
      //récupère les endpoints de l'API et set endpoints dans le store
      commit("SET_LOADING", true);
      try {
        const response = await axios.get(
          `https://api-developers.spinalcom.com/api/v1/room/${RoomId}/control_endpoint_list`
        );
        const endpoints = response.data.length
          ? response.data[0].endpoints
          : [];
        commit("SET_ENDPOINTS", { RoomId, endpoints });
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    selectBuildingID({ commit }, id) {
      //set l'id du bâtiment séléctionné
      commit("SET_SELECTED_BUILDING_ID", id);
    },
    selectedBuildingName({ commit }, name) {
      //set le nom du bâtiment séléctionné
      commit("SET_BUILD", name);
    },
    filterBuildings({ commit }, filt) {
      //set la liste de bâtiments filtrés
      commit("SET_FILTEREDBUILDINGS", filt);
    },
    selectFloor({ commit }, floorId) {
      //set l'Id de l'étage séléctionné
      commit("SET_SELECTEDFLOOR", floorId);
    },
    floorList({ commit }, buildingFloors) {
      //set la liste
      commit("SET_BUILDINGS", buildingFloors);
    },
  },
  getters: {
    buildings: (state) => state.buildings,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
    selectedBuildingId: (state) => state.selectedBuildingId,
    building: (state) => state.building,
    filteredBuildings: (state) => state.filteredBuildings,
    endpoints: (state) => (RoomId) => state.endpoints[RoomId] || [],
    floorId: (state) => state.floorSelected,
  },
});

export default store;
