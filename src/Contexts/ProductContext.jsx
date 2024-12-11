import React, { createContext, useContext, useState } from "react";
import api from "../components/axios";

// Créer le contexte
const ProductContext = createContext();

// Créer un fournisseur de contexte
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Définir la base de l'URL pour les requêtes
  // const baseURL = process.env.REACT_APP_BACKEND_URL;

  // Fonction pour récupérer tous les produits
  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get(`${baseURL}api/products`);

  //     setProducts(data);

  //     setError(null);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Fonction pour récupérer les détails d'un produit
  // const fetchProductDetails = async (productId) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get(`${baseURL}api/products/${productId}`);
  //     setProductDetails((prevDetails) => ({
  //       ...prevDetails,
  //       [productId]: data,
  //     }));
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // Fonction pour récupérer tous les produits
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products"); // Pas besoin d'ajouter baseURL
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les détails d'un produit
  const fetchProductDetails = async (productId) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products/${productId}`);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productId]: data,
      }));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productDetails,
        loading,
        error,
        fetchProducts,
        fetchProductDetails,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useProductContext = () => {
  return useContext(ProductContext);
};
