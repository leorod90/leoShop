import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import WrapperView from './WrapperView'
import useThemeColors from '../themes/useThemeColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const MAX_PRICE = 500

export default function FilterView() {
  const { text, borderColor, background, primary } = useThemeColors();
  const insets = useSafeAreaInsets()
  const [minPrice, setMinPrice] = useState(50)
  const [maxPrice, maxMinPrice] = useState(250)
  const [fetchData, setFetchData] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(-1)


  const selectCategoryHandler = (i: number) => {
    setSelectedCategories(i)
  }

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setFetchData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductCategories();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{
        gap: 24, padding: 24
      }}>
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
        {/* <FlatList
        data={fetchData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item): string => item}
        renderItem={({ item, i }) => <Category item={item} selectCategoryHandler={selectCategoryHandler} />}
      /> */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12
          }}>
          {fetchData.map((item, i) => {
            return <Category key={item} item={item} selectCategoryHandler={() => selectCategoryHandler(i)} selected={selectedCategories === i} />
          })}
        </View>
        <View style={{ flex: 1 }} />
      </ScrollView>
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 + insets.bottom }}>
        <TouchableOpacity style={{
          backgroundColor: primary,
          height: 64,
          width: '100%',
          borderRadius: 64,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'relative'
        }}>
          <Text style={{ color: background, fontSize: 16, fontWeight: "600" }}>Apply Filters</Text>
          <View style={{
            backgroundColor: background,
            width: 40,
            aspectRatio: 1,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: "center",
            position: 'absolute',
            top: 12,
            right: 12,
            bottom: 12
          }}>
            <Icon name='arrow-forward' color={text} size={24} />
          </View>
        </TouchableOpacity>
      </View >
    </SafeAreaView >
  )
}

type ItemProps = {
  item: string;
  selectCategoryHandler: () => void;
  selected: boolean
}

const Category = ({ item, selectCategoryHandler, selected }: ItemProps) => {
  const { text, borderColor, background, primary } = useThemeColors();
  return (
    <TouchableOpacity onPress={selectCategoryHandler}
      style={{
        backgroundColor: selected ? primary : '#eee',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12
      }}>
      <Text style={{
        color: selected ? '#fff' : primary,
        fontWeight: '600'
      }}>{item}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'

  }
})