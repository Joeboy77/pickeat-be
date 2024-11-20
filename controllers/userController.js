const User = require('../models/User')

const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const user = new User({ name, email, phone, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser };
