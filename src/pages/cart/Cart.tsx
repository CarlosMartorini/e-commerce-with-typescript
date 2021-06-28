import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Image, CardContainer, Container404 } from "./Styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useCart } from "../../providers/cart/Cart";
import { Product } from "../../types/Product";
import formatValue from "../../utils/formatValue";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
      maxWidth: 750,
      marginTop: "25px",
      margin: "15px",
      minHeight: 200,
  },

  root: {
      marginTop: "25px",
      minWidth: 275,
      maxHeight: 250,
  },

  title: {
      fontSize: 14,
  },

  pos: {
      marginTop: "15px",
      marginBottom: "15px",
      justifyContent: "center",
  },

}));

const Cart = () => {
  const { cart } = useCart();
  const classes = useStyles();
  const history = useHistory();

  const subtotal = cart.reduce((acc, prod) => acc + prod.price, 0);

  if (!cart.length) {
    return (
      <Container404>
        <h1> No products yet, go shopping!</h1>
        <Button
          onClick={() => history.push("/")}
          variant="contained"
          color="primary"
          size="large"
        >
        Let's GO
        </Button>
      </Container404>
    );
  }

  return (
    <>
    <Container>
      <TableContainer component={Paper} className={classes.table}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
                <TableCell>
                  <strong>Product</strong>
                </TableCell>
                <TableCell>{"  "}</TableCell>
                <TableCell align="right">
                  <strong>Price</strong>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            cart.map((product: Product) => (
              <TableRow key={product.id}>
              <TableCell>
                  <Image src={product.image} alt="Produto" />
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell align="right">{product.priceFormatted}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </TableContainer>
      <Card className={classes.root}>
        <CardContent>
            <Typography variant="h6" component="strong">
              <strong>Order</strong>
            </Typography>
            <CardContainer>
              <h4>{cart.length} Products</h4>
              <h4>$ {subtotal}</h4>
            </CardContainer>
        </CardContent>
        <CardActions className={classes.pos}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => history.push("/login")}
          >
          Finish order
          </Button>
        </CardActions>
      </Card>
    </Container>
    </>
  );
}

export default Cart;
