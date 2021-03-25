import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import AutoComplete from "primevue/autocomplete";
import Avatar from "primevue/avatar";
import BadgeDirective from "primevue/badgedirective";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Carousel from "primevue/carousel";
import Chart from "primevue/chart";
import Checkbox from "primevue/checkbox";
import Chip from "primevue/chip";
import Chips from "primevue/chips";
import ColorPicker from "primevue/colorpicker";
import Column from "primevue/column";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import ContextMenu from "primevue/contextmenu";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Dialog from "primevue/dialog";
import Divider from 'primevue/divider';
import Dropdown from "primevue/dropdown";
import Fieldset from "primevue/fieldset";
import FileUpload from "primevue/fileupload";
import FullCalendar from "primevue/fullcalendar";
import InlineMessage from "primevue/inlinemessage";
import Inplace from "primevue/inplace";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Knob from "primevue/knob";
import Listbox from "primevue/listbox";
import MegaMenu from "primevue/megamenu";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import Message from "primevue/message";
import MultiSelect from "primevue/multiselect";
import OrderList from "primevue/orderlist";
import OrganizationChart from "primevue/organizationchart";
import OverlayPanel from "primevue/overlaypanel";
import Paginator from "primevue/paginator";
import Panel from "primevue/panel";
import PanelMenu from "primevue/panelmenu";
import Password from "primevue/password";
import PickList from "primevue/picklist";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import RadioButton from "primevue/radiobutton";
import Rating from "primevue/rating";
import Ripple from "primevue/ripple";
import ScrollPanel from "primevue/scrollpanel";
import SelectButton from "primevue/selectbutton";
import Sidebar from "primevue/sidebar";
import Skeleton from "primevue/skeleton";
import Slider from "primevue/slider";
import SplitButton from "primevue/splitbutton";
import Steps from "primevue/steps";
import TabMenu from "primevue/tabmenu";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";
import TieredMenu from "primevue/tieredmenu";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import ToggleButton from "primevue/togglebutton";
import Toolbar from "primevue/toolbar";
import Tooltip from "primevue/tooltip";
import Tree from "primevue/tree";
import TreeTable from "primevue/treetable";
import TriStateCheckbox from "primevue/tristatecheckbox";

import CleanLayout from "./layouts/CleanLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";

import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
// import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/themes/mdc-dark-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./assets/style/style.scss";
import store from "./store";



Vue.use(ToastService);
Vue.use(ConfirmationService);
Vue.directive("tooltip", Tooltip);
Vue.directive("ripple", Ripple);
Vue.directive("badge", BadgeDirective);


Vue.use(PrimeVue, { ripple: true });

Vue.config.productionTip = false;

Vue.component("default-layout", DefaultLayout);
Vue.component("clean-layout", CleanLayout);

Vue.component("Accordion", Accordion);
Vue.component("AccordionTab", AccordionTab);
Vue.component("AutoComplete", AutoComplete);
Vue.component("Avatar", Avatar);
Vue.component("Breadcrumb", Breadcrumb);
Vue.component("Button", Button);
Vue.component("Calendar", Calendar);
Vue.component("Card", Card);
Vue.component("Carousel", Carousel);
Vue.component("Chart", Chart);
Vue.component("Checkbox", Checkbox);
Vue.component("Chip", Chip);
Vue.component("Chips", Chips);
Vue.component("ColorPicker", ColorPicker);
Vue.component("Column", Column);
Vue.component("ConfirmDialog", ConfirmDialog);
Vue.component("ContextMenu", ContextMenu);
Vue.component("DataTable", DataTable);
Vue.component("DataView", DataView);
Vue.component("DataViewLayoutOptions", DataViewLayoutOptions);
Vue.component("Dialog", Dialog);
Vue.component("Divider", Divider);
Vue.component("Dropdown", Dropdown);
// Vue.component('Fieldset', Fieldset);
Vue.component("FileUpload", FileUpload);
Vue.component("FullCalendar", FullCalendar);
Vue.component("InlineMessage", InlineMessage);
Vue.component("Inplace", Inplace);
Vue.component("InputMask", InputMask);
Vue.component("InputNumber", InputNumber);
Vue.component("InputSwitch", InputSwitch);
Vue.component("InputText", InputText);
Vue.component("Knob", Knob);
Vue.component("Listbox", Listbox);
Vue.component("MegaMenu", MegaMenu);
Vue.component("Menubar", Menubar);
Vue.component("Menu", Menu);
Vue.component("Message", Message);
Vue.component("MultiSelect", MultiSelect);
Vue.component("OrderList", OrderList);
Vue.component("OrganizationChart", OrganizationChart);
Vue.component("OverlayPanel", OverlayPanel);
Vue.component("Paginator", Paginator);
Vue.component("PanelMenu", PanelMenu);
Vue.component("Panel", Panel);
Vue.component("Password", Password);
Vue.component("PickList", PickList);
Vue.component("ProgressBar", ProgressBar);
Vue.component("ProgressSpinner", ProgressSpinner);
Vue.component("RadioButton", RadioButton);
Vue.component("Rating", Rating);
Vue.component("ScrollPanel", ScrollPanel);
Vue.component("SelectButton", SelectButton);
Vue.component("Sidebar", Sidebar);
Vue.component("Skeleton", Skeleton);
Vue.component("Slider", Slider);
Vue.component("SplitButton", SplitButton);
Vue.component("Steps", Steps);
Vue.component("TabMenu", TabMenu);
Vue.component("TabPanel", TabPanel);
Vue.component("TabView", TabView);
Vue.component("Tag", Tag);
Vue.component("Textarea", Textarea);
Vue.component("TieredMenu", TieredMenu);
Vue.component("Toast", Toast);
Vue.component("ToggleButton", ToggleButton);
Vue.component("Toolbar", Toolbar);
Vue.component("TreeTable", TreeTable);
Vue.component("Tree", Tree);
Vue.component("TriStateCheckbox", TriStateCheckbox);


Vue.component("Splitter", Splitter );
Vue.component("SplitterPanel", SplitterPanel );

const app = new Vue({
  data() {
    return { loading: false };
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  app.loading = true;
  next();
});
router.afterEach(() => {
  app.loading = false;
  // setTimeout(() => (app.loading = false), 15000); // timeout for demo purposes
});
store.commit("setPlatform", process.platform);
