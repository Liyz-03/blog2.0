import Vue from 'vue';
import {
    Button,
    Form,
    FormItem,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Input,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Notification,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox ,
    Tag,
    Tree,
    Select,
    Option,
    Loading,
    Drawer,
    Collapse,

} from 'element-ui';


Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading)
Vue.use(Drawer)
Vue.use(Collapse)

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;


