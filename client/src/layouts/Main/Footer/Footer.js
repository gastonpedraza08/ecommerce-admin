import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, alpha } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';

import { CustomRouterLink } from 'components';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.ultradark,
		color: theme.palette.primary.contrastText,
		[theme.breakpoints.up("xs")]: {
	  	justifyContent: 'center',
	  	padding: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
    	justifyContent: 'space-around',
    	padding: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
    	padding: theme.spacing(4),
    },
	},
	inputRoot: {
    color: 'inherit',
    borderRadius: theme.shape.borderRadius,
    paddingLeft: theme.spacing(2),
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));


export default function Footer(props) {
	const classes = useStyles();

	return (
		<Grid container spacing={3} className={classes.root}>
			<Grid item xs={8} sm={4} md={4}>
				<List>
		      <ListItem>
		      	<Typography color="inherit" variant="h3">
		      		Información
		      	</Typography>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
			        <Typography color="inherit" variant="body1">
			      		¿Quienes Somos?
			      	</Typography>
						</Link>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
		        	<Typography color="inherit" variant="body1">
			      		Terminos y Condiciones
			      	</Typography>
						</Link>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
		        	<Typography color="inherit" variant="body1">
			      		Seguimiento de pedidos
		      		</Typography>
						</Link>
		      </ListItem>
		    </List>
			</Grid>
			<Grid item xs={8} sm={4} md={4}>
				<List>
		      <ListItem>
		      	<Typography color="inherit" variant="h3">
		      		Mi cuenta
		      	</Typography>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
		        	<Typography color="inherit" variant="body1">
			      		Mi carrito de Compras
		      		</Typography>
						</Link>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
		        	<Typography color="inherit" variant="body1">
			      		Favoritos
		      		</Typography>
						</Link>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
		        	<Typography color="inherit" variant="body1">
			      		Historial de Pedidos
		      		</Typography>
						</Link>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
		        	<Typography color="inherit" variant="body1">
			      		Mi Panel de Usuario
		      		</Typography>
						</Link>
		      </ListItem>
		    </List>
			</Grid>
			<Grid item xs={8} sm={4} md={4}>
				<List>
		      <ListItem>
		      	<Typography color="inherit" variant="h3">
		      		Sorteos y Novedades
		      	</Typography>
		      </ListItem>
		      <ListItem>
		        <Link to="#" color="inherit" component={CustomRouterLink}>
		        	<Typography color="inherit" variant="body1">
			      		Agendá tus datos para sumar beneficios. 
		      		</Typography>
						</Link>
		      </ListItem>
		      <ListItem>
			      <InputBase
	            placeholder="Correo Electronico"
	            classes={{
	              root: classes.inputRoot,
	              input: classes.inputInput,
	            }}
	          />
		      </ListItem>
		      <ListItem>
			      <Button color="secondary" variant="contained">
			      	Subscribe
			      </Button>
		      </ListItem>
		    </List>
			</Grid>
		</Grid>
	);
}


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
