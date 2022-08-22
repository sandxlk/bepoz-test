import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getCustomerByUserId } from "../../api/customer.service";
import { BepozAlert } from "../../core/dto/bepoz-alert.dto";
import { Customer } from "./dto/customer.dto";

const Login = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["bepoz-user"]);
  const [alert, setAlert] = useState<BepozAlert>({ show: false });
  const [customerUserId, setCustomerUserId] = useState<string>("");
  const handleLogin = async () => {
    const customer: Customer = await getCustomerByUserId(customerUserId).catch(
      (error) => {
        console.error(`customer validation failed-${error}`);
        showInvalidErrorAlert();
      }
    );
    if (customer) {
      setCookie("bepoz-user", customer, { path: "/" });
      navigate("/home");
    } else {
      showInvalidErrorAlert();
    }
  };

  const showInvalidErrorAlert = () => {
    setAlert({ show: true, variant: "danger", message: "Invalid User" });
  };
  return (
    <div style={{ padding: "400px" }}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Customer name</InputGroup.Text>
        <Form.Control
          aria-label="customer name"
          value={customerUserId}
          onChange={(event) => setCustomerUserId(event.target.value)}
        />
      </InputGroup>
      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>
      <Alert
        show={alert.show}
        key={alert.variant}
        variant={alert.variant}
        onClose={() => setAlert({ show: false })}
        dismissible
      >
        {alert.message}
      </Alert>
    </div>
  );
};

export default Login;
