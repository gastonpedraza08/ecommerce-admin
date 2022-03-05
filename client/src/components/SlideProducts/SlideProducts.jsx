import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  fiveProducts: {
    breakpoint: { max: 4000, min: 2000 },
    items: 5,
    slidesToSlide: 5,
  },
  fourProducts: {
    breakpoint: { max: 2000, min: 975 },
    items: 4,
    slidesToSlide: 4,
  },
  threeProducts: {
    breakpoint: { max: 975, min: 755 },
    items: 3,
    slidesToSlide: 3,
  },
  twoProducts: {
    breakpoint: { max: 755, min: 450 },
    items: 2,
    slidesToSlide: 2,
  },
  oneProduct: {
    breakpoint: { max: 450, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function SlideProducts(props) {
  return (
  	<div {...props}>
	    <Carousel
	      responsive={responsive}
	      //removeArrowOnDeviceType="oneProduct"
	      itemClass="carousel-item-padding-40-px"
	    >
	      {props.children}
	    </Carousel>
  	</div>
  );
}
