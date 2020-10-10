<template>
  <div>
<h3>Advanced</h3>
<OrganizationChart :value="data1" :collapsible="true" class="company" selectionMode="single" :selectionKeys="selection"
    @node-select="onNodeSelect" @node-unselect="onNodeUnselect" @node-collapse="onNodeCollapse" @node-expand="onNodeExpand">
    <template #person="slotProps">
        <div class="node-header ui-corner-top">{{slotProps.node.data.label}}</div>
        <div class="node-content">
            <img :src="'~/asstes/logo.png'" width="32">
            <div>{{slotProps.node.data.name}}</div>
        </div>
    </template>
    <template #default="slotProps">
        <span>{{slotProps.node.data.label}}</span>
    </template>
</OrganizationChart>

<h3>Basic</h3>
<OrganizationChart :value="data2">
    <template #default="slotProps">
        <span>{{slotProps.node.data.label}}</span>
    </template>
</OrganizationChart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class OrgChart extends Vue {
        $toast: any;
        data() {
        return {
            data1: {
                key: '0',
                type: 'person',
                styleClass: 'p-person',
                data: {label: 'CEO', name: 'Walter White', avatar: 'walter.jpg'},
                children: [
                    {
                        key: '0_0',
                        type: 'person',
                        styleClass: 'p-person',
                        data: {label: 'CFO', name:'Saul Goodman', avatar: 'saul.jpg'},
                        children:[{
                            key: '0_0_0',
                            data: {label: 'Tax'},
                            selectable: false,
                            styleClass: 'department-cfo'
                        },
                        {
                            key: '0_0_1',
                            data: {label: 'Legal'},
                            selectable: false,
                            styleClass: 'department-cfo'
                        }],
                    },
                    {
                        key: '0_1',
                        type: 'person',
                        styleClass: 'p-person',
                        data: {label: 'COO', name:'Mike E.', avatar: 'mike.jpg'},
                        children:[{
                            key: '0_1_0',
                            data: {label: 'Operations'},
                            selectable: false,
                            styleClass: 'department-coo'
                        }]
                    },
                    {
                        key: '0_2',
                        type: 'person',
                        styleClass: 'p-person',
                        data: {label: 'CTO', name:'Jesse Pinkman', avatar: 'jesse.jpg'},
                        children:[{
                            key: '0_2_0',
                            data: {label: 'Development'},
                            selectable: false,
                            styleClass: 'department-cto',
                            children:[{
                                key: '0_2_0_0',
                                data: {label: 'Analysis'},
                                selectable: false,
                                styleClass: 'department-cto'
                            },
                            {
                                key: '0_2_0_1',
                                data: {label: 'Front End'},
                                selectable: false,
                                styleClass: 'department-cto'
                            },
                            {
                                key: '0_2_0_2',
                                data: {label: 'Back End'},
                                selectable: false,
                                styleClass: 'department-cto'
                            }]
                        },
                        {
                            key: '0_2_1',
                            data: {label: 'QA'},
                            selectable: false,
                            styleClass: 'department-cto'
                        },
                        {
                            key: '0_2_2',
                            data: {label: 'R&D'},
                            selectable: false,
                            styleClass: 'department-cto'
                        }]
                    }
                ]
            },
            data2 : {
                key: '0',
                data: {label: 'F.C. Barcelona'},
                children: [
                    {
                        key: '0_0',
                        data: {label: 'F.C. Barcelona'},
                        children: [
                            {
                                key: '0_0_0',
                                data: {label: 'Chelsea F.C.'}
                            },
                            {
                                key: '0_0_1',
                                data: {label: 'F.C. Barcelona'}
                            }
                        ]
                    },
                    {
                        key: '0_1',
                        data: {label: 'Real Madrid'},
                        children: [
                            {
                                key: '0_1_0',
                                data: {label: 'Bayern Munich'}
                            },
                            {
                                key: '0_1_1',
                                data: {label: 'Real Madrid'}
                            }
                        ]
                    }
                ]
            },
            selection: {}
        }
    }

        onNodeSelect(node: { data: { label: any; }; }) {
            this.$toast.add({severity:'success', summary: 'Node Selected', detail: node.data.label, life: 3000});
        }
        onNodeUnselect(node: { data: { label: any; }; }) {
            this.$toast.add({severity:'success', summary: 'Node Unselected', detail: node.data.label, life: 3000});
        }
        onNodeExpand(node: { data: { label: any; }; }) {
            this.$toast.add({severity:'success', summary: 'Node Expanded', detail: node.data.label, life: 3000});
        }
        onNodeCollapse(node: { data: { label: any; }; }) {
            this.$toast.add({severity:'success', summary: 'Node Collapsed', detail: node.data.label, life: 3000});
        }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
