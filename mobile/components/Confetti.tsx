"use client"

import { useEffect, useRef } from "react"
import { View, Animated, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export function Confetti({ show, onComplete }: { show: boolean; onComplete: () => void }) {
  const animations = useRef(
    Array.from({ length: 30 }).map(() => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      opacity: new Animated.Value(1),
    })),
  ).current

  useEffect(() => {
    if (show) {
      const animationPromises = animations.map((anim, index) => {
        const startX = Math.random() * width
        const endX = startX + (Math.random() - 0.5) * 200

        return Animated.parallel([
          Animated.timing(anim.translateY, {
            toValue: height,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateX, {
            toValue: endX - startX,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start()
      })

      setTimeout(() => {
        animations.forEach((anim) => {
          anim.translateY.setValue(0)
          anim.translateX.setValue(0)
          anim.opacity.setValue(1)
        })
        onComplete()
      }, 3000)
    }
  }, [show])

  if (!show) return null

  return (
    <View className="absolute inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
      {animations.map((anim, index) => {
        const colors = ["#10B981", "#FBBF24", "#F59E0B", "#EF4444", "#8B5CF6"]
        const color = colors[index % colors.length]
        const startX = Math.random() * width

        return (
          <Animated.View
            key={index}
            style={{
              position: "absolute",
              left: startX,
              width: 8,
              height: 8,
              backgroundColor: color,
              borderRadius: 4,
              transform: [{ translateY: anim.translateY }, { translateX: anim.translateX }],
              opacity: anim.opacity,
            }}
          />
        )
      })}
    </View>
  )
}
