import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import * as Font from "expo-font";
import { Block, Text } from "./../components";
import * as theme from "./theme";
import { Item, Input, Icon, Button, Header } from "native-base";
import { Picker } from "react-native-picker-dropdown";
import firebase from "firebase";
var publics = [];
var firebaseConfig = {
  apiKey: "AIzaSyAfGN94rWhA55dceve-ab5R5nEL6o4xXeg",
  authDomain: "new1-930be.firebaseapp.com",
  databaseURL: "https://new1-930be.firebaseio.com",
  projectId: "new1-930be",
  storageBucket: "new1-930be.appspot.com",
  messagingSenderId: "332990256430",
  appId: "1:332990256430:web:640a6413492c34bf2a96bf",
  measurementId: "G-SBPS6449GM",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var newpublics = [];
const screenHeight = Math.round(Dimensions.get("window").height) / 100;
const screenWidth = Math.round(Dimensions.get("window").width) / 100;
class App extends React.Component {
  state = {
    bar: "",
    dis: [],
    disp: [],
    id: [],
    state: "Enter State",
    about: [],
    city: [],
    cityy: "",
    pressed: false,
    fontsLoaded: false,
  };
  loadFonts() {
    return Font.loadAsync({
      "Montserrat-Regular": require("./../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Bold": require("./../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-SemiBold": require("./../assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-Medium": require("./../assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Light": require("./../assets/fonts/Montserrat-Light.ttf"),
    });
  }

  async componentDidMount() {
    console.log("id is" + this.props.navigation.getParam("id"));
    for (let k = 0; k <= 1; k++) {
      firebase
        .database()
        .ref("user/" + k)
        .on("value", (snapshot) => {
          if (
            snapshot.val().id != this.props.navigation.getParam("id") &&
            snapshot.val().specifics == "Piano/Keyboard"
          ) {
            console.log("entered if");
            var fetch_name = snapshot.val().name;
            var fetch_charge = snapshot.val().charge;
            var fetch_photo = snapshot.val().photo;
            var fetch_city = snapshot.val().city;
            var fetch_id = snapshot.val().id;

            var a = {
              name: fetch_name,
              charge: fetch_charge,
              photo: fetch_photo,
              city: fetch_city,
              id: fetch_id,
            };
            publics.push(a);
          }
        });
      await this.setState({ publics });
      await this.setState({ publicity: publics });
      await this.setState({ dis: this.state.publics });
    }
    console.log("public is" + JSON.stringify(publics));
    await this.loadFonts();
    this.setState({ fontsLoaded: true });
  }
  handleValueChange = (value) => {
    this.setState({ state: value });
  };
  updatecity = async (value) => {
    let dis = [];
    let disp = [];
    let about = [];
    let city = [];
    let id = [];
    await this.setState({ cityy: value });
    if (this.state.pressed) {
      for (let k = 0; k < publics.length; k++)
        newpublics = publics.filter(function (publiic) {
          if (value != "Enter City") return publiic.city == value;
          else return publics;
        });
      for (let i = 0; i < newpublics.length; i++) {
        if (newpublics[i].name.includes(this.state.bar)) {
          dis.push(newpublics[i].name);
          disp.push(newpublics[i].photo);
          about.push(newpublics[i].about);
          city.push(newpublics[i].city);
        }
      }
      this.setState({ dis: newpublics });
      console.log("new public is " + JSON.stringify(newpublics));
    }
  };
  toRender = async () => {
    await this.setState({ picker: !this.state.picker });
    await this.setState({ pressed: !this.state.pressed });
    if (!this.state.pressed) this.onChange(this.state.bar);
    else this.updatecity(this.state.city);
  };
  getcityes = () => {
    if (this.state.state == "Enter State")
      return ["Enter City"].map((city) => (
        <Picker.Item label={city} value={city} />
      ));
    if (this.state.state == "Gujarat")
      return [
        "Enter City",
        "Ahmedabad",
        "Anand",
        "Bhavnagar",
        "Gandhinagar",
        "Jamnagar",
        "Rajkot",
        "Surat",
        "Vadodara",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Maharashtra")
      return [
        "Enter City",
        "Akola",
        "Kalyan",
        "Mumbai",
        "Navi Mumbai",
        "Panvel",
        "Pune",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Chhattisgarh")
      return [
        "Enter City",
        "Raipur",
        "Bilaspur",
        "Bastar",
        "Jashpur",
        "Durg",
        "Koriya",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state === "Jharkhand")
      return [
        "Enter City",
        "Ranchi",
        "Bokaro",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "Ghatshila",
        "Hazaribagh",
        "Jamshedpur",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Kerala")
      return ["Enter City", "Kochi"].map((city) => (
        <Picker.Item label={city} value={city} />
      ));
    if (this.state.state == "Madhya Pradesh")
      return [
        "Enter City",
        "Bhopal",
        "Indore",
        "Gwalior",
        "Jabalpur",
        "Sagar",
        "Ujjain ",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Karnataka")
      return [
        "Enter City",
        "Mangalore",
        "Bangalore",
        "Mysore",
        "Bijapur",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Rajasthan")
      return [
        "Enter City",
        "Kota",
        "Udaipur",
        "Jaipur",
        "Jodhpur",
        "Sikar",
        "Ajmer",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Tamil Nadu")
      return [
        "Enter City",
        "Coimbatore",
        "Salem",
        "Madurai",
        "Tiruchirapalli",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Uttar Pradesh")
      return [
        "Enter City",
        "Kanpur",
        "Lucknow",
        "Ghaziabad",
        "Agra",
        "Varanasi",
        "Prayagraj",
      ].map((city) => <Picker.Item label={city} value={city} />);
    if (this.state.state == "Delhi")
      return ["Enter City", "Delhi NCR"].map((city) => (
        <Picker.Item label={city} value={city} />
      ));
    if (this.state.state == "")
      return <Picker.Item label="Enter City" value="" />;
  };

  onChange = async (bar) => {
    await this.setState({ bar: bar });
    console.log({ bar });
    if (bar == "") {
      console.log("enrered ifffff");
      await this.setState({ dis: publics });
    } else {
      if (bar.length != 0) {
        let dis = [];
        for (let i = 0; i < publics.length; i++) {
          if (publics[i].name.includes(this.state.bar)) {
            dis.push({
              name: publics[i].name,
              photo: publics[i].photo,
              charge: publics[i].charge,
              city: publics[i].city,
            });
          }
        }
        this.setState({ dis: dis });
      } else {
        this.setState({ dis: [] });
      }
      console.log(JSON.stringify(this.state.dis));
    }
  };
  renderRequest(request) {
    // console.log(request);
    if (typeof request === "object") {
      return (
        <Block row card shadow color="white" style={styles.request}>
          <Block
            flex={0.25}
            card
            column
            color="secondary"
            style={styles.requestStatus}
          >
            <Block flex={1} middle center color={theme.colors.primary}></Block>
            <Block flex={1} center middle>
              <Image
                style={{ width: 140, height: 150 }}
                source={{
                  uri: request.photo,
                }}
              />
            </Block>
          </Block>
          <Block flex={0.75} column middle>
            <Text h3 style={{ paddingVertical: 8 }}>
              {request.name}
            </Text>
            <Text caption semibold>
              {request.charge}/hr • {request.city}
            </Text>
          </Block>
        </Block>
      );
    } else {
      return (
        <Block row card shadow color="white" style={styles.request}>
          <Block
            flex={0.25}
            card
            column
            color="secondary"
            style={styles.requestStatus}
          >
            <Block flex={1} middle center color={theme.colors.primary}></Block>
            <Block flex={1} center middle>
              <Image
                style={{ width: 140, height: 150 }}
                source={{
                  uri: request.photo,
                }}
              />
            </Block>
          </Block>
          <Block flex={0.75} column middle>
            <Text h3 style={{ paddingVertical: 8 }}>
              {request}
            </Text>
            <Text caption semibold>
              {request.charge}/hr • {request.city}
            </Text>
          </Block>
        </Block>
      );
    }
  }

  renderRequests() {
    return (
      <Block flex={1} column color="gray2" style={styles.requests}>
        <Block
          flex={false}
          row
          space="between"
          style={styles.requestsHeader}
        ></Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.dis.map((request) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Profile", {
                  id: request.id,
                  currentId: this.props.navigation.getParam("id"),
                })
              }
              activeOpacity={0.8}
              key={`request-${request.id}`}
            >
              {this.renderRequest(request)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Block>
    );
  }
  view = () => {
    if (this.state.picker) {
      return (
        <View>
          <Picker
            selectedValue={this.state.state}
            onValueChange={this.handleValueChange}
            mode="dialog"
          >
            <Picker.Item label="Enter State" value="Enter State" />
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
            <Picker.Item label="Goa" value="Goa" />
            <Picker.Item label="Gujarat" value="Gujarat" />
            <Picker.Item label="Haryana" value="Haryana" />
            <Picker.Item label="Jharkhand" value="Jharkhand" />
            <Picker.Item label="Karnataka" value="Karnataka" />
            <Picker.Item label="Kerala" value="Kerala" />
            <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
            <Picker.Item label="Maharashtra" value="Maharashtra" />
            <Picker.Item label="Punjab" value="Punjab" />
            <Picker.Item label="Rajasthan" value="Rajasthan" />
            <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
            <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
          </Picker>

          <Picker
            onValueChange={(itemValue) => this.updatecity(itemValue)}
            selectedValue={this.state.cityy}
            mode="dialog"
          >
            {this.getcityes()}
          </Picker>
        </View>
      );
    } else return <View></View>;
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <Block center middle>
          <Image
            style={{ width: 140, height: 140 }}
            source={require(".././assets/icon.png")}
          />
        </Block>
      );
    }

    return (
      <SafeAreaView style={styles.safe}>
        <Header
          searchBar
          rounded
          autoCorrect={false}
          style={{ height: screenHeight * 12 }}
        >
          <Item style={{}}>
            <Icon name="ios-search" />
            <Input
              value={this.state.bar}
              onChangeText={(value) => this.onChange(value)}
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <TouchableOpacity
          onPress={this.toRender}
          style={{
            justifyContent: "center",
            marginTop: screenHeight * 1.5,
            marginLeft: screenWidth * 3,
            backgroundColor: "#A4B0BD",
            width: screenWidth * 30,
            borderRadius: 7,
            height: screenHeight * 3,
          }}
        >
          <Text style={{ textAlign: "center", color: "black" }}>
            View-By-City
          </Text>
        </TouchableOpacity>

        {this.view()}
        {this.renderRequests()}
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.gray2,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -80,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  request: {
    padding: 20,
    marginBottom: 15,
  },
  requestStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90,
  },
});
