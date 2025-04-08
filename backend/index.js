const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/', taskRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Không tìm thấy endpoint' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Lỗi server' });
});

const PORT = process.env.PORT || 3000;
try {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Lỗi khi khởi động server:', error.message);
}