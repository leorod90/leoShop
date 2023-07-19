import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useThemeColors from '../themes/useThemeColors'

type Props = {
  children: React.ReactNode,
  bg?: string | null
}

export default function WrapperView({ children, bg = null }: Props) {
  const { background } = useThemeColors();
  return (
    <ScrollView style={{
      backgroundColor: bg ?? background, flex: 1, paddingHorizontal: 24,
    }}>
      <SafeAreaView style={{ flex: 1, gap: 24, paddingVertical: 24 }}>{children}</SafeAreaView>
    </ScrollView>
  )
}
