import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

var styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 4,
  },
  cellImage: {
    height: 80,
    width: 60,
    marginRight: 8,
    resizeMode: 'contain',
  },
  mediaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 12,
    color: '#999',
    flex: 1,
  },
  mediaYear: {
    fontWeight: 'bold',
  },
})

var MediaCell = React.createClass({
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onDeHighlight}
        >
          <View style={styles.cellContainer}>
            <Image
              source={{uri: this.props.media.artworkUrl100}}
              style={styles.cellImage}
            />
            <View style={styles.cellTextContainer}>
              <Text style={styles.mediaName} numberOfLines={1}>
                {this.props.media.trackName || this.props.media.collectionName}
              </Text>
              <Text style={styles.mediaDescription} numberOfLines={2}>
                <Text style={styles.mediaYear}>
                  {parseInt(this.props.media.releaseDate)}
                </Text>
                {" "}-{" "}
                {this.props.media.longDescription || this.props.media.artistName}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

export default MediaCell;