let nocData = [];
let nextId = 1;

const validateNOC = (data) => {
  const { name, age, aadhaar, phone, address } = data;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Name is required and must be a string');
  }
  
  if (!age || isNaN(age) || typeof age !== 'number' || age <= 0) {
    throw new Error('Age is required and must be a positive number');
  }
  
  if (!aadhaar || typeof aadhaar !== 'string' || !/^\d{12}$/.test(aadhaar)) {
    throw new Error('Aadhaar is required and must be exactly 12 digits');
  }
  
  if (!phone || typeof phone !== 'string' || !/^\d{10}$/.test(phone)) {
    throw new Error('Phone is required and must be exactly 10 digits');
  }
  
  if (!address || typeof address !== 'string' || address.trim().length === 0) {
    throw new Error('Address is required and must be a string');
  }
  
  // Check for duplicate Aadhaar
  if (nocData.some(n => n.aadhaar === aadhaar)) {
    throw new Error('Aadhaar number already exists');
  }
};

const getAll = () => nocData;

const getById = (id) => nocData.find(n => n._id === id);

const create = (data) => {
  validateNOC(data);
  const newNoc = { ...data, _id: (nextId++).toString(), createdAt: new Date() };
  nocData.push(newNoc);
  return newNoc;
};

const deleteById = (id) => {
  const index = nocData.findIndex(n => n._id === id);
  if (index > -1) {
    return nocData.splice(index, 1)[0];
  }
  return null;
};

const clear = () => {
  nocData = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  clear
};
