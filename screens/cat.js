import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
const screenWidth = Math.round(Dimensions.get("window").width) / 100;
const screenHeight = Math.round(Dimensions.get("window").height) / 100;
class Category extends Component {
  state = {
    fontsLoaded: false,
  };

  loadFonts() {
    return Font.loadAsync({
      "Montserrat-Regular": require("./../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Bold": require("./../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-SemiBold": require("./../assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-Medium": require("./../assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Light": require("./../assets/fonts/Montserrat-Light.ttf"),
      "OpenSans-Bold": require("./../assets/fonts/OpenSans-Bold.ttf"),
      "OpenSans-Regular": require("./../assets/fonts/OpenSans-Regular.ttf"),
      "OpenSans-SemiBold": require("./../assets/fonts/OpenSans-SemiBold.ttf"),
      "OpenSans-SemiBoldItalic": require("./../assets/fonts/OpenSans-SemiBoldItalic.ttf"),
      "Roboto-Medium": require("./../assets/fonts/Roboto-Medium.ttf"),
    });
  }
  async componentDidMount() {
    await this.loadFonts();
    this.setState({ fontsLoaded: true });
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <View></View>;
    }

    return (
      <View
        style={{
          marginLeft: screenWidth * 4,
          borderWidth: 1.5,
          borderRadius: 10,
          borderColor: "#dddddd",
          backgroundColor: "#333333",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 4 },
          zIndex: -1,
          shadowOpacity: 0.1,
          shadowRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Category", {
              name: this.props.name,
              id: this.props.id,
            })
          }
        >
          <Image
            style={{
              width: screenWidth * 40,
              height: screenHeight * 10,
              resizeMode: "cover",
            }}
            source={{
              uri: this.props.uri,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Roboto-Medium",
              color: "white",
            }}
          >
            {" "}
            {this.props.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-star"
              size={14}
              style={{ color: "#dfe4ea", marginLeft: screenWidth }}
            />
            <Text style={{ fontWeight: "700", color: "#dfe4ea" }}>
              {" "}
              {this.props.ratings}{" "}
            </Text>
            <Text style={{ color: "#dfe4ea", fontWeight: "700" }}>
              {" "}
              ({this.props.teachers})
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "700", color: "#dfe4ea" }}>
              {" "}
              {this.props.price}/hour
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
