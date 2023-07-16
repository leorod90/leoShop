import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "@react-native-community/blur";
import { Pressable } from "react-native";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
interface Props extends BottomSheetBackdropProps {
  onPress: () => void;
};

const BottomSheetCustomBackdrop = ({ animatedIndex, style, onPress }: Props) => {
  // animated variables
  console.log(animatedIndex)
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, .75],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        // backgroundColor: "#000",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );
  // const blurViewProps = useAnimatedStyle(() => ({
  //   intesity: interpolate(
  //     animatedIndex.value,
  //     [0, 1],
  //     [0, 1],
  //     Extrapolate.CLAMP
  //   ),
  // }));

  return <AnimatedBlurView
    blurType='dark'
    intesity={1}
    // animatedProps={blurViewProps}
    // reducedTransparencyFallbackColor="white" 
    style={containerStyle}
  >
    <Pressable style={{ flex: 1 }} onPress={onPress} />
  </AnimatedBlurView>
};

export default BottomSheetCustomBackdrop;