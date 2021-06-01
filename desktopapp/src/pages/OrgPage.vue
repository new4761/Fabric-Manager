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
        <div class="p-d-flex">
          <div class="org-title p-col-8">
            {{ item.name }}
          </div>
          <div class="p-col p-m-1">
            <div class="p-d-flex p-jc-end">
              <span class="p-mx-1" v-if="item.orderer">
                <Tag class="p-mr-2" severity="warning" value="orderer"></Tag>
              </span>
              <span class="p-mx-1" v-if="item.ca">
                <Tag severity="danger" value="ca"></Tag>
              </span>
              <span class="p-mx-1" v-if="item.peer > 0">
                <Tag
                  class="p-mr-2"
                  severity="info"
                  value="peer"
                  v-badge="item.peer"
                 
                ></Tag>
              </span>
            </div>
          </div>
        </div>

        <div class="p-d-flex">
          <div class="org-subtitle p-col-8">
            {{ item.fullname }}
          </div>
        </div>

        <div class="p-d-flex">
          <div class="p-col">
            <small> //TODO MSP, NODE OU, CERT</small>
          </div>
        </div>
        <div class="p-d-flex">
          <div class="p-col">
            <div>
              <OrgDetail v-bind:object="Array.from(item.child)" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
  org: object = {};

  mounted() {
    this.init();
  }

  init() {
    this.org = NetworkConfig.getOrgData();
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.org-list {
  background-color: rgb(255, 255, 255);
  color: rgb(58, 58, 58);
  width: 100%;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 5px;
}

.org-title {
  font-weight: bolder;
  font-size: 25px;
}
.org-subtitle {
  font-size: 15px;
}
</style>
