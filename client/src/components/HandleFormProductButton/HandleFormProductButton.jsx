import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { 
  productCreateHandleNext,
  productCreateHandleBack,
  productCreateHandleSkip,
  productCreateHandleSetCategory,
  productCreateProduct,
} from 'actions/products';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function HandleFormProductButton(props) {

	const { validateForm, categoryId, values, sectionName } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const { productForm } = useSelector(state => state.products);

  const { 
    activeStep, 
    componentsName 
  } = productForm;

	const isStepOptional = (step) => {
    return componentsName[step].isOptional;
  };

  const handleNext = async () => {
  	const result = await validateForm();
  	if (Object.keys(result).length===0) {
      if (categoryId) {
        dispatch(productCreateHandleSetCategory(categoryId));
      }
      let validValues = {};
      for (let prop in values) {
        if (values[prop] !== '') {
          validValues[prop] = values[prop];
        }
      }
      let info = {
        values: validValues,
        name: sectionName
      }
      return dispatch(productCreateHandleNext(info));
  	}
  	return null;
  };

  const handleBack = () => {
    dispatch(productCreateHandleBack());
  };

  const handleSkip = () => {
    dispatch(productCreateHandleSkip());
  };

  const handleSubmit = () => {
    dispatch(productCreateProduct(productForm.product));
  }

	return (
    <div>
      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
        Back
      </Button>
      {isStepOptional(activeStep) && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSkip}
          className={classes.button}
          type="submit"
        >
          Skip
        </Button>
      )}
      <>
        {
          activeStep === componentsName.length - 1 ?
          (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
              type="submit"
            >
              Finish
            </Button>
          )
          :
          (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
              type="submit"
            >
              Next
            </Button>
          )
        }
      </>
    </div>
	);
}