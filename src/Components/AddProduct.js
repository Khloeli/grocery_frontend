import { useState } from "react";

export default function AddProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);

  const submit = () => {
    props.addProduct(name, price);
    setName("");
    setPrice("");
  };

  return (
    <div>
      <h3>Add Product Form</h3>
      <label>Product Name:</label>
      <br />
      <input
        type="text"
        value={name}
        placeholder="Add in product name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Product Price:</label>
      <br />
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <button onClick={submit}>Add Product</button>
    </div>
  );
}
