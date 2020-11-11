<template>
  <div >
    <br />
    <div>
      <Button label="test" @click="display = true" />
    </div>
    <div>
    <Dialog
      header="Create new network"
      v-bind:visible="display"
      :closable="false"
      modal
     :style="{width:'80vw'}"  
      :contentStyle="{ overflow: 'visible' }"
    >
        <div class="p-col-12">
    </div>
     <div class="p-col-12">
        <div class="p-inputgroup">
            <Button label="SetProjectDirectory" @click="getFilepath()" />
            <InputText placeholder="projectdirectory" v-model="projectDir" disabled/>
        </div>
    </div>
    <!-- <ul id="example-1">
  <li v-for="item in object.orgList" :key="item.name">
    {{item}}
  </li>
</ul> -->
    <OrgEditButton v-bind:object="object.orgList" @remove-org="removeOrgFromList"></OrgEditButton>
      <div class="p-grid p-fluid p-field">
        <OrgInputText @new-org="newOrgTolist" ></OrgInputText>
      </div>
 <Button label="create" @click="createNetwork()" />
      <Button label="close" @click="display = false" />
        <Button label="testCall" @click="callMini()" />

    </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
const {dialog} = require('electron').remote;
import Vue from "vue";
import Component from "vue-class-component";
import OrgInputText from "./OrgInputText";
import OrgEditButton from "./OrgEditButton"
import SpecConfig from "../../models/SpecConfig"
import OSProcess from "../../module/OSProcess"
@Component({
  components: {
    OrgInputText,OrgEditButton
  },
})
export default class DemoSpecButton extends Vue {
  display: boolean = false;
  object = SpecConfig;
  projectDir:string = "";

  newOrgTolist(name:string,isOrderer:boolean){ 

    this.object.newOrg(name,isOrderer);
      
  }
  removeOrgFromList(target){
  //  console.log(target);
    this.object.removeOrg(target);
  }
  createNetwork(){
   this.object.createFile();
   this.object.setUpFileStructure(this.projectDir);
  }
  callMini(){
    OSProcess.testfunction(this.projectDir);
  }
  getFilepath(){
    dialog.showOpenDialog({
    properties: ['openDirectory']
}).then(result => {(this.projectDir =result.filePaths[0])})}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

