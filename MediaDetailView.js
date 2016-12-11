import React from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  Linking,
  View,
} from 'react-native';

import styles from './styles';

const localStyles = styles.detailview;

var MediaDetailView = React.createClass({
  render() {
    var item = this.props.mediaItem;
    var buyPrice = (item.trackHdPrice && item.trackPrice) ?
      <View style={localStyles.mediaPriceRow}>
        <Text style={localStyles.sectionTitle}>Buy</Text>
        <Text style={localStyles.mediaPrice}>${item.trackHdPrice} (HD)</Text>
        <Text style={localStyles.mediaPrice}>${item.trackPrice} (SD)</Text>
      </View> : null;

    var rentalPrice = (item.trackHdPrice && item.trackPrice) ?
      <View style={localStyles.mediaPriceRow}>
        <Text style={localStyles.sectionTitle}>Rent</Text>
        <Text style={localStyles.mediaPrice}>${item.trackHdRentalPrice} (HD)</Text>
        <Text style={localStyles.mediaPrice}>${item.trackRentalPrice} (SD)</Text>
      </View> : null;


    return (
      <ScrollView contentContainerStyle={localStyles.contentContainer}>
        <Text style={localStyles.mediaTitle}>
          {item.trackName}
        </Text>
        <View style={localStyles.mainSection}>
          <Image
            source={{uri: item.artworkUrl100}}
            style={localStyles.mediaImage}
          />
          <View style={{flex: 1}}>
            <View style={[localStyles.mainSection, {
              alignItems: 'center',
              justifyContent: 'space-between',
            }]}>
              <View>
                <Text style={localStyles.mediaGenre}>{item.primaryGenreName}</Text>
                <Text style={localStyles.contentAdvisory}>{item.contentAdvisoryRating}</Text>
              </View>
            </View>
          <View style={localStyles.separator} />
            {buyPrice}
            {rentalPrice}
          </View>
        </View>
        <View style={localStyles.separator} />
        <Text style={localStyles.sectionTitle}>Description</Text>
        <Text style={localStyles.mediaDescription}>{item.longDescription}</Text>
        <View style={localStyles.separator} />
        <TouchableHighlight
          onPress={() => Linking.openURL(item.trackViewUrl)}
        >
          <Text style={localStyles.iTunesButton}>
            View in iTunes
          </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
});

export default MediaDetailView;