import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { 
  productCreateHandleNext,
  productCreateHandleBack,
  productCreateHandleSkip,
  productCreateHandleReset,
} from 'actions/products';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { productForm } = useSelector(state => state.products);

  const { 
    activeStep, 
    skipped, 
    componentName, 
    componentsName 
  } = productForm;

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.includes(step);
  };

  const handleNext = () => {
    dispatch(productCreateHandleNext());
  };

  const handleBack = () => {
    dispatch(productCreateHandleBack());
  };

  const handleSkip = () => {
    dispatch(productCreateHandleSkip());
  };

  const handleReset = () => {
    dispatch(productCreateHandleReset());
  };

  const ComponentToRender = React.lazy(() => import('./' + componentName));

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {componentsName.map(({ label }, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === componentsName.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <ComponentToRender />
              </React.Suspense>
            </div>
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
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === componentsName.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
