<template>
  <div>
    <div class="container-header">
      <div class="p-col ">
        <div class="p-d-flex p-jc-between">
          <!-- <div class="p-datatable p-component p-datatable-auto-layout">
            <table role="grid">
              <tbody class="p-datatable-tbody">
                <tr>
                  <td>
                    1
                  </td>
                  <td>
                    2
                  </td>
                  <td>
                    4
                  </td>
                  <td>
                    5
                  </td>
                </tr>
                <tr>
                  <td>
                    1
                  </td>
                  <td>
                    2
                  </td>
                  <td>
                    4
                  </td>
                  <td>
                    5
                  </td>
                </tr>
              </tbody>
            </table>
          </div> -->
          <div>
            Organization list
          </div>
          <div>
            ###########
          </div>
        </div>
      </div>
    </div>
    <div class="container-content">
      <div v-if="false" class="container">
        network is currently offline
      </div>
      <ContainerTable v-else />
    </div>

    <div class="container-footer">
      explorer stuff
    </div>

    <!-- <LogView /> -->

    <!-- <div class="p-d-flex p-my-1">
      <div class="p-col-4">
        <a class="btn teal p-ripple" v-ripple
          >Explorer
          <img src="./assets/explorer.svg" class="btn-icon btn-icon--vis" />
        </a>

        <a class="btn light-blue p-ripple" v-ripple
          >Portainer
          <img src="./assets/portainer.svg" class="btn-icon btn-icon--vis"
        /></a>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ContainerTable from "./components/ContainerTable.vue";
import LogView from "./components/LogView.vue";

@Component({
  components: {
    ContainerTable,
    LogView,
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

.container-header {
  padding: 30px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 20px;
  font-weight: bold;
  height: 110px;
}

.container-content {
}

.container-footer {
  padding: 30px;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
}
.container {
  border-style: solid;
  background-color: rgb(219, 219, 219);
  border-radius: 5px;
  color: rgb(114, 114, 114);
  font-size: 30px;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

/* button base */
.btn {
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 8px 30px;
  border-radius: 10px;
  line-height: normal;
  font-size: 18px;
  color: #fff;
  background: #0099ff;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.btn:hover {
  line-height: normal;
}
.btn-icon {
  will-change: width, transform;
  width: 0;
  height: 50px;
  padding: 2px;
  border-radius: 50%;
  fill: #fff;
  background: rgb(255, 255, 255);
  margin-left: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.btn-icon--vis {
  width: 50px;
  transform: scale(1);
  margin-left: 8.333333333333334px;
}
.btn:hover .btn-icon {
  width: 50px;
  transform: scale(1);
  margin-left: 8.333333333333334px;
}

.light-blue {
  background: rgb(87, 209, 250);
}
.light-blue:hover {
  background: darken(rgb(87, 209, 250), 10%);
}

.teal {
  background: teal;
}
.teal:hover {
  background: darken(teal, 10%);
}
</style>
