<template>
	<div class="layout-profile">

		<button class="p-link layout-profile-link" @click="onClick">
			<span class="username">Project name</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Switch project</span></button></li>
                <li><button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Setting</span></button></li>
                <li><button class="p-link"><i class="pi pi-fw pi-power-off"></i><span>Close</span></button></li>
            </ul>
        </transition>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				expanded: false
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			}
		}
	}
</script>

<style scoped>

</style>