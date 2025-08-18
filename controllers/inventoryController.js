const Inventory = require('../models/bookInventory');

exports.getInventory = async (req, res) => {
    try {
        const results = await Inventory.getAllInventory();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createInventory = async (req, res) => {
    try {
        const { book_name, book_id, book_quantity, borrowing_date, return_date, status } = req.body;

        if (!book_name || !book_id || !book_quantity || !borrowing_date || !status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const data = { book_name, book_id, book_quantity, borrowing_date, return_date, status };
        const result = await Inventory.addInventory(data);

        res.status(201).json({ message: 'Inventory added successfully', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Inventory.deleteInventory(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.json({ message: 'Inventory deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchInventory = async (req, res) => {
  try {
    const search = req.query.search || "";

    if (!search) {
      const results = await Inventory.getAllInventory();
      return res.json(results);
    }

    const results = await Inventory.searchInventory(search);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Inventory.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
