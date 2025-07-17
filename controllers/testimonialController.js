const testimonialModel = require('../models/testimonialModel');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel.getAll();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialModel.getById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, description, image, rating } = req.body; 
    const newTestimonial = await testimonialModel.create({ name, description, image, rating }); // ✅ pass rating
    res.status(201).json(newTestimonial); 
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { name, description, image, rating } = req.body;
    const updatedTestimonial = await testimonialModel.update(req.params.id, { name, description, image, rating }); // ✅ pass rating
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const result = await testimonialModel.remove(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
