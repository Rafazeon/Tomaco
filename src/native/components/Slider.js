import React, { Component } from 'react'

import Carousel from 'react-native-snap-carousel';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
 
export class MyCarousel extends Component {
 
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }
 
    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.props.source}
              renderItem={this._renderItem}
              sliderWidth={300}
              itemWidth={200}
            />
        );
    }
} 

export default MyCarousel