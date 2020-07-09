import React, { useState, useEffect, component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { Header, Left, Body, Right, Icon } from "native-base";
var screenHeight = Math.round(Dimensions.get("window").height) / 100;
var screenWidth = Math.round(Dimensions.get("window").width) / 100;
var msg = [];
var messageRecieved, messageSent;
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
var numberOfMessagesSent, final, final1;
var numberOfMessagesRecieved;
var x = [];
var y = [];
var final2 = [];

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    this.setState({
      currentId: this.props.navigation.getParam("currentId"),
    });
    this.setState({ Id: this.props.navigation.getParam("Id") });

    firebase
      .database()
      .ref(
        "user/" + this.props.navigation.getParam("id") + "/noOfMessagesRecieved"
      )
      .on("value", (snapshot) => {
        numberOfMessagesRecieved = snapshot.val();
      });
    firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currentId") +
          "/noOfMessagesSent"
      )
      .on("value", (snapshot) => {
        numberOfMessagesSent = snapshot.val();
      });

    for (let i = 0; i < numberOfMessagesRecieved; i++) {
      firebase
        .database()
        .ref(
          "user/" +
            this.props.navigation.getParam("id") +
            "/messagesRecieved/" +
            i +
            "/message"
        )
        .orderByChild("createdAt")
        .on("value", async (snapshot) => {
          var messages = snapshot.val();
          //  console.log({ messages });
          x.push(messages);
        });
      // console.log({ x });
    }

    let uid = this.props.navigation.getParam("currentId");

    final = x.filter(function (publiic) {
      return publiic.from == uid;
    });
    // console.log(final);

    for (let i = 0; i < numberOfMessagesSent; i++) {
      firebase
        .database()
        .ref(
          "user/" +
            this.props.navigation.getParam("currentId") +
            "/messagesSent/" +
            i +
            "/message"
        )
        .orderByChild("createdAt")
        .on("value", async (snapshot) => {
          var messages = snapshot.val();
          //  console.log({ messages });
          y.push(messages);
        });
    }
    this.setState({ numberOfMessagesRecieved });
    let uuid = this.props.navigation.getParam("id");

    final1 = y.filter(function (publiic) {
      //2 console.log(publiic);
      return publiic.to == uuid;
    });
    // console.log("final is " + { final1 });
    final2 = [...final, ...final1];
    this.setState({ messages: final2 });
    // for (let i = 0; i < final2.length; i++) console.log(final2[i].createdAt);
    // final2.sort(function compare(a, b) {
    //   const bandA = a.createdAt;
    //   const bandB = b.createdAt;
    //   let comparison = 0;
    //   if (bandA > bandB) {
    //     comparison = 1;
    //   } else if (bandA < bandB) {
    //     comparison = -1;
    //   }
    //   return comparison;
    // });
    // // this.setState({ messages: final2 });
    // firebase
    //   .database()
    //   .ref("user/" + this.props.navigation.getParam("currentId"))
    //   .on("value", async (snapshot) => {
    //     var messages = snapshot.val().messagesSent;
    //     for (let i = 0; i < messages.length; i++) {
    //       msg.push(messages[i]);
    //     }
    //     await this.setState({ messages: msg });
    //     // console.log(
    //     // "Message" + JSON.stringify(messages)
    //     // JSON.stringify(
    //     //   new Date(
    //     //     messages.messagesRecieved[0].createdAt
    //     //   ).toLocaleTimeString()
    //     // )
    //     //);
    //     await this.setState({ messages });
    //   });
  }

  async onSend(messages = []) {
    messageRecieved = Object.assign({}, messages[0], {
      from: this.props.navigation.getParam("currentId"),
    });
    messageSent = Object.assign({}, messages[0], {
      to: this.props.navigation.getParam("id"),
    });
    console.log({ messageSent });
    console.log({ messageRecieved });
    console.log({ numberOfMessagesRecieved });
    await this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    await firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("id") +
          "/messagesRecieved/" +
          numberOfMessagesRecieved
      )
      .update({
        message: messageRecieved,
      });
    await firebase
      .database()
      .ref("user/" + this.props.navigation.getParam("id"))
      .update({
        noOfMessagesRecieved: numberOfMessagesRecieved + 1,
      });
    await firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currentId") +
          "/messagesSent/" +
          numberOfMessagesSent
      )
      .update({
        message: messageSent,
      });
    await firebase
      .database()
      .ref("user/" + this.props.navigation.getParam("currentId"))
      .update({
        noOfMessagesSent: numberOfMessagesSent + 1,
      });
  }
  render() {
    return (
      <View style={{ flex: 10 }}>
        <Header>
          <Left>
            <TouchableOpacity
              onPress={() => console.log("Sdlnfjn")}
              transparent
              style={{}}
            >
              <Icon name="arrow-back" style={{ marginTop: screenHeight }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text
              numberOfLines={1}
              style={{
                textAlign: "center",
                marginLeft: screenWidth * 10,
                color: "white",
                fontSize: 15,
              }}
            >
              Hetan Thakkar
            </Text>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => console.log("Sdlnfjn")}
              transparent
              style={{}}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <Text>oijfoijd{this.state.numberOfMessagesSent}</Text>
        <GiftedChat
          isLoadingEarlier={true}
          style={{ flex: 2 }}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}
