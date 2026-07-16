import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getLevelsForMode } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function LevelSelectionScreen({ route, navigation }: any) {
  const { mode, title } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [wonList, setWonList] = useState<string[]>([]);
  const [lostList, setLostList] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(1);
  useFocusEffect(
    useCallback(() => {
      async function fetchProgress() {
        try {
          const res = await getLevelsForMode(user?.id as number, mode);
          if (res.success) {
            setCurrentLevel(res.levels.levels.currentLevel);
            setWonList(res.levels.levels.levelsWon);
            setLostList(res.levels.levels.levelsLost);
            setQuestionCount(res.levels.questionCount);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      fetchProgress();
    }, [mode, user?.id]),
  );

  if (loading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: theme.background }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }
  console.log('current level:', currentLevel);
  console.log('won list:', wonList);
  console.log('lost list:', lostList);
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <View
        className="px-4 py-3 flex-row items-center border-b"
        style={{ borderColor: theme.border }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Icon name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4" style={{ color: theme.text }}>
          {title}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          {Array.from({ length: questionCount }, (_, i) => {
            const levelNum = i + 1;
            const isUnlocked = levelNum <= currentLevel;
            const isCompleted = wonList.includes(levelNum.toString());

            return (
              <TouchableOpacity
                key={levelNum}
                disabled={!isUnlocked}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('GameplayScreen', {
                    mode,
                    level: levelNum,
                  })
                }
                className="w-[22%] aspect-square rounded-2xl mb-4 items-center justify-center border-2 position-relative"
                style={{
                  backgroundColor: isUnlocked ? theme.card : theme.border,
                  borderColor: isCompleted
                    ? '#22C55E'
                    : isUnlocked
                    ? theme.primary
                    : 'transparent',
                  opacity: isUnlocked ? 1 : 0.6,
                }}
              >
                {!isUnlocked ? (
                  <Icon name="lock" size={20} color={theme.textSecondary} />
                ) : (
                  <>
                    <Text
                      className="text-lg font-extrabold"
                      style={{ color: theme.text }}
                    >
                      {levelNum}
                    </Text>
                    {isCompleted && (
                      <View className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                        <Icon name="check" size={10} color="white" />
                      </View>
                    )}
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
