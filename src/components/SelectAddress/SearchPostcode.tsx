import React from 'react';
import Postcode from '@actbase/react-daum-postcode';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchPostcode = ({
  onSelected,
  goBack,
}: {
  onSelected: (data: any) => void;
  goBack: () => void;
}) => {
  return (
    <View style={{ paddingTop: 45 }}>
      <View style={{ height: '5%', display: 'flex', flexDirection: 'column', paddingLeft: 14 }}>
        <Icon name="chevron-back-outline" onPress={goBack} style={{ fontSize: 20 }} />
      </View>
      <Postcode
        style={{ width: '100%', height: '95%' }}
        jsOptions={{ animation: true }}
        onSelected={onSelected}
        onError={(error) => console.log('Error', error)}
      />
    </View>
  );
};

export default SearchPostcode;
