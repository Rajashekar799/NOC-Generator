import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NOCDisplay from '../components/NOCDisplay';

const GenerateNOC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    aadhaar: '',
    phone: '',
    address: '',
  });
  const [noc, setNoc] = useState(null);
  const [nocText, setNocText] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      toast.error('Age must be a positive number');
      return false;
    }
    if (!/^\d{12}$/.test(formData.aadhaar)) {
      toast.error('Aadhaar must be exactly 12 digits');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Phone must be exactly 10 digits');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      age: parseInt(formData.age, 10),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/noc', submitData);
      toast.success('NOC created successfully!');
      const nocResponse = await axios.get(`http://localhost:5000/api/noc/${response.data._id}`);
      setNoc(nocResponse.data.noc);
      setNocText(nocResponse.data.text);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating NOC');
    }
  };

  const downloadPDF = () => {
    window.open(`http://localhost:5000/api/noc/${noc._id}/pdf`, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Generate NOC</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Aadhaar No (12 digits)</label>
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            pattern="\d{12}"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone (10 digits)</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            pattern="\d{10}"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate NOC
        </button>
      </form>
      {noc && (
        <NOCDisplay noc={noc} nocText={nocText} onDownload={downloadPDF} />
      )}
    </div>
  );
};

export default GenerateNOC;
