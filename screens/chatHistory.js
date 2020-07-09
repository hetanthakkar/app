import React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Item, Input, Icon, Button, Header } from "native-base";
import Mycard from "./mycard";
import firebase from "firebase";
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
var messagesSent, messagesRecieved;
var renderMessage = [];
var messages = [];
var temp = [];
const screenWidth = Math.round(Dimensions.get("window").width) / 100;
const screenHeight = Math.round(Dimensions.get("window").height) / 100;
export default class SearchScreen extends React.Component {
  state = {
    bar: "",
    pub: [],
    messages: [],
    renderMessage: [],
  };
  static navigationOptions = {
    drawerLabel: "search",
  };
  onChange = async (bar) => {
    await this.setState({ bar: bar });
  };
  async componentDidMount() {
    await this.setState({ currentId: this.props.id });
    await firebase
      .database()
      .ref("user/" + this.state.currentId + "/messagesSent")
      .on("value", (snapshot) => {
        messagesSent = snapshot.val();
      });
    await firebase
      .database()
      .ref("user/" + this.state.currentId + "/messagesRecieved")
      .on("value", (snapshot) => {
        messagesRecieved = snapshot.val();
      });
    messages = [...messagesSent, ...messagesRecieved];
    messages = Object.keys(messages)
      .sort(
        (a, b) =>
          Date.parse(messages[a].message.createdAt) -
          Date.parse(messages[b].message.createdAt)
      )
      .map((k) => messages[k]);
    //messages.splice(4, 1);
    // for (let i = 0; i < messages.length; i++) {
    //   console.log(messages[4]);
    //   if (messages[i].message.to) {
    //     if (temp.includes(messages[i].message.to)) {
    //       //console.log(i);
    //       // if (i === 4) messages.splice(i, 1);
    //       // console.log(temp);
    //     }
    //   }
    //   if (messages[i].message.from) {
    //     //  console.log(messages[i]);
    //     //    console.log(temp);
    //     if (temp.includes(messages[i].message.from)) {
    //       messages.splice(i, 1);
    //     }
    //   }
    //   if (messages[i].message.to) temp.push(messages[i].message.to);
    //   if (messages[i].message.from) temp.push(messages[i].message.from);
    // }
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].message.to) temp.push(messages[i].message.to);
      else temp.push(messages[i].message.from);
      if (messages[i].message.to) {
        if (temp.includes(messages[i].message.to)) messages.splice(i, 1);
      } else {
        if (temp.includes(messages[i].message.from)) messages.splice(i, 1);
      }
    }
    //console.log(messages);
    await this.setState({ messages });
    // console.log(JSON.stringify(messages));
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].message.to) {
        await firebase
          .database()
          .ref("user/" + this.state.messages[i].message.to)
          .on("value", (snapshot) => {
            renderMessage.push({
              name: snapshot.val().name,
              photo: snapshot.val().photo,
              chat: this.state.messages[i].message.text,
            });
          });
      } else {
        await firebase
          .database()
          .ref("user/" + this.state.messages[i].message.from)
          .on("value", (snapshot) => {
            renderMessage.push({
              name: snapshot.val().name,
              photo: snapshot.val().photo,
              chat: this.state.messages[i].message.text,
            });
          });
      }
      //console.log(JSON.stringify(renderMessage));
      await this.setState({ renderMessage });
    }
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Header
            searchBar
            rounded
            autoCorrect={false}
            style={{ height: screenHeight * 12, backgroundColor: "#3498db" }}
          >
            <Item style={{ marginTop: -screenHeight * 2 }}>
              <Icon name="ios-search" />
              <Input value={this.state.bar} onChangeText={this.onChange} />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          {this.state.renderMessage.map((value) => {
            // console.log(value);
            return (
              <TouchableOpacity>
                <Mycard
                  name={value.name}
                  chat={value.chat}
                  photo={value.photo}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
