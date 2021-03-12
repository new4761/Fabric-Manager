<template>
  <div class="layout-menu-container">
    <AppSubmenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
    />
    <ul>
      <li @click="exportAppDisplay = true">
        <i></i> <span>ExportApplication</span>
      </li>
    </ul>
    <Dialog
      modal
      :dismissableMask="true"
      :closable="false"
      v-bind:visible="exportAppDisplay"
    >
      <template #header>
        <span>ExportApplication</span>
        <Button
          @click="exportAppDisplay = false"
          icon="pi pi-times"
          class="p-button-text p-ml-auto p-button-rounded"
        />
      </template>
      <ExportApplicationPage />
    </Dialog>
  </div>
</template>

<script>
import AppSubmenu from "./AppSubmenu";
import ExportApplicationPage from "@/pages/ExportApplicationPage";

export default {
  data() {
    return { exportAppDisplay: true };
  },

  props: {
    model: Array,
  },
  methods: {
    onMenuItemClick(event) {
      this.$emit("menuitem-click", event);
    },
  },
  components: {
    AppSubmenu: AppSubmenu,
    ExportApplicationPage,
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
@import "@/assets/style/sass/mixins.scss";

// .layout-menu-container {
//     // padding-bottom: 120px;
// }

.layout-menu {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    a {
      cursor: pointer;
      position: relative;
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: color $transitionDuration;

      i {
        font-size: 16px;
      }

      span {
        margin-left: 0.5em;
      }

      .menuitem-toggle-icon {
        margin-left: auto;
      }

      &:focus {
        @include focused-inset();
      }
    }

    &.active-menuitem {
      > a {
        .menuitem-toggle-icon {
          @include icon-override("\e933");
        }
      }
    }
  }

  > li {
    > a {
      padding: 1em;

      span {
        font-size: $fontSize;
      }
    }

    &:last-child {
      > a {
        border-bottom: 1px solid $menuitemDarkBorderColor;
      }
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      padding-left: 1.5em;

      li {
        a {
          cursor: pointer;
          padding: 0.75em 1em;
          border-top: 0 none;

          span {
            font-size: $submenuFontSize;
          }
        }

        &:last-child {
          padding-bottom: 1em;
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
        transition: max-height 0.45s ease-in-out;
      }

      &.layout-submenu-wrapper-enter-active {
        overflow: hidden;
        transition: max-height 1s ease-in-out;
      }
    }
  }
}

.layout-sidebar-dark {
  @include linear-gradient($menuDarkBgColorFirst, $menuDarkBgColorLast);
  width: 220px;
  .layout-menu {
    > li {
      > a {
        border-top: 1px solid $menuitemDarkBorderColor;
      }

      &:last-child {
        > a {
          border-bottom: 1px solid $menuitemDarkBorderColor;
        }
      }

      ul {
        background-color: $menuitemDarkActiveBgColor;
      }
    }

    li {
      a {
        color: $menuitemDarkColor;

        &.router-link-active {
          color: $menuitemActiveRouteColor;
        }

        &:hover {
          color: $menuitemDarkHoverColor;
        }
      }

      &.active-menuitem {
        > a {
          background-color: $menuitemDarkActiveBgColor;
          color: $menuitemDarkActiveColor;
        }
      }
    }
  }
}
</style>
