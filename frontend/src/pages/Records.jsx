import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NOCList from '../components/NOCList';
import SearchBar from '../components/SearchBar';

const Records = () => {
  const [nocs, setNocs] = useState([]);
  const [filteredNocs, setFilteredNocs] = useState([]);

  useEffect(() => {
    fetchNOCs();
  }, []);

  const fetchNOCs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/noc');
      setNocs(response.data);
      setFilteredNocs(response.data);
    } catch (error) {
      toast.error('Error fetching NOCs');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/noc/${id}`);
      toast.success('NOC deleted successfully!');
      fetchNOCs();
    } catch (error) {
      toast.error('Error deleting NOC');
    }
  };

  const handleSearch = (query) => {
    const filtered = nocs.filter(noc =>
      noc.name.toLowerCase().includes(query.toLowerCase()) ||
      noc.aadhaar.includes(query)
    );
    setFilteredNocs(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">NOC Records</h2>
      <SearchBar onSearch={handleSearch} />
      <NOCList nocs={filteredNocs} onDelete={handleDelete} />
    </div>
  );
};

export default Records;
