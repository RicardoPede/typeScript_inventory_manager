import { Equipment, Category } from './inventory/Inventory';
import { useEffect, useState } from 'react';
import { useAxios } from '../contexts/AxiosContext';

export default function Home() {
  const axios = useAxios();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/equipments')
      .then(response => setEquipments(response.data))
      .catch(error => console.error('Error fetching equipments: ', error));

    axios.get('http://localhost:4000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories: ', error));
  }, []);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(category => category._id === categoryId);
    return category?.name || 'Unknown';
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  }

  const sortedEquipments = [...equipments].sort((a, b) => {
    switch (sortCriteria) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'stock':
        return a.stock - b.stock;
      case 'category':
        return getCategoryName(a.category).localeCompare(getCategoryName(b.category));
      case 'status':
        return a.status.localeCompare(b.status);
      case 'location':
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  }).slice(0, 6);

  return (
    <div className="container mt-5">
      <h1 className='mb-4'>Home</h1>
      <div className="mb-3">
        <label htmlFor="sortCriteria" className="form-label">Ordenar por:</label>
        <select id="sortCriteria" className="form-select" value={sortCriteria} onChange={handleSortChange}>
          <option value="">Seleccionar</option>
          <option value="name">Nombre</option>
          <option value="priceAsc">Precio (Menor a Mayor)</option>
          <option value="priceDesc">Precio (Mayor a Menor)</option>
          <option value="stock">Cantidad</option>
          <option value="category">Categoría</option>
          <option value="status">Estado</option>
          <option value="location">Ubicación</option>
        </select>
      </div>
      <div className="row">
        {sortedEquipments.map((equipment: Equipment) => (
          <div className="col-md-4 mb-4" key={equipment._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{equipment.name}</h5>
                <p className="card-text">{equipment.description}</p>
                <p className="card-text"><strong>Serial Number:</strong> {equipment.serialNumber}</p>
                <p className="card-text"><strong>Category:</strong> {getCategoryName(equipment.category)}</p>
                <p className="card-text"><strong>Status:</strong> {equipment.status}</p>
                <p className="card-text"><strong>Location:</strong> {equipment.location}</p>
                <p className="card-text"><strong>Purchase Date:</strong> {new Date(equipment.purchaseDate).toLocaleDateString()}</p>
                <img src={equipment.image} alt={equipment.name} className="img-fluid" />
                <p className="card-text"><strong>Price:</strong> {equipment.price}</p>
                <p className="card-text"><strong>Stock:</strong> {equipment.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
