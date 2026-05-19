import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function TypingIndicator() {
  const dots = [useRef(new Animated.Value(0.25)).current,
                useRef(new Animated.Value(0.25)).current,
                useRef(new Animated.Value(0.25)).current];

  useEffect(() => {
    const anims = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.25, duration: 300, useNativeDriver: true }),
          Animated.delay((dots.length - i - 1) * 200 + 200),
        ])
      )
    );
    anims.forEach(a => a.start());
    return () => anims.forEach(a => a.stop());
  }, []);

  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        {/* 아바타 이모지 */}
      </View>
      <View style={styles.bubble}>
        {dots.map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
  },
  avatar: {
    width: 30, height: 30,
  },
  bubble: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    borderTopLeftRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  dot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: Colors.text3,
  },
});
