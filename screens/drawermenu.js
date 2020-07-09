import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width) / 100;
const screenHeight = Math.round(Dimensions.get("window").height) / 100;
import Icon from "react-native-vector-icons/FontAwesome";
import { Header, Left, Body, Right, Button } from "native-base";
import { Icon as Icons } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const menuData = [
  { icon: "home", name: "Home", screenName: "Home", key: 1 },

  {
    icon: "edit",
    name: "Settings",
    screenName: "Settings",
    key: 2,
  },
  { icon: "users", name: "About Us", screenName: "AboutUs", key: 3 },

  {
    icon: "share",
    name: "Share",
    screenName: "Share",
    key: 4,
  },

  {
    icon: (
      <Ionicons
        name="md-power"
        style={{ color: "#fff", marginRight: 10, fontSize: 24 }}
      />
    ),
    name: "Logout",
    screenName: "Share",
    key: 4,
  },
];

class DrawerMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={{ marginTop: screenHeight * -4 }}>
          <Left>
            <Button onPress={() => this.props.navigation.openDrawer()}>
              <Icons
                name="person"
                style={{ color: "white", marginLeft: screenWidth * -3 }}
              />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "300",
                marginLeft: screenWidth * 0.5,
              }}
            >
              Hello, Bitch
            </Text>
          </Body>
          <Right>
            <Text
              style={{
                marginLeft: screenWidth * -15,
                fontSize: 12,
                color: "white",
                fontWeight: "700",
              }}
            ></Text>
          </Right>
        </Header>
        <FlatList
          data={menuData}
          renderItem={({ item }) => (
            <DrawerItem
              navigation={this.props.navigation}
              screenName={item.screenName}
              icon={item.icon}
              name={item.name}
              key={item.key}
            />
          )}
        />
      </View>
    );
  }
}

const DrawerItem = ({ navigation, icon, name, screenName }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() =>
      navigation.navigate(`${screenName}`, { isStatusBarHidden: false })
    }
  >
    <Icon
      name={icon}
      size={30}
      color="#333"
      style={{ marginLeft: screenWidth }}
    />
    <Text style={styles.menuItemText}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.43)",
    marginTop: screenHeight * 4,
  },
  menuItem: {
    flexDirection: "row",
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "300",
    margin: 14,
  },
  menuItem: {
    flexDirection: "row",
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "300",
    margin: screenHeight * 1.8,
  },
});

export default DrawerMenu;
