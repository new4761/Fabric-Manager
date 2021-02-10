<template>
  <div>
    <h1>
      Organization 
    </h1>


    <div class="p-grid p-jc-center">
      <div class="org-list" v-for="(item, index) in org" :key="index">
        <div class="p-grid">
          <div class="p-col">
            <h4>{{ item.name }}</h4>
          </div>
        </div>

        <div class="p-grid">
          <div class="p-col">{{ item }}</div>
        </div>
        <div class="org-sub">
          <OrgSubMenu v-bind:object="Array.from(item.child)" />
        </div>
      </div>
    </div>

    <small>
      {{ fabric }}
    </small>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NetworkConfig from "../models/NetworkConfig";
import OrgSubMenu from "../components/orgPage/OrgSubMenu.vue";
@Component({
  components: { OrgSubMenu },
})
export default class OrgPage extends Vue {
  fabric: object = {};
  org: object = {};

  mounted() {
    this.init();
  }

  init() {
    this.fabric = NetworkConfig.getValue("project_config.fabric");
    this.org = NetworkConfig.getOrgName();
    console.log(this.org);
  }
}
</script>

<style>
.org-list {
  background-color: rgb(0, 89, 255);
  color: rgb(255, 255, 255);
  width: 100%;
  margin: 0.5em;
}

.org-sub {
  background-color: rgb(156, 156, 156);
  color: azure;
  overflow: hidden;
  transition: all 0.5s;
  cursor: pointer;
}

.org-sub:hover {
  color: rgb(0, 0, 0);
}

.org-item {
  background-color: rgb(78, 78, 78);
  color: rgb(255, 255, 255);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.5s;
}

.org-item:hover {
  color: rgb(133, 133, 252);
}

.smooth-enter,
.smooth-leave-to {
   background-color: rgb(78, 78, 78);
  overflow: hidden;
  max-height: 0;
}

.smooth-enter-to,
.smooth-leave {
   background-color: rgb(78, 78, 78);
  overflow: hidden;
  max-height: 1000px;
}

.smooth-leave-active {
   background-color: rgb(78, 78, 78);
  overflow: hidden;
  transition: max-height 0.3s;
}

.smooth-enter-active {
   background-color: rgb(78, 78, 78);
  overflow: hidden;
  transition: max-height 1s;
}
</style>
