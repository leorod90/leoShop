import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useThemeColors from '../themes/useThemeColors'

type Props = {
  children: React.ReactNode
}

export default function WrapperView({ children }: Props) {
  const { background } = useThemeColors();
  return (
    <ScrollView style={{
      backgroundColor: background, flex: 1, paddingHorizontal: 24,
    }}>
      <SafeAreaView style={{ gap: 24, paddingVertical: 24 }}>{children}</SafeAreaView>
    </ScrollView>
  )
}
