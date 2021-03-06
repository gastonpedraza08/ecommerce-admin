import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import Check from '@material-ui/icons/Check';

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
  stepper: {
    backgroundColor: 'white',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none'
  }
}));

const QontoConnector = withStyles(theme => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: theme.palette.primary.dark,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.palette.primary.dark,
    },
  },
  line: {
    borderColor: theme.palette.primary.light,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

const useQontoStepIconStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.light,
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: theme.palette.primary.dark,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: theme.palette.primary.dark,
    zIndex: 1,
    fontSize: 18,
  },
}));

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}



export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { productForm } = useSelector(state => state.products);
  const [myComponentsName, setMyComponentsName] = useState([]);
  const [myActiveStep, setMyActiveStep] = useState(0);

  const { 
    activeStep, 
    componentName, 
    componentsName,
    skipped
  } = productForm;

  useEffect(() => {
    let auxArr = [...componentsName];
    let index = activeStep;

    if (activeStep < 3) {
      setMyActiveStep(activeStep);
      setMyComponentsName(auxArr.splice(0, 5));
    } else {
      setMyComponentsName(auxArr.splice(index - 2, 5));
    }

  }, [componentsName, activeStep]);

  const isStepOptional = (id) => {
    return componentsName.find(cN => cN.id === id).isOptional;
  };

  const isStepSkipped = (id) => {
    return skipped.includes(id);
  };

  const handleReset = () => {
    dispatch(productCreateHandleReset());
  };

  const ComponentToRender = React.lazy(() => import('./components/' + componentName + '/' + componentName + '.jsx'));

  return (
    <div className={classes.root}>
      <Stepper 
        className={classes.stepper} 
        activeStep={myActiveStep}
        connector={<QontoConnector />}
      >
        {myComponentsName.map(({ label, id }, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(id)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(id)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel 
                {...labelProps}
                StepIconComponent={QontoStepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === componentsName.length ? (
          <div>
            <Typography style={{color: 'green'}} className={classes.instructions}>
              Producto creado con ??xito.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Crear Nuevo Producto
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
