const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors'); // Thêm cors
require('dotenv').config();

const app = express();

// Xử lý lỗi promise không được bắt
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors()); // Thêm CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Sửa thành thư mục frontend

// Routes
app.use('/', taskRoutes);

// Xử lý lỗi 404
app.use((req, res) => {
    res.status(404).json({ error: 'Không tìm thấy endpoint' });
});

// Xử lý lỗi server
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