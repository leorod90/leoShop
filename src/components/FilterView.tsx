import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import WrapperView from './WrapperView'
import useThemeColors from '../themes/useThemeColors';

const MAX_PRICE = 500

export default function FilterView() {
  const { text, borderColor, background, primary } = useThemeColors();

  const [minPrice, setMinPrice] = useState(50)
  const [maxPrice, maxMinPrice] = useState(250)

  return (
    <WrapperView bg='#fff'>
      <View style={styles.header}>
        <Text style={{ flex: 1, fontSize: 20, fontWeight: "700" }}>Filters</Text>
        <TouchableOpacity>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Price Range</Text>
        <View style={{ height: 1, width: '100%', backgroundColor: borderColor, marginVertical: 12, position: 'relative' }} >
          <View style={{
            position: 'absolute',
            backgroundColor: primary,
            height: '100%',
            left: `${(100 * minPrice) / MAX_PRICE}%`,
            width: `${100 * (maxPrice - minPrice) / MAX_PRICE}%`
          }}></View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: text, opacity: .5 }}>${0}</Text>
          <Text style={{ color: text, opacity: .5 }}>${MAX_PRICE}</Text>
        </View>
      </View>
    </WrapperView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'

  }
})