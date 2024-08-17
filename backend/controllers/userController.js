const User = require('../models/Users');

const clearUserData = async (req, res) => {
    try {
        await User.deleteMany({});
        console.log('Previous user data cleared.');
    } catch (error) {
        console.error('Error clearing user data:', error);
    }
};

const createUser = async (req, res) => {
    const { name, grid } = req.body;
    const newUser = new User({ name, grid });
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const markGrid = async (req, res) => {
    const { name, number } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update marked grid
        user.grid.forEach((row, rowIndex) => {
            const colIndex = row.indexOf(number);
            if (colIndex !== -1) user.markedGrid[rowIndex][colIndex] = true;
        });

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkWin = async (req, res) => {
    const { name } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (user.markedGrid[i].every(Boolean) || user.markedGrid.every(row => row[i])) {
                return res.status(200).json({ message: `${name} wins!` });
            }
        }

        res.status(200).json({ message: 'No winner yet' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { clearUserData, createUser, markGrid, checkWin };
