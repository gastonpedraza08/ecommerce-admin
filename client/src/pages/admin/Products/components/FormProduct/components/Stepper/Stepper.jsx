import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { 
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
    componentName, 
    componentsName 
  } = productForm;

  const isStepOptional = (step) => {
    return componentsName[step].isOptional;
  };

  const isStepSkipped = (step) => {
    return componentsName[step].isOptional;
  };

  const handleReset = () => {
    dispatch(productCreateHandleReset());
  };

  const ComponentToRender = React.lazy(() => import('./components/' + componentName + '/' + componentName + '.jsx'));

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
          </div>
        )}
      </div>
    </div>
  );
}
