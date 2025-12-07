const NOCDisplay = ({ noc, nocText, onDownload }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Generated NOC</h3>
      <pre className="whitespace-pre-wrap text-gray-700">{nocText}</pre>
      <button
        onClick={onDownload}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default NOCDisplay;
