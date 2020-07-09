import Signup from "./screens/signup/Signup";
import { YellowBox } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Demo1 from "./screens/demo1";
import Login from "./screens/login/Login";
import Bar from "./screens/searchbar";
import Main from "./screens/main";
import Pic from "./screens/pic";
import ChatHistory from "./screens/chatHistory";
import Profile from "./screens/profile/index";
import Entry from "./screens/entrypage";
import Search from "./screens/search";
import Chat from "./screens/chat";
import ChatScreen from "./screens/chatscreen";
import Test from "./screens/test";
import Maps from "./screens/Map.js";
import Pay from "./screens/pay";
import Location from "./screens/location";
import Form from "./screens/form";
import Slide from "./screens/slide";
import Category from "./screens/category";
import ModifyProfile from "./screens/modifyProfile";
import _ from "lodash";

console.disableYellowBox = true;
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
export default createAppContainer(
  createSwitchNavigator(
    {
      Signup,
      Category,
      Demo1,
      Pic,
      Search,
      Profile,
      ChatHistory,
      Bar,
      Main,
      Login,
      Chat,
      Entry,
      ChatScreen,
      Maps,
      Location,
      Form,
      Slide,
      ModifyProfile,
      Pay,
    },
    {
      initialRouteName: "Login",
    }
  )
);
