<template>
  <div class="">
    <Dialog
      header="Header"
      v-bind:visible="display"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="display = false"
          class="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          @click="display = false"
          autofocus
        />
      </template>
    </Dialog>

    <table role="grid" class="p-my-1">
      <tbody class="p-datatable-tbody">
        <tr @click="toggle()">
          <td>
            <div class="p-grid">
              <div
                :class="{
                  'column-toggle-open': showSection,
                  'column-toggle p-mx-2': true,
                }"
              >
                <i class="pi pi-angle-right"></i>
              </div>
              {{ item.name }}
            </div>
          </td>
          <td>
            {{ item.fullname }}
          </td>
          <td>
            <div class="p-d-flex">
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
          </td>
          <td>{{ item.container.length }} running container</td>
        </tr>
      </tbody>
    </table>
    <transition name="smooth-org">
      <div v-show="showSection" class="p-px-5 sub-table-wrapper">
        <DataTable :value="item.container" :autoLayout="true" class="sub-table">
          <Column>
            <template #body="slotProps">
              <div class="p-text-nowrap p-text-truncate">
                {{ slotProps.data.Names[0] }}
              </div>
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <a v-if="slotProps.data.State == 'running'">●</a>
              {{ slotProps.data.Status }}
            </template>
          </Column>

          <Column>
            <template #body="slotProps">
              <Button
                icon="fas fa-terminal"
                class="p-button-outlined p-button-primary p-button-sm"
                @click="executeDocker(slotProps.data.Names[0])"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const { exec } = require("child_process");

@Component({
  props: {
    item: Object,
  },
})
export default class OrgColumn extends Vue {
  showSection: boolean = false;
  display: boolean = false;

  toggle() {
    this.showSection = !this.showSection;
  }

  executeDocker(container: string) {
    this.display = true;
    console.log("display", this.display);
    exec(' start cmd.exe @cmd /k "docker exec -it ' + container + ' /bin/sh"');
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
// .sub-table tr,
// th {
//   background-color: black !important;
//   transition: all 0.3s !important;
// }
// .sub-table tr {
//   font-size: 2px;
// }
// .sub-table tr:hover {
//   color:  black !important;
//   background-color: black !important;
// }

// .sub-table a {
//   color: $primaryColor;
// }

.smooth-org-enter,
.smooth-org-leave-to {
  overflow: hidden;
  max-height: 0;
}

.smooth-org-enter-to,
.smooth-org-leave {
  overflow: hidden;
  max-height: 1000px;
}

.smooth-org-leave-active {
  overflow: hidden;
  transition: max-height 0.3s;
}

.smooth-org-enter-active {
  overflow: hidden;
  transition: max-height 1s;
}

.column-toggle {
  transition: transform 0.2s ease;
}
.column-toggle-open {
  transform: rotate(90deg);
  color: $primaryColor;
}
</style>
