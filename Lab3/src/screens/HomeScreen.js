import React, { useContext, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import {
  State,
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { GameContext } from '../GameContext';


const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`;

const EnergyLabel = styled.Text`
  font-size: 16px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${(props) => props.theme.subtext};
  margin-bottom: 6px;
`;

const EnergyText = styled.Text`
  font-size: 56px;
  font-weight: bold;
  color: ${(props) => props.theme.accent};
  margin-bottom: 10px;
`;

const HintText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.subtext};
  margin-bottom: 40px;
  letter-spacing: 1px;
`;

const AuthorBadge = styled.View`
  position: absolute;
  bottom: 24px;
  padding: 6px 14px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.card};
  border-width: 1px;
  border-color: ${(props) => props.theme.accent};
`;

const AuthorText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.subtext};
`;

const Planet = styled(Animated.View)`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  background-color: #6c63ff;
  align-items: center;
  justify-content: center;
  elevation: 8;
  shadow-color: #6c63ff;
  shadow-opacity: 0.6;
  shadow-radius: 20px;
`;

const PlanetText = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export default function HomeScreen() {
  const { energy, updateStat } = useContext(GameContext);
  const doubleTapRef = useRef(null);
  const panRef = useRef(null);
  const scale = useRef(new Animated.Value(1)).current;

  const animatePulse = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.15, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const onSingleTap = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      animatePulse();
      updateStat('taps', 1);
    }
  };

  const onDoubleTap = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      animatePulse();
      updateStat('doubleTaps', 3);
    }
  };

  const onLongPress = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) updateStat('longPresses', 7);
  };

  const onPan = (e) => {
    if (e.nativeEvent.state === State.END) updateStat('drags', 2);
  };

  const onSwipeRight = (e) => {
    if (e.nativeEvent.state === State.ACTIVE)
      updateStat('swipeRights', Math.floor(Math.random() * 8) + 3);
  };

  const onSwipeLeft = (e) => {
    if (e.nativeEvent.state === State.ACTIVE)
      updateStat('swipeLefts', Math.floor(Math.random() * 8) + 3);
  };

  const onPinch = (e) => {
    if (e.nativeEvent.state === State.END) updateStat('pinches', 5);
  };

  return (
    <Container>
      <EnergyLabel>Енергія</EnergyLabel>
      <EnergyText>⚡ {energy}</EnergyText>
      <HintText>Взаємодій з планетою для збору енергії</HintText>

      <PinchGestureHandler onHandlerStateChange={onPinch}>
        <Animated.View>
          <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={onSwipeRight}>
            <Animated.View>
              <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={onSwipeLeft}>
                <Animated.View>
                  <PanGestureHandler ref={panRef} onHandlerStateChange={onPan}>
                    <Animated.View>
                      <LongPressGestureHandler onHandlerStateChange={onLongPress} minDurationMs={2000}>
                        <Animated.View>
                          <TapGestureHandler waitFor={doubleTapRef} onHandlerStateChange={onSingleTap}>
                            <Animated.View>
                              <TapGestureHandler
                                ref={doubleTapRef}
                                numberOfTaps={2}
                                onHandlerStateChange={onDoubleTap}
                              >
                                <Planet style={{ transform: [{ scale }] }}>
                                  <PlanetText>🌍 TAP</PlanetText>
                                </Planet>
                              </TapGestureHandler>
                            </Animated.View>
                          </TapGestureHandler>
                        </Animated.View>
                      </LongPressGestureHandler>
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </FlingGestureHandler>
            </Animated.View>
          </FlingGestureHandler>
        </Animated.View>
      </PinchGestureHandler>

      <AuthorBadge>
        <AuthorText>Дмитро Балан • ВТ-22-1 • ЖДТУ</AuthorText>
      </AuthorBadge>
    </Container>
  );
}
