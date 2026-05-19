import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Message } from '../hooks/useChat';
import UrgencyCard from './UrgencyCard';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isAI = message.role === 'ai';

  return (
    <View style={[styles.row, isAI ? styles.rowAI : styles.rowUser]}>
      {/* 아바타 */}
      <View style={[styles.avatar, isAI ? styles.avatarAI : styles.avatarUser]}>
        <Text style={styles.avatarText}>{isAI ? '🐾' : '😊'}</Text>
      </View>

      {/* 말풍선 + 긴급도 카드 */}
      <View style={[styles.bubbleWrap, isAI ? styles.bubbleWrapAI : styles.bubbleWrapUser]}>
        <View style={[styles.bubble, isAI ? styles.bubbleAI : styles.bubbleUser]}>
          <Text style={[styles.bubbleText, isAI ? styles.bubbleTextAI : styles.bubbleTextUser]}>
            {message.text}
          </Text>
        </View>
        {message.urgency && <UrgencyCard urgency={message.urgency} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 14,
  },
  rowAI:   { justifyContent: 'flex-start' },
  rowUser: { flexDirection: 'row-reverse' },

  avatar: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  avatarAI:   { backgroundColor: Colors.accentLight },
  avatarUser: { backgroundColor: Colors.surface2 },
  avatarText: { fontSize: 14 },

  bubbleWrap:     { maxWidth: '80%', gap: 6 },
  bubbleWrapAI:   { alignItems: 'flex-start' },
  bubbleWrapUser: { alignItems: 'flex-end' },

  bubble: {
    paddingVertical: 10, paddingHorizontal: 13,
    borderRadius: 14, borderWidth: 1,
  },
  bubbleAI: {
    backgroundColor: Colors.surface2,
    borderColor: Colors.border,
    borderTopLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: Colors.accent,
    borderColor: 'transparent',
    borderTopRightRadius: 4,
  },
  bubbleText: {
    fontSize: 14, lineHeight: 22,
  },
  bubbleTextAI:   { color: Colors.text },
  bubbleTextUser: { color: '#fff' },
});
