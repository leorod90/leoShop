import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import WrapperView from '../components/WrapperView';
import useThemeColors from '../themes/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import MasonryList from 'reanimated-masonry-list';
import { BlurView } from "@react-native-community/blur";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  TouchableOpacity as BottomSheetTouchableOpacity,
  // TouchableHighlight,
  // TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet';
import BottomSheetCustomBackdrop from '../components/BottomSheetCustomBackdrop';
import FilterView from '../components/FilterView';
import Crashes from 'appcenter-crashes'

const TEST_URL = 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80'
const MODAL_1 = 'data:image/jpeg;base64,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'
const MODAL_2 = 'data:image/jpeg;base64,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'
const MODAL_3 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaVKZzQPHtbOdKduhHHau0WjfPEMKWYh6v8g&usqp=CAU'

export default function HomeScreen() {
  const { text, borderColor, background, primary } = useThemeColors();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [fetchData, setFetchData] = useState([])
  const [fetchCategories, setFetchCategories] = useState(['All'])


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10');
        const data = await response.json();
        setFetchData(data)
      } catch (error) {
        console.log(error);
      }
    };
    const getProductCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setFetchCategories(['All', ...data]);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    getProductCategories();

  }, [])


  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <WrapperView>
      <View style={styles.headerContainer} >
        <Image source={{ uri: TEST_URL }} style={styles.avatar} resizeMode='cover' />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: text }}>
            Hi, Leo 👋
          </Text>
          <Text style={{ opacity: .75, color: text }} numberOfLines={1}>
            Discover fashion that suits your style
          </Text>
        </View>
        <TouchableOpacity style={[styles.bell, {
          borderColor
        }]}>
          <Icon name="notifications-outline" color={text} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={[styles.searchBar, {
          borderColor
        }]}>
          <Icon name="search-outline" color={text} size={24} style={{ opacity: .5 }} />
          <Text style={{ fontSize: 16, opacity: .5, color: text, marginLeft: 12 }}>
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={[styles.bell, {
            backgroundColor: primary
          }]}>
          <Icon name="options-outline" color={background} size={24} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.collectionContainer}>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>New Collections</Text>
          <TouchableOpacity>
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', height: 200, gap: 12 }}>
          <Card uri={MODAL_1} price='120' />
          <View style={{ flex: 1, gap: 12 }}>
            <Card uri={MODAL_2} price='75' />
            <Card uri={MODAL_3} price='200' />
          </View>
        </View>
      </View>
      <FlatList
        style={{
          marginHorizontal: -24
        }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 8
        }}
        data={fetchCategories}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }: any) => <Tab item={item} isSelected={index === categoryIndex} setCategoryIndex={() => setCategoryIndex(index)} />}
      />
      <MasonryList
        data={fetchData}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => <CardItem item={item} i={i} handlePresentModalPress={handlePresentModalPress} />}
        // refreshing={isLoadingNext}
        // onRefresh={() => refetch({ first: ITEM_CNT })}
        onEndReachedThreshold={0.1}
      // onEndReached={() => loadNext(ITEM_CNT)}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props) => <BottomSheetCustomBackdrop onPress={closePresentModal} {...props} />}
      >
        <FilterView />
      </BottomSheetModal>
    </WrapperView>
  )
}

type Product = {
  id: number,
  title: string
  price: string
  category: string
  description: string
  image: string
};


type CardItemProps = {
  item: Product,
  i: number,
  handlePresentModalPress: () => void
}

const CardItem = ({ item, i, handlePresentModalPress }: CardItemProps) => {
  const { text, background, primary } = useThemeColors();

  return (
    <View style={{
      aspectRatio: (i == 0 || i % 6 === 0) ? 1 : 4 / 5,
      borderRadius: (i == 0 || i % 6 === 0) ? 12 : 16,
      marginTop: 12,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Image
        source={{ uri: item?.image }}
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
      />
      <View style={StyleSheet.absoluteFill}>
        <View style={{ flexDirection: 'row', padding: 8, gap: 8 }}>
          <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: text }}>{ }</Text>
          <TouchableOpacity style={{
            backgroundColor: background,
            height: 32,
            aspectRatio: 1,
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: "center"
          }}>
            <Icon name="heart-outline" color={primary} size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
        <BottomSheetTouchableOpacity
          onPress={() => { Crashes.generateTestCrash() }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 12,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            position: 'relative',
            overflow: "hidden",
            // gap: 12
          }}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType='dark'
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          />
          <Text style={{ flex: 1, fontSize: 12, color: "#fff", fontWeight: '600' }}>${item?.price}</Text>
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 12,
            }}>
            <Icon name="cart-outline" color={primary} size={20} />
          </View>
        </BottomSheetTouchableOpacity>
      </View>
    </View >
  )
}

type CardProps = {
  uri: string
  price: string
}

const Card = ({ uri, price }: CardProps) => {
  return (
    <View
      style={{ flex: 1, position: "relative", overflow: "hidden", borderRadius: 12 }}
    >
      <Image
        source={{ uri }}
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: 'rgba(0,0,0,.35)',
          borderRadius: 100
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>${price}</Text>
      </View>
    </View >
  )
}

type TabProps = {
  item: any,
  isSelected: boolean
  setCategoryIndex: any
}

const Tab = ({ item, isSelected, setCategoryIndex }: TabProps) => {
  const { primary, background, text, borderColor } = useThemeColors();

  return (
    <TouchableOpacity
      onPress={setCategoryIndex}
      style={{
        backgroundColor: isSelected ? primary : '#fefefe',
        borderWidth: isSelected ? 0 : .5,
        borderColor,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 100
      }}
    >
      <Text style={{
        fontWeight: "600",
        fontSize: 16,
        color: isSelected ? background : text,
        opacity: isSelected ? 1 : .5
      }}>{item}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  avatar: {
    width: 52,
    aspectRatio: 1,
    borderRadius: 52
  },
  bell: {
    width: 52,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 52,
    borderWidth: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    height: 52,
    borderRadius: 52,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12
  },
  collectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  }
})