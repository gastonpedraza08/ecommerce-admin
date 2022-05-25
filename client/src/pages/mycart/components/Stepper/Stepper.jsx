import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  stepper: {
    padding: 0
  }
}));

function getSteps() {
  return ['User', 'Card Details'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Payer Information';
    case 1:
      return 'Personal Information';
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper(props) {
  const { setOpen } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [componentName, setComponentName] = useState('User');
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    switch(activeStep) {
      case 0: {
        setComponentName('User');
        break;
      }
      case 1: {
        setComponentName('Checkout');
        break;
      }
    }
  }, [activeStep]);

  const ComponentToRender = React.lazy(() => import('../' + componentName));

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          <div>
            <React.Suspense fallback={<div>Loading...</div>}>
              <ComponentToRender setOpen={setOpen}/>
            </React.Suspense>
          </div>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Back
            </Button>
            {
              activeStep === steps.length - 1 ?
              null
              :
              (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
