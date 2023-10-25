import React, { useEffect } from "react";
import { DigitalClock } from "../DigitalClock";
import { Milliseconds } from "../../types.ts";
import styled from "styled-components";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { DisplayMode } from "../../reducer.ts";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export const DIGITAL_CLOCK_INDEX = 0;
export const ANALOG_CLOCK_INDEX = 1;

interface Props {
  elapsedTime: Milliseconds;
  displayMode: DisplayMode;
  onClockModeChange: (mode: DisplayMode) => void;
}

const ClockSlider: React.FC<Props> = ({ elapsedTime, displayMode, onClockModeChange }) => {
  const swiperRef = React.useRef<SwiperRef>(null);

  const onSlideChange = (swiper: SwiperClass) => {
    const { activeIndex } = swiper;
    const newMode = activeIndex === DIGITAL_CLOCK_INDEX ? DisplayMode.DIGITAL : DisplayMode.ANALOG;
    onClockModeChange(newMode);
  }

  // Update the clock mode when the display mode changes
  useEffect(() => {
    swiperRef.current?.swiper.slideTo(
        displayMode === "digital"
            ? DIGITAL_CLOCK_INDEX
            : ANALOG_CLOCK_INDEX
    );
  }, [displayMode]);

  return (
    <Container>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        ref={swiperRef}
        onSlideChange={onSlideChange}
      >
        <SwiperSlide>
          <DigitalClock elapsedTime={elapsedTime} />
        </SwiperSlide>
        <SwiperSlide>
          <DigitalClock elapsedTime={elapsedTime} />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export default ClockSlider;
