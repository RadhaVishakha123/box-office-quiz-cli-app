import React from 'react';
import { View, Text, Image } from 'react-native';
import { View as MotiView } from 'moti';
import { GameMode } from '../types/type';
import { useTheme } from '../hooks/useTheme';

interface RenderQuestionProps {
  mode: GameMode;
  emojis?: string;
  dialogue?: string;
  clue?: string;
  imageUrl?: string;
  maskedWord?: string;
  scrambledLetters?: string[];
}

export default function RenderQuestion({
  mode,
  emojis,
  dialogue,
  clue,
  imageUrl,
  maskedWord,
  scrambledLetters,
}: RenderQuestionProps) {
  const { theme } = useTheme();

  // Shared container wrapper theme config
  const containerStyle = {
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.primaryYellow,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  };

  switch (mode) {
    case 'BLURRED_POSTER':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              resizeMode="cover"
              blurRadius={12}
              style={{
                width: 220,
                height: 320,
                borderRadius: 20,
              }}
            />
          ) : (
            <View
              className="w-[220px] h-[320px] rounded-2xl justify-center items-center"
              style={{ backgroundColor: theme.lightskyprimary }}
            >
              <Text style={{ color: theme.textSecondary }}>No Poster</Text>
            </View>
          )}

          <Text
            className="mt-4 text-lg font-black"
            style={{ color: theme.text }}
          >
            Guess the Movie
          </Text>

          <Text
            className="text-xs mt-1 uppercase tracking-wide"
            style={{ color: theme.textSecondary }}
          >
            Identify the blurred movie poster.
          </Text>
        </View>
      );

    case 'EMOJI_RIDDLES':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          <MotiView
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              type: 'timing',
              duration: 2500,
              loop: true,
            }}
          >
            <Text className="text-6xl mb-4 text-center">{emojis}</Text>
          </MotiView>

          <Text
            className="text-center font-bold text-sm"
            style={{ color: theme.text }}
          >
            Decode the emojis and guess the movie.
          </Text>
        </View>
      );

    case 'LETTER_PUZZLE':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          {clue && (
            <Text
              className="text-center font-black text-lg mb-5"
              style={{ color: theme.text }}
            >
              {clue}
            </Text>
          )}

          <View className="flex-row flex-wrap justify-center">
            {scrambledLetters?.map((letter, index) => (
              <View
                key={index}
                className="w-14 h-14 rounded-xl justify-center items-center m-2 border"
                style={{
                  backgroundColor: theme.iconBg,
                  borderColor: theme.primaryYellow,
                }}
              >
                <Text
                  className="text-2xl font-black"
                  style={{ color: theme.iconText }}
                >
                  {letter}
                </Text>
              </View>
            ))}
          </View>

          <Text
            className="text-xs uppercase mt-4"
            style={{ color: theme.textSecondary }}
          >
            Arrange these letters to find the movie.
          </Text>
        </View>
      );

    case 'DIALOGUE_GURU':
      return (
        <View className="p-6 rounded-3xl border-2" style={containerStyle}>
          <Text
            className="text-xl text-center italic font-black mb-4"
            style={{ color: theme.text }}
          >
            "{dialogue}"
          </Text>

          <Text
            className="text-xs text-center uppercase tracking-widest"
            style={{ color: theme.textSecondary }}
          >
            Which movie is this dialogue from?
          </Text>
        </View>
      );

    case 'SPOT_THE_EXACT':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          <Text
            className="text-lg text-center font-black"
            style={{ color: theme.text }}
          >
            Spot the Correct Movie Title
          </Text>

          <Text
            className="text-xs mt-2 uppercase"
            style={{ color: theme.textSecondary }}
          >
            Only one spelling is correct.
          </Text>
        </View>
      );

    case 'MISSING_LETTERS':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          {clue && (
            <Text
              className="text-lg font-black text-center mb-5"
              style={{ color: theme.text }}
            >
              {clue}
            </Text>
          )}

          <Text
            style={{
              fontSize: 36,
              letterSpacing: 8,
              fontWeight: '900',
              color: theme.text,
            }}
          >
            {maskedWord}
          </Text>

          <Text
            className="text-xs mt-4 uppercase"
            style={{ color: theme.textSecondary }}
          >
            Fill in the missing letters.
          </Text>
        </View>
      );

    default:
      return null;
  }
}
