const NOC = require('../models/NOC');
const PDFDocument = require('pdfkit');

// Create NOC
exports.createNOC = async (req, res) => {
  try {
    const parsedData = {
      ...req.body,
      age: parseInt(req.body.age, 10)
    };
    const noc = new NOC(parsedData);
    await noc.save();
    res.status(201).json(noc);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Aadhaar number already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Get all NOCs
exports.getAllNOCs = async (req, res) => {
  try {
    const nocs = await NOC.find();
    res.json(nocs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get NOC by ID
exports.getNOCById = async (req, res) => {
  try {
    const noc = await NOC.findById(req.params.id);
    if (!noc) return res.status(404).json({ error: 'NOC not found' });

    const nocText = `NO OBJECTION CERTIFICATE

This is to certify that Mr/Ms ${noc.name}, aged ${noc.age}, holding Aadhaar number ${noc.aadhaar},
residing at ${noc.address}, has no objection from our side for the purpose requested.

Contact: ${noc.phone}

Date: ${noc.createdAt.toDateString()}
Signature: ___________________`;

    res.json({ noc, text: nocText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete NOC by ID
exports.deleteNOC = async (req, res) => {
  try {
    const noc = await NOC.findByIdAndDelete(req.params.id);
    if (!noc) return res.status(404).json({ error: 'NOC not found' });
    res.json({ message: 'NOC deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate PDF
exports.generatePDF = async (req, res) => {
  try {
    const noc = await NOC.findById(req.params.id);
    if (!noc) return res.status(404).json({ error: 'NOC not found' });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=NOC_${noc.name}.pdf`);

    doc.pipe(res);

    doc.fontSize(20).text('NO OBJECTION CERTIFICATE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`This is to certify that Mr/Ms ${noc.name}, aged ${noc.age}, holding Aadhaar number ${noc.aadhaar},`);
    doc.text(`residing at ${noc.address}, has no objection from our side for the purpose requested.`);
    doc.moveDown();
    doc.text(`Contact: ${noc.phone}`);
    doc.moveDown();
    doc.text(`Date: ${noc.createdAt.toDateString()}`);
    doc.moveDown();
    doc.text('Signature: ___________________');

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
