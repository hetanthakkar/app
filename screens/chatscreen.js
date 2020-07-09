//.toLocaleTimeString()
import React from "react";
import { GiftedChat, GiftedAvatar } from "react-native-gifted-chat";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { Header, Left, Body, Right, Icon } from "native-base";
import { currentId } from "./signup/actions";
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
var numberOfMessagesSent,
  numberOfMessagesSentByMe,
  final,
  final1,
  fiinaly,
  finaly,
  numberOfMessagesRecieved,
  numberOfMessagesRecievedByOther,
  bor,
  name;
var x = [];
var y = [];
var final2 = [];

export default class Example extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      temp: true,
      messages: [],
      x: [],
      y: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    firebase
      .database()
      .ref("user/" + 0)
      .on("value", (snapshot) => {
        name = snapshot.val().name;
      });

    firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currentId") +
          "/messagesRecieved/"
      )
      .on("child_added", (snapshot) => {
        console.log(snapshot.val().message.from);
        if (
          snapshot.val().message.from == this.props.navigation.getParam("id") &&
          this._isMounted
        )
          msg = [snapshot.val().message];
        msg.filter((value) => (value.user._id = 0));
        fiinaly = [...this.state.messages, ...msg];
        let results = Object.keys(fiinaly)
          .sort(
            (a, b) =>
              Date.parse(fiinaly[a].createdAt) -
              Date.parse(fiinaly[b].createdAt)
          )
          .map((k) => fiinaly[k]);
        results = results.reverse();
        this.setState({
          messages: results,
        });
      });
    this.setState({
      currentId: this.props.navigation.getParam("currentId"),
    });
    this.setState({ Id: this.props.navigation.getParam("id") });

    firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currentId") +
          "/noOfMessagesRecieved"
      )
      .on("value", (snapshot) => {
        numberOfMessagesRecieved = snapshot.val();
        this.setState({ numberOfMessagesRecieved });
      });
    firebase
      .database()
      .ref(
        "user/" + this.props.navigation.getParam("id") + "/noOfMessagesRecieved"
      )
      .on("value", (snapshot) => {
        numberOfMessagesRecievedByOther = snapshot.val();
        this.setState({ numberOfMessagesRecievedByOther });
      });

    firebase
      .database()
      .ref("user/" + this.props.navigation.getParam("id") + "/noOfMessagesSent")
      .on("value", (snapshot) => {
        numberOfMessagesSent = snapshot.val();
        this.setState({ numberOfMessagesSent });
      });

    firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currenId") +
          "/noOfMessagesSent"
      )
      .on("value", (snapshot) => {
        numberOfMessagesSentByMe = snapshot.val();
        this.setState({ numberOfMessagesSentByMe });
      });

    firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currentId") +
          "/noOfMessagesSent"
      )
      .on("value", (snapshot) => {
        numberOfMessagesSentByMe = snapshot.val();
        this.setState({ numberOfMessagesSentByMe });
      });

    for (let i = 0; i < numberOfMessagesRecieved; i++) {
      firebase
        .database()
        .ref(
          "user/" +
            this.props.navigation.getParam("currentId") +
            "/messagesRecieved/" +
            i +
            "/message"
        )
        .on("value", async (snapshot) => {
          var messages = snapshot.val();
          x.push(messages);
          this.setState({ x });
        });
    }

    let uid = this.props.navigation.getParam("id");
    final = x.filter(function (publiic) {
      return publiic.from == uid;
    });
    final.filter((value) => (value.user._id = 0));
    for (let i = 0; i < numberOfMessagesSentByMe; i++) {
      firebase
        .database()
        .ref(
          "user/" +
            this.props.navigation.getParam("currentId") +
            "/messagesSent/" +
            i +
            "/message"
        )
        .on("value", async (snapshot) => {
          var messages = snapshot.val();
          y.push(messages);
          this.setState({ y });
        });
    }
    this.setState({ numberOfMessagesRecieved });
    let uuid = this.props.navigation.getParam("id");
    final1 = y.filter(function (publiic) {
      return publiic.to == uuid;
    });

    final2 = [...final, ...final1];
    var result = Object.keys(final2)
      .sort(
        (a, b) =>
          Date.parse(final2[a].createdAt) - Date.parse(final2[b].createdAt)
      )
      .map((k) => final2[k]);
    result = result.reverse();
    this.setState({ messages: result });
    console.log("current id" + this.props.navigation.getParam("currentId"));
    console.log("number" + numberOfMessagesSentByMe);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  async onSend(messages = []) {
    await firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currentId") +
          "/noOfMessagesSent"
      )
      .on("value", (snapshot) => {
        numberOfMessagesSentByMe = snapshot.val();
        this.setState({ numberOfMessagesSentByMe });
      });

    console.log({ numberOfMessagesSentByMe });
    messageRecieved = Object.assign({}, messages[0], {
      from: this.props.navigation.getParam("currentId"),
      key: 5,
    });
    messageSent = Object.assign({}, messages[0], {
      to: this.props.navigation.getParam("id"),
      key: 12,
    });
    bor = Object.assign({}, messages, { _id: 1 });

    finaly = [...this.state.messages, ...messages];
    let results = Object.keys(finaly)
      .sort(
        (a, b) =>
          Date.parse(finaly[a].createdAt) - Date.parse(finaly[b].createdAt)
      )
      .map((k) => finaly[k]);
    results = results.reverse();
    this.setState({
      messages: results,
    });
    await firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("id") +
          "/messagesRecieved/" +
          numberOfMessagesRecievedByOther
      )
      .update({
        message: messageRecieved,
      });
    await firebase
      .database()
      .ref("user/" + this.props.navigation.getParam("id"))
      .update({
        noOfMessagesRecieved: numberOfMessagesRecievedByOther + 1,
      });
    await firebase
      .database()
      .ref(
        "user/" +
          this.props.navigation.getParam("currentId") +
          "/messagesSent/" +
          numberOfMessagesSentByMe
      )
      .update({
        message: messageSent,
      });

    await firebase
      .database()
      .ref("user/" + this.props.navigation.getParam("currentId"))
      .update({
        noOfMessagesSent: numberOfMessagesSentByMe + 1,
      });
    await this.setState({ temp: !this.state.temp });
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
        <Text>{this.state.numberOfMessagesRecieved}</Text>
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
