import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import CustomRouterLink from 'components/CustomRouterLink';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    borderBottom: '2px solid ' + theme.palette.background.default
  },
  media: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: 100,
		height: 100,
	},
	title: {
		textAlign: 'left',
		color: theme.palette.text.primary,
		display: '-webkit-box',
		boxOrient: 'vertical',
		lineClamp: 2,
		wordBreak: 'break-all',
		overflow: 'hidden',
	},
	subtitle: {
		marginTop: theme.spacing(1),
		fontSize: 12,
		textAlign: 'left',
		color: theme.palette.text.secondary,
		display: '-webkit-box',
		boxOrient: 'vertical',
		wordBreak: 'break-all',
		overflow: 'hidden',
		[theme.breakpoints.up('xs')]: {
			lineClamp: 2,
		},
		[theme.breakpoints.up('md')]: {
			lineClamp: 3,
		}
	},
	price: {
		fontWeight: 500,
		marginTop: theme.spacing(2)
	},
	infoCountContainer: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-around'
	}
}));

export default function ComplexGrid(props) {
	const { product } = props;
  const classes = useStyles();

  const removeFromCart = (e, id) => {
  	e.stopPropagation();
  	e.preventDefault();
  	console.log(id)
  }

  return (
    <Box component={CustomRouterLink} to={"/product/" + product._id}>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
          	<div 
          		className={classes.media}
          		style={{
          			backgroundImage: `url(${product.thumbnail})`,
          		}}
          	>
          	</div>
          </Grid>
          <Grid item xs container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Box
									fontSize="h5.fontSize"
									component="div"
									classes={{ root: classes.title }}
								>
									{product.name}
								</Box>
								<Box component="div" classes={{ root: classes.subtitle }}>
									<div dangerouslySetInnerHTML={{ __html: product.description }} >
									</div>
								</Box>
                <Typography className={classes.price} display="block" gutterBottom>
									$ {product.price}
								</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          	<IconButton onClick={(e) => removeFromCart(e, product._id)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <div className={classes.infoCountContainer}>
        	<Typography color="primary">Cantidad: {product.count}</Typography>
        	<Typography color="secondary">Total: ${product.price * product.count}</Typography>
        </div>
      </div>
    </Box>
  );
}