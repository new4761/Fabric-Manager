<template>
  <div style="background-color: powderblue;">
    <div class="p-grid p-jc-center p-my-1">
      <div class="el p-col-4 ">not</div>
      <div class="el p-col-4 ">thing</div>
      <div class="el p-col-4 ">here yet</div>
    </div>

    <div class="p-grid p-jc-center  p-my-1">
      <div class="log p-col-12 " id="log" v-html="highlight()"></div>
    </div>

    <div class="p-grid p-jc-center  p-my-1">
      <div class="container p-col-12 ">
        {{ container }}
      </div>
      
    </div>

    <DataTable :value="container" class="custom-table">
      <Column field="Names" header="Name"></Column>
      <Column field="Image" header="Image"></Column>
      <Column field="State" header="State"></Column>
      <Column field="Status" header="Status"></Column>
    </DataTable>

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
import fs from "fs";
import Vue from "vue";
import Component from "vue-class-component";
import CreateNetButton from "./components/CreateNetButton.vue";
import DockerProcess from "./module/DockerProcess";
@Component({
  components: {
    CreateNetButton,
  },
})
export default class Index extends Vue {
  log: string = "";
  container: Array<Object> = [];

  created() {
    this.getContainer();
    this.readLog();
    this.highlight();
    // setInterval(() => this.readLog(), 5000);
  }

  getContainer() {
    DockerProcess.listContainer().then((result: any) => {
      this.container = result;
    });
  }

  readLog() {
    this.log = fs.readFileSync("./log/project.log", "utf8");
    this.highlight();
    this.getContainer();
  }

  highlight() {
    var temp = this.log;
    temp = temp.replace(new RegExp("INFO", "gi"), (match) => {
      return '<span class="info">' + match + "</span>";
    });

    temp = temp.replace(new RegExp("WARN", "gi"), (match) => {
      return '<span class="warn">' + match + "</span>";
    });

    temp = temp.replace(new RegExp("ERROR", "gi"), (match) => {
      return '<span class="error">' + match + "</span>";
    });

    temp = temp.replace(
      new RegExp(
        "[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]",
        "gi"
      ),
      (match) => {
        return '<span class="timestamp">' + match + "</span>";
      }
    );
    return temp;
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

.el {
  background-color: white;
  height: 100px;
  border-style: solid;
}

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
