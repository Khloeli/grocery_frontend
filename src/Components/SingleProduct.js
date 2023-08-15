import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";

export default function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);

  const getProduct = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products/${props.id}`
    );
    setProduct(response.data);
    setName(response.data.name);
    setPrice(response.data.price);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleEdit = async () => {
    let product = {
      name,
      price,
    };
    await axios.put(
      `${process.env.REACT_APP_API_SERVER}/products/${props.id}`,
      product
    );

    let newArray = [...props.products];

    // Find the object by ID
    const objectToUpdate = newArray.find((obj) => obj.id === props.id);
    // Update the object's name and price
    if (objectToUpdate) {
      objectToUpdate.name = name;
      objectToUpdate.price = price;
    } else {
      console.log(`Object with ID ${props.id} not found.`);
    }
    props.setProducts(newArray);

    setShow(false);
  };

  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <h1>Single</h1>
      <h2>{name}</h2>
      <h3>{price}</h3>
      <button onClick={() => props.toggle(product)}>Go Back</button>
      <button onClick={() => showModal()}>Edit</button>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Grocery Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="close-button"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
          <Button
            className="add-button"
            onClick={() => {
              handleEdit();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
