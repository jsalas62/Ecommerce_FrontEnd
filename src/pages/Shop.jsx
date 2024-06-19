import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/App.css'; // Importa los estilos globales
import api from '../api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [butonFiltrado, setButonFiltrado] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get('/productos/')
      .then(response => {
        console.log('Products:', response.data); 
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value); // Actualiza el estado del término de búsqueda
  };

  return (
    <section className="shop_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>PRODUCTOS</h2>
          <div className="containerbtn">
            <div className="search-container">
              <input
                className="input"
                type="text"
                value={searchTerm}
                onChange={handleChange} // Actualiza el estado del término de búsqueda al escribir
                placeholder="Buscar producto..."
              />
              <svg viewBox="0 0 24 24" className="search__icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center my-4">
            <button
              className={`btn ${butonFiltrado === "Todos" ? 'btn-primary' : 'btn-outline-primary custom-btn-outline'} m-2`}
              onClick={() => setButonFiltrado("Todos")}
              style={{
                backgroundColor: butonFiltrado === "Todos" ? '#f16179' : 'transparent',
                borderColor: butonFiltrado === "Todos" ? '#f16179' : '#f16179',
                color: butonFiltrado === "Todos" ? '#fff' : '#f16179'
              }}
            >
              Todos
            </button>
            <button
              className={`btn ${butonFiltrado === "Flores" ? 'btn-primary' : 'btn-outline-primary'} m-2`}
              onClick={() => setButonFiltrado("Flores")}
              style={{
                backgroundColor: butonFiltrado === "Flores" ? '#f16179' : 'transparent',
                borderColor: butonFiltrado === "Flores" ? '#f16179' : '#f16179',
                color: butonFiltrado === "Flores" ? '#fff' : '#f16179'
              }}
            >
              Flores
            </button>
            <button
              className={`btn ${butonFiltrado === "Llaveros" ? 'btn-primary' : 'btn-outline-primary'} m-2`}
              onClick={() => setButonFiltrado("Llaveros")}
              style={{
                backgroundColor: butonFiltrado === "Llaveros" ? '#f16179' : 'transparent',
                borderColor: butonFiltrado === "Llaveros" ? '#f16179' : '#f16179',
                color: butonFiltrado === "Llaveros" ? '#fff' : '#f16179'
              }}
            >
              Llaveros
            </button>
            <button
              className={`btn ${butonFiltrado === "Tazas" ? 'btn-primary' : 'btn-outline-primary'} m-2`}
              onClick={() => setButonFiltrado("Tazas")}
              style={{
                backgroundColor: butonFiltrado === "Tazas" ? '#f16179' : 'transparent',
                borderColor: butonFiltrado === "Tazas" ? '#f16179' : '#f16179',
                color: butonFiltrado === "Tazas" ? '#fff' : '#f16179'
              }}
            >
              Tazas
            </button>
          </div>
        </div>

        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => {
              if (
                (butonFiltrado === "Todos" || (butonFiltrado === "Flores" && product.categoria === 1) || 
                (butonFiltrado === "Llaveros" && product.categoria === 3) || 
                (butonFiltrado === "Tazas" && product.categoria === 2)) &&
                (product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
              ) {
                return (
                  <ProductCard
                    key={index}
                    image={product.imagen_url}
                    title={product.nombre}
                    price={` S/.${product.precio}`}
                  />
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>

        <div className="btn-box">
          <a href="">Ver todos los productos</a>
        </div>
      </div>
    </section>
  );
};

export default Shop;
