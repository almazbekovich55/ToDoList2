import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";

const Home = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((s) => s.product);

  const getProducts = async () => {
    const res = await axios(
      `https://686de706c9090c4953879120.mockapi.io/api/v1/ToDoList`
    );
    dispatch({ type: "GET_PRODUCT", payload: res.data });
  };

  const postData = async () => {
    if (!name.trim() || !image.trim() || !price.trim()) {
      alert("Заполните все поля!");
      return;
    }
    const data = {
      name,
      image,
      price,
    };

    const res = await axios.post(
      `https://686de706c9090c4953879120.mockapi.io/api/v1/ToDoList`,
      data
    );
    dispatch({ type: "SET_PRODUCT", payload: res.data });
    alert("Успешно добавлено!");
    setName("");
    setImage("");
    setPrice("");
  };

  const remove = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      await axios.delete(
        `https://686de706c9090c4953879120.mockapi.io/api/v1/ToDoList/${id}`
      );
      alert("Товар удалён");
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section id="home">
      <div className="container">
        <div className="home">
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={postData}>Добавить</button>

          <div className="home--list">
            <h2>Список товаров</h2>
            {products.length === 0 ? (
              <p>Нет товаров</p>
            ) : (
              products.map((el) => (
                <div key={el.id}>
                  <img src={el.image} alt="img" />
                  <h3>{el.name}</h3>
                  <p>Цена: {el.price}</p>
                  <h2 onClick={() => remove(el.id)}>X</h2>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
