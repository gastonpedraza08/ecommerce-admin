import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";



const useStyles = makeStyles((theme) => ({
	root: {},
	listItem: {
		borderBottom: '1px solid black',
		cursor: 'move',
	},
	paper: {
    position: "absolute",
    top: "10vh",
    left: "5vw",
    width: "90vw",
    height: "80vh",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    display: "block",
  },
  header: {
  	marginBottom: theme.spacing(1)
  }
}));

export default function ModalOrderProducts({ open, handleClose, products, setProducts, setOpen }) {

  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="space-between"
      className={classes.header}
      >
        <Typography variant="h3" gutterBottom>
          Arrastra los Productos
        </Typography>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          size="medium"
        >
          Cerrar
        </Button>
      </Box>
      <ReactSortable animation={150} list={products} setList={setProducts} style={{borderTop: '1px solid black'}}>
				{products.map((product) => (
					<ListItem key={product._id} className={classes.listItem}>
						<ListItemIcon>
							<ControlCameraIcon />
						</ListItemIcon>
						<ListItemText primary={product.name} />
					</ListItem>
				))}
		</ReactSortable>
    </div>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      {body}
    </Modal>
  );
}
