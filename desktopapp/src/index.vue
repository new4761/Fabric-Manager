<template>
  <div>
    <!-- <div class="p-grid p-jc-center p-my-1">
      <div class=" p-col-4 ">
        
      </div>
      <div class=" p-col-4 ">thing</div>
      <div class=" p-col-4 ">here yet</div>
    </div> -->

    <div class="p-grid p-jc-center p-my-1">
      <div class="p-col-5">
        <div class="tag-wrapper">
          <div class="netstat-card netstat-card-content1">
            <h1 class="netstat-card-title">
              {{ activeContainer }} out of
              {{ this.$store.getters["docker/getContainerCount"] }}
            </h1>
            <div class="netstat-card-desc">active containers</div>
            <div class="netstat-card-divider"></div>
            <div class="netstat-card-progress-wrapper">
              <div class="tagline netstat-card-tag">net stat</div>
              <div class="netstat-card-progress">
                {{
                  (activeContainer /
                    this.$store.getters["docker/getContainerCount"]) *
                    100
                }}
                %
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>

      <div class="p-col-3">
        <div class="tag-wrapper">
          <div class="netstat-card netstat-card-content4">
            <div class="netstat-card-desc">
              {{ this.$store.state.platform }}
            </div>
            <div class="netstat-card-desc">
              {{ this.$store.state.project.path }}
            </div>
            <div class="netstat-card-desc">net stage</div>
            <div class="netstat-card-desc">port</div>
          </div>
          <div class="divider"></div>
        </div>
      </div>

      <div class="p-col-4">
        <a  class="btn teal p-ripple" v-ripple
          >Explorer
          <img src="./assets/explorer.svg" class="btn-icon btn-icon--vis" />
        </a>

        <a  class="btn light-blue p-ripple" v-ripple
          >Portainer
          <img src="./assets/portainer.svg" class="btn-icon btn-icon--vis"
        /></a>
      </div>
    </div>

    <ContainerTable v-bind:container="container" />

    <LogView />

    <div class="p-grid p-jc-center  p-my-1">
      <div class="el p-col-12 " style=" height: 100vh;">
        <div class="p-py-5">
          <Button label=" demo " @click="$router.push('demo')" class="p-m-1" />
          <Button
            label=" channel "
            @click="$router.push('channel')"
            class="p-m-1"
          />
          <Button label=" project " @click="$router.push('/')" class="p-m-1" />
          <Button label=" org " @click="$router.push('org')" class="p-m-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ContainerTable from "./components/ContainerTable.vue";
import LogView from "./components/LogView.vue";
import DockerProcess from "./module/DockerProcess";
@Component({
  components: {
    ContainerTable,
    LogView,
  },
})
export default class Index extends Vue {
  container: Array<Object> = [];
  activeContainer: number = 0;

  created() {
    console.log(this.$store.state.project.path);
    this.$store.commit("docker/setContainer");
    this.$store.commit("docker/setOrgContainer");
    this.getContainer();
  }
  mounted() {}

  updated() {
    this.$store.commit("docker/setActiveContainer");
    this.activeContainer = this.$store.getters[
      "docker/getActiveContainerCount"
    ];
  }

  getContainer() {
    DockerProcess.listContainer()
      .then((result: any) => {
        this.container = result;
      })
      .catch(() => {
        // console.log(err);
        this.container = [];
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.custom-table.p-datatable {
  border-style: solid;
  background-color: rgb(219, 219, 219);
  border-radius: 5px;
  color: rgb(114, 114, 114);
  font-size: 12px;
  overflow: auto;
  height: 200px;
}

.custom-table .p-column-title {
  color: rgb(74, 147, 255);
  font-size: 15px;
}

/* p-datatable-header
p-datatable-footer
p-column-title
p-sortable-column
p-column-filter
p-datatable-scrollable-header
p-datatable-scrollable-body
p-datatable-scrollable-footer
p-datatable-responsive
p-datatable-emptymessage
p-rowgroup-header
p-rowgroup-footer */

.container {
  border-style: solid;
  background-color: rgb(219, 219, 219);
  border-radius: 5px;
  color: rgb(114, 114, 114);
  font-size: 12px;
  white-space: break-spaces;
  word-break: break-all;
  padding: 1em;
  overflow: auto;
  height: 200px;
}

.log {
  background-color: rgb(56, 56, 56);
  border-radius: 5px;
  color: aliceblue;
  font-size: 12px;
  white-space: break-spaces;
  word-break: break-all;
  padding: 1em;
  overflow: auto;
  height: 200px;
}

.info {
  font-weight: bold;
  color: rgb(103, 184, 255);
}

.warn {
  font-weight: bold;
  color: rgb(255, 190, 93);
}

.error {
  font-weight: bold;
  color: rgb(255, 97, 97);
}

.timestamp {
  font-size: 10px;
  font-weight: lighter;
  color: rgb(134, 134, 134);
}
</style>
