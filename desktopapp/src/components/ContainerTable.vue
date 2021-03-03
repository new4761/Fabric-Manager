<template>
  <div>
    <div class="table-header p-grid ">
      Network containers
    </div>
    <div class="table-wrapper p-grid p-jc-center">
      <DataTable :value="container" class="custom-table" :autoLayout="true">
        <Column field="Names" header="Name">
          <template #body="slotProps">
            <div class="p-text-nowrap p-text-truncate">
              {{ slotProps.data.Names[0] }}
            </div>
          </template>
        </Column>
        <Column field="Image" header="Image"></Column>

        <Column header="Status" field="Status">
          <template #body="slotProps">
            <a v-if="slotProps.data.State == 'running'">●</a>

            {{ slotProps.data.Status }}
          </template>
        </Column>

        <Column header="Action">
          <template #body="slotProps">
            <Button
              label="Primary"
              class="p-button-outlined"
              @click="openInfo(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>

      <!-- <DataTable
        :value="Object.values(org)"
        class="custom-table"
        :autoLayout="true"
        dataKey="id"
        :expandedRows="expandedRows"
        @row-expand="onRowExpand"
        @row-collapse="onRowCollapse"
      >
        <Column :expander="true" />
        <Column field="Names" header="Name">
          <template #body="slotProps">
            <div class="p-text-nowrap p-text-truncate">
              {{ slotProps.data.name }}
            </div>
          </template>
        </Column>

        <Column field="Full name" header="Full name">
          <template #body="slotProps">
            <div class="p-text-nowrap p-text-truncate">
              {{ slotProps.data.fullname }}
            </div>
          </template>
        </Column>

        <Column field="Type" header="Type">
          <template #body="slotProps">
            <div class="p-d-flex">
              <span class="p-mx-1" v-if="slotProps.data.orderer">
                <Tag class="p-mr-2" severity="warning" value="orderer"></Tag>
              </span>
              <span class="p-mx-1" v-if="slotProps.data.ca">
                <Tag severity="danger" value="ca"></Tag>
              </span>
              <span class="p-mx-1" v-if="slotProps.data.peer > 0">
                <Tag
                  class="p-mr-2"
                  severity="info"
                  value="peer"
                  v-badge="slotProps.data.peer"
                ></Tag>
              </span>
            </div>
          </template>
        </Column>

        <Column header="Status"> </Column>

        <template #expansion="slotProps">
          <div class="orders-subtable">
            <h5>Orders for {{ slotProps.data.name }}</h5>
          </div>
        </template>
      </DataTable> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NetworkConfig from "../models/NetworkConfig";
@Component({
  components: {},
})
export default class ContainerTable extends Vue {
  envConfig: any;
  container: Array<Object> = [];
  activeContainer: number = 0;
  statusClass: string = "";
  expandedRows: any = [];
  org: {
    [key: string]: {
      name: string;
      fullname: string;
      child: Set<string>;
      container: object[];
      ca: boolean;
      peer: number;
      orderer: boolean;
    };
  } = {};

  created() {
    this.container = this.$store.state.docker.activeContainer;
    this.org = NetworkConfig.getOrgName();
    this.filter();
  }
  updated() {
    // this.$store.commit("docker/setActiveContainer");
    this.container = this.$store.state.docker.activeContainer;
    this.activeContainer = this.$store.getters[
      "docker/getActiveContainerCount"
    ];
    if (this.activeContainer == 0) {
      this.statusClass = "offline";
    } else {
      this.statusClass = "online";
    }
  }

  mounted() {
    this.container = this.$store.state.docker.activeContainer;
    this.org = NetworkConfig.getOrgName();
    this.filter();
  }

  filter() {
    this.container.forEach((element: any) => {
      element.Names[0] = element.Names[0].replace(/\//g, "");
      let name = element.Names[0].replace(/^[^.]*./gm, "");
      this.org[name].container.push(element);
    });
  }

  onRowExpand(event: any) {
    this.$toast.add({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  }
  onRowCollapse(event: any) {
    this.$toast.add({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/* .custom-table .p-datatable-header {
  background-color: rgb(255, 255, 255);
  font-size: 20px;
} */
@import "@/assets/style/_variables.scss";
.table-wrapper {
  padding: 10px 40px 40px 40px;
  background-color: $SubBgColor;
}

.table-header {
  padding: 40px;
  align-items: center;
  background-color: $SubBgColor;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 9px solid rgb(161, 161, 161);
}

.custom-table.p-datatable {
  background-color: $SubBgColor;
  font-size: 12px;
  overflow: auto;
  height: calc(94vh - 420px);
  width: 100%;
}

.custom-table .p-column-title {
  font-size: 17px;
}

.custom-table tr,
th {
  background-color: $SubBgColor !important;
  transition: all 0.3s !important;
}
.custom-table tr {
  font-size: 15px;
}
.custom-table tr:hover {
  color: $primaryBgColor;
  background-color: $SubBgColorHover !important;
}

.custom-table a {
  color: $primaryBgColor;
}

.container-info {
  width: 50vh;
}

.custom-table .p-datatable-header {
  background-color: $SubBgColor !important;
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
</style>

{ "Id": "463f2c69493cfbbcf3d4f56cf99a9e8e0c1c68bca23d2ce183868795f83a5a01",
"Names": [ "/orderer3.orderer3.example.com" ], "Image":
"hyperledger/fabric-orderer:2.3.0", "ImageID":
"sha256:0a77c27928906bb03bad208e07a6d8b7ff2538b7a15c97c028db40f28f0ca4e7",
"Command": "orderer", "Created": 1614759717, "Ports": [ { "PrivatePort": 7050,
"Type": "tcp" } ], "Labels": { "desktop.docker.io/binds/1/Source":
"D:/blockchain/testnet/vars/genesis.block",
"desktop.docker.io/binds/1/SourceKind": "hostFile",
"desktop.docker.io/binds/1/Target":
"/var/hyperledger/orderer/orderer.genesis.block",
"desktop.docker.io/binds/2/Source":
"D:/blockchain/testnet/vars/keyfiles/ordererOrganizations/orderer3.example.com/orderers/orderer3.orderer3.example.com/msp",
"desktop.docker.io/binds/2/SourceKind": "hostFile",
"desktop.docker.io/binds/2/Target": "/var/hyperledger/orderer/msp",
"desktop.docker.io/binds/3/Source":
"D:/blockchain/testnet/vars/keyfiles/ordererOrganizations/orderer3.example.com/orderers/orderer3.orderer3.example.com/tls",
"desktop.docker.io/binds/3/SourceKind": "hostFile",
"desktop.docker.io/binds/3/Target": "/var/hyperledger/orderer/tls" }, "State":
"running", "Status": "Up 50 seconds", "HostConfig": { "NetworkMode":
"5a086d0368_net" }, "NetworkSettings": { "Networks": { "5a086d0368_net": {
"IPAMConfig": null, "Links": null, "Aliases": null, "NetworkID":
"07519e4a75e2c844db8198e1a213318399636839aca19f8240358c7da6bf7d82",
"EndpointID":
"cdd80c91c1cee0083afd199d05f420abc58e24285b4c32937a7ce2db436085fa", "Gateway":
"172.18.0.1", "IPAddress": "172.18.0.10", "IPPrefixLen": 16, "IPv6Gateway": "",
"GlobalIPv6Address": "", "GlobalIPv6PrefixLen": 0, "MacAddress":
"02:42:ac:12:00:0a", "DriverOpts": null } } }, "Mounts": [ { "Type": "volume",
"Name": "0b75e4f42f1464ef99444a9abe8851774d873b07d38a9aa06237e90b1d1a761a",
"Source": "", "Destination": "/etc/hyperledger/fabric", "Driver": "local",
"Mode": "", "RW": true, "Propagation": "" }, { "Type": "volume", "Name":
"a44cb526cb2d9f273beb875f4975547c053aca0c65c52b41eaa4d93f580bcdb4", "Source":
"", "Destination": "/var/hyperledger", "Driver": "local", "Mode": "", "RW":
true, "Propagation": "" }, { "Type": "bind", "Source":
"/run/desktop/mnt/host/d/blockchain/testnet/vars/keyfiles/ordererOrganizations/orderer3.example.com/orderers/orderer3.orderer3.example.com/msp",
"Destination": "/var/hyperledger/orderer/msp", "Mode": "", "RW": true,
"Propagation": "rprivate" }, { "Type": "bind", "Source":
"/run/desktop/mnt/host/d/blockchain/testnet/vars/genesis.block", "Destination":
"/var/hyperledger/orderer/orderer.genesis.block", "Mode": "", "RW": true,
"Propagation": "rprivate" }, { "Type": "bind", "Source":
"/run/desktop/mnt/host/d/blockchain/testnet/vars/keyfiles/ordererOrganizations/orderer3.example.com/orderers/orderer3.orderer3.example.com/tls",
"Destination": "/var/hyperledger/orderer/tls", "Mode": "", "RW": true,
"Propagation": "rprivate" }, { "Type": "volume", "Name":
"orderer3.orderer3.example.com", "Source":
"/var/lib/docker/volumes/orderer3.orderer3.example.com/_data", "Destination":
"/var/hyperledger/production/orderer", "Driver": "local", "Mode": "z", "RW":
true, "Propagation": "" } ] },
