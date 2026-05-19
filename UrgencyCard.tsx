import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { UrgencyData } from '../hooks/useChat';

interface Props {
  urgency: UrgencyData;
}

const CONFIG = {
  low: {
    label: '✅ 관찰 — 가정에서 모니터링 가능',
    bg: Colors.urgLowBg,
    border: Colors.urgLowBorder,
    color: Colors.urgLowText,
    dot: Colors.accentMid,
  },
  mid: {
    label: '⚠️ 주의 — 48~72시간 내 진료 권장',
    bg: Colors.urgMidBg,
    border: Colors.urgMidBorder,
    color: Colors.urgMidText,
    dot: Colors.warn,
  },
  high: {
    label: '🚨 긴급 — 즉시 병원 방문',
    bg: Colors.urgHighBg,
    border: Colors.urgHighBorder,
    color: Colors.urgHighText,
    dot: Colors.danger,
  },
};

export default function UrgencyCard({ urgency }: Props) {
  const cfg = CONFIG[urgency.urgency];
  return (
    <View style={[styles.card, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <View style={styles.labelRow}>
        <View style={[styles.dot, { backgroundColor: cfg.dot }]} />
        <Text style={[styles.label, { color: cfg.color }]}>{cfg.label}</Text>
      </View>
      <Text style={[styles.reason, { color: cfg.color }]}>{urgency.reason}</Text>
      <Text style={[styles.advice, { color: cfg.color }]}>{urgency.advice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginTop: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
  },
  label: {
    fontSize: 12, fontWeight: '700',
  },
  reason: {
    fontSize: 13, lineHeight: 20, marginBottom: 4,
  },
  advice: {
    fontSize: 12, lineHeight: 18, opacity: 0.85,
  },
});
