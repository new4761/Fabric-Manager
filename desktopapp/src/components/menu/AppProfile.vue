<template>
	<div class="layout-profile">

		<button class="p-link layout-profile-link" @click="onClick">
			<span class="username">Project name</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link" @click="$router.push('/')"><i class="pi pi-fw pi-user"></i><span>Switch project</span></button></li>
                <li><button class="p-link" @click="onClick"><i class="pi pi-fw pi-inbox"></i><span>Setting</span></button></li>
                <li><button class="p-link" @click="onClick"><i class="pi pi-fw pi-power-off"></i><span>Close</span></button></li>
            </ul>
        </transition>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				expanded: false,
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			}
		},
	}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
@import "@/assets/style/sass/mixins.scss";

.layout-profile {
    text-align: center;
    padding: 20px 0;

    img {
        width: 56px;
        margin: 10px;
    }

    .layout-profile-link {
        cursor: pointer;
        display: inline-block;
        margin-bottom: 0.75em;
        transition: color $transitionDuration;

        i {
            display: inline-block;
            font-size: 16px;
            vertical-align: middle;
            margin-left: 0.5em;
        }
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
            button {
                width: 100%;
                padding: 1em;
                border: 0 none;
                border-radius: 0;
                cursor: pointer;
                transition: color $transitionDuration;

                &:hover {
                    color: $menuitemDarkHoverColor;
                }

                span {
                    margin-left: 0.25em;
                    vertical-align: middle;
                }

                i {
                    vertical-align: middle;
                }
            }
        }

        &.layout-submenu-wrapper-enter,
        &.layout-submenu-wrapper-leave-to {
            max-height: 0;
        }

        &.layout-submenu-wrapper-enter-to,
        &.layout-submenu-wrapper-leave {
            max-height: 1000px;
        }

        &.layout-submenu-wrapper-leave-active {
            overflow: hidden;
            transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
        }

        &.layout-submenu-wrapper-enter-active {
            overflow: hidden;
            transition: max-height 1s ease-in-out;
        }
    }
}

.layout-sidebar-dark {
    .layout-profile {
        .layout-profile-link {
            color: $menuitemDarkColor;

            &:hover {
                color: $menuitemDarkHoverColor;
            }
        }

        ul {
            background-color: $menuitemDarkActiveBgColor;

            li {
                button {
                    color: $menuitemDarkColor;

                    &:hover {
                        color: $menuitemDarkHoverColor;
                    }
                }
            }
        }
    }
}


</style>