
<template>


    <div class="p-col-12">
        <div class="p-inputgroup">
           <InputText placeholder="Organization name" v-model="orgName"/>
        <span class="p-inputgroup-addon">
               <Checkbox v-model="isOrderer" :binary="true" />
          <label for="binary" class="p-ml-2">Orderer</label>
        </span>
          <Button icon="pi pi-plus" class="p-button-success" @click="added"/>
      <!--      <Button icon="pi pi-trash" class="p-button-danger"/> -->
        </div>     
    </div>


</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
  components: {
  }
})
export default class OrgInputText extends Vue {
 display:boolean =false;
 isOrderer:boolean=false; 
 orgName:string="";
 added(){
  this.$emit('new-org',this.orgName,this.isOrderer);
  this.isOrderer = false;
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

