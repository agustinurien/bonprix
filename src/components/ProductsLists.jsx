import { useEffect, useState, useRef } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { searchProducts } from "../utils/articulosApi";
import Skeleton from "@mui/material/Skeleton";
import "./productList.css";

const ProductsLists = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalToLoad, setTotalToLoad] = useState(0);
  // número mínimo de skeletons a mostrar mientras se carga
  const MIN_SKELETONS = 3;

  // refs para manejar cancelación y buffer
  const abortRef = useRef(null);
  const bufferRef = useRef([]);
  const flushTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      // cleanup al desmontar
      if (abortRef.current) abortRef.current.abort();
      if (flushTimerRef.current) clearInterval(flushTimerRef.current);
    };
  }, []);

  const startFlushTimer = () => {
    if (flushTimerRef.current) clearInterval(flushTimerRef.current);
    flushTimerRef.current = setInterval(() => {
      if (bufferRef.current.length > 0) {
        const toAdd = bufferRef.current.splice(0, bufferRef.current.length);
        setProducts((prev) => [...prev, ...toAdd]);
      }
    }, 100);
  };

  const stopFlushTimer = () => {
    if (flushTimerRef.current) {
      clearInterval(flushTimerRef.current);
      flushTimerRef.current = null;
    }
  };

  const handleSearch = async (busqueda) => {
    if (!busqueda) return;

    // cancelar búsqueda previa si existe
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setProducts([]);
    bufferRef.current = [];
    setLoading(true);
    setTotalToLoad(0);
    const start = performance.now();

    // comenzamos el timer que vacía buffer cada 100ms
    startFlushTimer();

    try {
      await searchProducts(
        busqueda,
        (productos) => {
          // searchProducts ahora envía arrays de productos; soportamos también objetos individuales
          if (Array.isArray(productos)) {
            bufferRef.current.push(...productos);
            // incrementamos el total esperado según los chunks que van llegando
            setTotalToLoad((prev) => prev + productos.length);
          } else if (productos) {
            bufferRef.current.push(productos);
            setTotalToLoad((prev) => prev + 1);
          }
        },
        { signal: abortRef.current.signal }
      );
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Búsqueda cancelada");
      } else {
        console.error("Error en búsqueda:", err);
      }
    } finally {
      // vaciamos buffer restante y stop timer
      if (bufferRef.current.length > 0) {
        const toAdd = bufferRef.current.splice(0, bufferRef.current.length);
        setProducts((prev) => [...prev, ...toAdd]);
      }
      stopFlushTimer();
      setLoading(false);
      const end = performance.now();
      console.log(`⏱️ Tiempo total: ${(end - start).toFixed(2)} ms`);
    }
  };

  const renderSkeleton = (key) => (
    <div
      key={`skeleton-${key}`}
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="rectangular" height={24} width="30%" />
    </div>
  );

  const productsToShow = products.length;
  // pending: cuántos productos se esperan según los chunks recibidos
  const pending = Math.max(0, totalToLoad - productsToShow);
  // mostramos al menos MIN_SKELETONS mientras loading sea true
  const skeletonCount = loading ? Math.max(MIN_SKELETONS, pending) : 0;

  return (
    <div className="containerproducts">
      <Searchbar onSearch={handleSearch} />
      {products.map((p) => (
        <div
          key={p.codigo}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h3>{p.descripcion}</h3>
          <p>
            <strong>Precio:</strong>{" "}
            {p.precioVenta > 0 ? `$${p.precioVenta}` : "Consultar"}
          </p>
          <p>
            <strong>Stock:</strong> {p.stock}
          </p>
        </div>
      ))}

      {Array.from({ length: skeletonCount }).map((_, i) => renderSkeleton(i))}

      {!loading && products.length === 0 && <p>No se encontraron productos.</p>}
    </div>
  );
};

export default ProductsLists;
