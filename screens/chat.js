import React from 'react';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Item,
  Thumbnail,
  Icon,
  Input,
  Button,
} from 'native-base';
import { View, Dimensions, Text } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

var screenWidth = Math.round(Dimensions.get('window').width) / 100;
var screenHeight = Math.round(Dimensions.get('window').height) / 100;
export default class Example extends React.Component {
  state = {
    messages: [],
    people: [
      'Hetan Thakkar',
      'Vraj Raval',
      'Sarthak Sarvaiya',
      'Kavin Mehta',
      'Shrey Panjwani',
    ],
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Header
            searchBar
            rounded
            autoCorrect={false}
            style={{ height: screenHeight * 12 }}
          >
            <Item style={{ marginTop: -screenHeight * 2 }}>
              <Icon name='ios-search' />
              <Input value={this.state.bar} onChangeText={this.onChange} />
              <Icon name='ios-people' />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>

          {this.state.people.length != 0 ? (
            <List
              onPress={() => console.log('sdfn')}
              keyExtractor={(item, index) => index.toString()}
              dataArray={this.state.people}
              renderRow={(item) => (
                <ListItem
                  avatar
                  onPress={() => {
                    console.log(item);
                    this.props.navigation.navigate('ChatScreen', {
                      name: item,
                    });
                  }}
                >
                  <Left>
                    <Thumbnail
                      source={{
                        uri:
                          'https://i.pinimg.com/600x315/60/87/ed/6087ed0551ade6a795b06580293c99eb.jpg',
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{item}</Text>
                    <Text note>Blah Blah sudfisdufhi</Text>
                  </Body>
                  <Right>
                    <Text note>3:45 PM</Text>
                  </Right>
                </ListItem>
              )}
            />
          ) : (
            <View></View>
          )}
        </Container>
      </View>
    );
  }
}
