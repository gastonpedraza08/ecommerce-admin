import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";

export default function MyCarousel(props) {
  const { slides, adminPanel, ...rest } = props;
  const {
    uiLoadingCurrentSlides: { isLoading },
  } = useSelector((state) => state.ui);
  const [loadedImage, setLoadedImage] = useState(false);

  return (
    <div>
      <Skeleton
        variant="rect"
        height={adminPanel ? 300 : 1000}
        style={{ display: isLoading && !loadedImage ? "block" : "none" }}
      />
      <Carousel
        {...rest}
        autoPlay
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        style={{ display: isLoading && !loadedImage ? "none" : "block" }}
      >
        {slides.map((slide) => {
          return (
            <div key={slide.id}>
              <img
                alt=""
                src={slide.image}
                onLoad={() => setLoadedImage(true)}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
