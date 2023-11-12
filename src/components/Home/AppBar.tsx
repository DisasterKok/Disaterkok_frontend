import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import COLOR from '../../constants/colors';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';

const FeatherAnimatedIcon = Animated.createAnimatedComponent(FeatherIcon);
const AntAnimatedIcon = Animated.createAnimatedComponent(AntDesignIcon);

const AppBar = ({
  animatedColor,
}: {
  animatedColor: Animated.AnimatedInterpolation<string | number>;
}) => {
  const [hasNewNoti, setHasNewNoti] = React.useState<boolean>(true);

  return (
    <View style={styles.appBar}>
      <View style={styles.appBarLeft}>
        <TouchableOpacity>
          <FeatherAnimatedIcon name="bell" size={22} color={animatedColor} />
        </TouchableOpacity>
        {hasNewNoti && (
          <View style={{ position: 'absolute', top: -12, right: -9 }}>
            <EntypoIcon name="dot-single" size={22} color={COLOR.red} />
          </View>
        )}
      </View>
      <View style={styles.appBarRight}>
        <TouchableOpacity>
          <AntAnimatedIcon name="search1" size={22} color={animatedColor} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntAnimatedIcon name="setting" size={22} color={animatedColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  appBarLeft: {
    position: 'relative',
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarRight: {
    gap: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
