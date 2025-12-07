const NOCList = ({ nocs, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Aadhaar</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nocs.map(noc => (
            <tr key={noc._id} className="border-t">
              <td className="px-4 py-2">{noc.name}</td>
              <td className="px-4 py-2">{noc.aadhaar}</td>
              <td className="px-4 py-2">{new Date(noc.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => window.open(`http://localhost:5000/api/noc/${noc._id}`, '_blank')}
                  className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => window.open(`http://localhost:5000/api/noc/${noc._id}/pdf`, '_blank')}
                  className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => onDelete(noc._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NOCList;
