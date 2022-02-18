import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from '@material-ui/styles';

const responsive = {
  fiveProducts: {
    breakpoint: { max: 4000, min: 0 },
    items: 5,
    slidesToSlide: 2,
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    '& button': {
      minWidth: '25px',
      minHeight: '25px',
    }
  }
}));

export default function SlideProducts(props) {
  const classes = useStyles();
  return (
  	<div {...props} className={classes.root}>
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
