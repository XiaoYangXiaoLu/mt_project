import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible";
import { Button, Icon } from "vant";
import {
  Calendar,
  Cell,
  Tab,
  Tabs,
  TreeSelect,
  Stepper,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Toast,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  ContactCard,
  Card,
  Dialog,
  AddressList,
  AddressEdit,
  Field,
  Form,
} from "vant";
import router from "./router/index";
import "./common/css/base.less";
import store from "./store";

const app = createApp(App);

//vant
app.use(Button).use(Icon);
app.use(Calendar);
app.use(Cell);
app.use(Tab);
app.use(Tabs);
app.use(TreeSelect);
app.use(Stepper);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Toast);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(SubmitBar);
app.use(ContactCard);
app.use(Card);
app.use(Dialog);
app.use(AddressList);
app.use(AddressEdit);
app.use(Field);
app.use(Form);

//router
app.use(router);
app.use(store);
app.mount("#app");
