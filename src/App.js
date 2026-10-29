import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  // Estado global/compartido para almacenar la lista de artículos del inventario
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Arroz 1kg', marca: 'Tucapel', tipo: 'Abarrotes', stock: 45, precio: '$1.200' },
    { id: 2, nombre: 'Aceite Maravilla 1L', marca: 'Gourmet', tipo: 'Aceite', stock: 30, precio: '$2.500' },
    { id: 3, nombre: 'Leche Entera 1L', marca: 'Colun', tipo: 'Lácteos', stock: 60, precio: '$950' }
  ]);

  // Estados locales para el formulario de nuevo artículo
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');

  // Función para agregar un nuevo artículo al estado global
  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !marca.trim() || !tipo.trim()) {
      alert('Por favor completa los campos obligatorios (Nombre, Marca y Tipo).');
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      marca,
      tipo,
      stock: stock ? Number(stock) : 0,
      precio: precio ? `$${precio}` : '$0'
    };

    setProductos([...productos, nuevoProducto]);
    
    // Limpiar campos del formulario
    setNombre('');
    setMarca('');
    setTipo('');
    setStock('');
    setPrecio('');
    alert('¡Artículo agregado exitosamente al inventario!');
  };

  // Componente: Vista de Inventario (Tabla)
  const Inventario = () => (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-green-800 mb-2">Gestión de Inventario - Supermercado</h2>
      <p className="text-gray-600 mb-6">Listado general de stock y detalles de productos disponibles.</p>
      
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre Producto</th>
              <th className="p-3">Marca</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 text-gray-500">{p.id}</td>
                <td className="p-3 font-semibold text-gray-800">{p.nombre}</td>
                <td className="p-3 text-gray-700">{p.marca}</td>
                <td className="p-3 text-gray-700">{p.tipo}</td>
                <td className="p-3 text-gray-700">{p.stock}</td>
                <td className="p-3 text-green-700 font-bold">{p.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Componente: Formulario para ingresar nuevos artículos
  const IngresarArticulo = () => (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl mt-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Ingresar Nuevo Artículo</h2>
      <form onSubmit={agregarProducto} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Nombre del Producto:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Ej: Fideos Tallarín 400g"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Marca:</label>
          <input 
            type="text" 
            value={marca} 
            onChange={(e) => setMarca(e.target.value)} 
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Ej: Carozzi"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Tipo de Producto:</label>
          <input 
            type="text" 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)} 
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Ej: Abarrotes"
            required 
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-1">Stock:</label>
            <input 
              type="number" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ej: 50"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-1">Precio ($):</label>
            <input 
              type="text" 
              value={precio} 
              onChange={(e) => setPrecio(e.target.value)} 
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ej: 1.290"
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold p-3 rounded-lg shadow transition duration-200"
        >
          Guardar Artículo en el Inventario
        </button>
      </form>
    </div>
  );

  const QuienesSomos = () => (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-green-800 mb-2">Quiénes Somos</h2>
      <p className="text-gray-700">Somos una cadena de supermercados comprometida con ofrecer productos frescos, variedad y calidad para toda la familia.</p>
    </div>
  );

  const Contactanos = () => (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-green-800 mb-2">Contáctanos</h2>
      <p className="text-gray-700">¿Tienes dudas o sugerencias? Escríbenos a contacto@supermercado.cl o llámanos al +56 9 1234 5678.</p>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <header className="bg-green-800 text-white p-4 shadow-md text-center">
          <h1 className="text-3xl font-bold">Supermercado App</h1>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Inventario />} />
            <Route path="/agregar" element={<IngresarArticulo />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/contactanos" element={<Contactanos />} />
          </Routes>
        </main>

        <nav className="bg-gray-900 text-white flex flex-wrap justify-around p-4 shadow-inner">
          <Link to="/" className="hover:text-green-400 font-semibold transition">Inicio (Inventario)</Link>
          <Link to="/agregar" className="hover:text-green-400 font-semibold transition">Ingresar Artículo</Link>
          <Link to="/quienes-somos" className="hover:text-green-400 font-semibold transition">Quiénes Somos</Link>
          <Link to="/contactanos" className="hover:text-green-400 font-semibold transition">Contáctanos</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;