import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { checkoutProducts } from "../../api/checkout.service";
import { getAllProducts } from "../../api/product.service";
import { BepozAlert } from "../../core/dto/bepoz-alert.dto";
import { CheckoutArgs, ProductArg } from "./dto/checkout.args";
import { Checkout } from "./dto/checkout.dto";
import { ProductInfo } from "./dto/product-info.dto";
import { Product } from "./dto/product.dto";

const Home = () => {
  const [cookies] = useCookies(["bepoz-user"]);
  const [alert, setAlert] = useState<BepozAlert>({ show: false });
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [selectedQty, setSelectedQty] = useState<number>(0);
  const [productInfoList, setProductInfoList] = useState<ProductInfo[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0.0);

  useEffect(() => {
    const fetchProductList = async () => {
      return await getAllProducts().catch((error) => {
        console.error(`fetching products failed-${error}`);
        setAlert({ show: true, message: "Failed to fetch Products", variant: "danger" });
      });;
    };
    fetchProductList().then((data) => {
      setProducts(data);
    });
  }, []);

  const addProduct = () => {
    if (isSelectedRecordsValid()) {
      const selectedProd: Product | undefined = products.find(
        (product) => product.pid === selectedProduct
      );

      let productInfo: ProductInfo = {
        product: selectedProd!,
        amount: selectedProd
          ? parseFloat((selectedProd.retailPrice * selectedQty).toFixed(2))
          : 0,
        selectedQty: selectedQty,
        revisedQty: selectedQty,
        rules: [],
      };
      const currentProductInfoList = [...productInfoList, productInfo];
      setProductInfoList(currentProductInfoList);
    }
  };

  const handleCheckout = async () => {
    const productArgs: ProductArg[] = [];
    for (const productInfo of productInfoList) {
      const productArg: ProductArg = {
        productId: productInfo.product?.pid,
        qty: productInfo.selectedQty,
      };
      productArgs.push(productArg);
    }

    const checkoutArgs: CheckoutArgs = {
      customerId: cookies["bepoz-user"].cid,
      productList: productArgs,
    };
    const checkoutResponse: Checkout = await checkoutProducts(
      checkoutArgs
    ).catch((error) => {
      console.error(`checkout failed-${error}`);
      setAlert({ show: true, message: "Checkout failed", variant: "danger" });
    });
    if (checkoutResponse) {
      setAlert({
        show: true,
        message: "Successfully Checked out",
        variant: "success",
      });
      setProductInfoList(checkoutResponse.productsInfo);
      setTotalAmount(parseFloat(checkoutResponse.totalAmount.toFixed(2)));
    }
  };

  const isSelectedRecordsValid = (): boolean => {
    return selectedProduct > 0 && selectedQty > 0;
  };

  const productList = products.map((product) => (
    <option key={product.pid} value={product.pid}>
      {product.name}
    </option>
  ));

  const productInfoListData = productInfoList.map((productInfo, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{productInfo.product?.name}</td>
      <td>{productInfo.selectedQty}</td>
      <td>{productInfo.revisedQty}</td>
      <td>{productInfo.amount}</td>
    </tr>
  ));

  return (
    <>
      <h1>Welcome-{cookies["bepoz-user"].name}</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formProducts">
          <Form.Label>Products</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={selectedProduct}
            onChange={(event) =>
              setSelectedProduct(parseInt(event.target.value))
            }
          >
            <option key={0} value={0}>
              -Select-
            </option>
            {productList}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formQty">
          <Form.Label>Qty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Qty"
            value={selectedQty}
            onChange={(event) => setSelectedQty(parseInt(event.target.value))}
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" onClick={addProduct}>
        Add to Cart
      </Button>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Selected Qty</th>
            <th>Revised Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{productInfoListData}</tbody>
      </Table>

      <Button variant="success" type="submit" onClick={handleCheckout}>
        Checkout
      </Button>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>
            Total Amount - <b>{totalAmount}</b>
          </Form.Label>
        </Form.Group>
      </Row>

      <Alert
        show={alert.show}
        key={alert.variant}
        variant={alert.variant}
        onClose={() => setAlert({ show: false })}
        dismissible
      >
        {alert.message}
      </Alert>
    </>
  );
};

export default Home;
