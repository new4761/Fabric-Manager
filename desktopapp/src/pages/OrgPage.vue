<template>
  <div>
    <h1>
      Organization
    </h1>

    <div class="p-grid p-jc-center">
      <div
        class="org-list p-shadow-3"
        v-for="(item, index) in org"
        :key="index"
      >
        <div class="p-grid">
          <div class="p-col-8">
            <h4>{{ item.name }}</h4>
          </div>
          <div class="p-col p-m-1">
            <div class="p-grid p-jc-end">
              <span class="p-mx-1" v-if="item.orderer"> <Tag class="p-mr-2" severity="warning" value="orderer"></Tag> </span>
              <span class="p-mx-1" v-if="item.ca"> <Tag severity="danger" value="ca"></Tag> </span>
              <span class="p-mx-1" v-if="item.peer > 0"> <Tag class="p-mr-2" severity="info" value="peer"></Tag> </span>
            </div>
          </div>
        </div>

        <div class="p-grid">
          <div class="p-col">  <small> {{ item }} </small></div>
        
        </div>
        <div class="org-sub">
          <OrgDetail v-bind:object="Array.from(item.child)" />
        </div>
      </div>
    </div>

    <small>
      {{ org }}
    </small>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NetworkConfig from "../models/NetworkConfig";
import OrgDetail from "../components/orgpage/OrgDetail.vue";
@Component({
  components: { OrgDetail },
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

    
  }
}
</script>

<style>
.org-list {
  background-color: rgb(255, 255, 255);
  color: rgb(58, 58, 58);
  width: 100%;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 5px;
}

.org-sub {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  overflow: hidden;
  transition: all 0.5s;
  cursor: pointer;
  border-radius: 5px;
}

.org-sub:hover {
  color: #0388e5;
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
  color: #0388e5;
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
