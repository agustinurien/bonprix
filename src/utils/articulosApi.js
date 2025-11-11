export const searchProducts = async (busqueda, onChunk, { signal } = {}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/articulos/buscar?descripcion=${encodeURIComponent(
        busqueda
      )}`,
      { signal }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let done = false;

    // buffer para productos parseados; esto permite flush en lotes y reducir renders
    const parsedBuffer = [];
    const flush = () => {
      if (parsedBuffer.length === 0) return;
      // enviamos los productos en bloque
      onChunk?.(parsedBuffer.splice(0, parsedBuffer.length));
    };

    // flush periódico cada 100ms para agrupar updates y reducir renders
    const flushInterval = setInterval(flush, 100);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

      // procesamos objetos JSON completos
      let start, end;
      while (
        (start = buffer.indexOf("{")) !== -1 &&
        (end = buffer.indexOf("}", start)) !== -1
      ) {
        const chunk = buffer.slice(start, end + 1);
        buffer = buffer.slice(end + 1);

        try {
          const producto = JSON.parse(chunk);
          parsedBuffer.push(producto);
        } catch {
          // fragmento incompleto; se quedará en buffer
        }
      }
    }

    // último flush y limpieza
    flush();
    clearInterval(flushInterval);
  } catch (err) {
    if (err.name === "AbortError") return; // petición cancelada
    console.error("Error al buscar productos:", err);
    throw err;
  }
};
