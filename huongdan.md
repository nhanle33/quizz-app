# Hướng Dẫn Chạy Ứng Dụng Quiz App 🚀

Dự án này bao gồm hai phần chính: Backend (FastAPI - Python) và Frontend (Vite + React + TypeScript). Dưới đây là hướng dẫn chi tiết về cấu trúc các đường dẫn và cách khởi chạy.

## 📁 Toàn Bộ Cấu Trúc File & Đường Dẫn Liên Quan

Thư mục gốc của dự án: `t:\Quizz`

### 1. Backend
Thư mục: `t:\Quizz\backend`
- **File chạy chính (Logic & API):** `t:\Quizz\backend\main.py`
  - Nơi chứa API endpoints như `GET /questions` và `POST /submit` cũng như dữ liệu trắc nghiệm.
- **File thư viện Python:** `t:\Quizz\backend\requirements.txt`
  - Các thư viện để cài đặt (fastapi, uvicorn).

### 2. Frontend
Thư mục: `t:\Quizz\frontend`
- **Giao diện chính (React logic):** `t:\Quizz\frontend\src\App.tsx`
  - Nơi đặt logic lấy dữ liệu (axios), quản lý trạng thái đang làm bài, chấm bài, và render giao diện người dùng.
- **File cấu hình CSS:** 
  - `t:\Quizz\frontend\src\App.css`: Hiệu ứng animations đẹp mắt, phong cách thiết kế Glassmorphism dành riêng cho ứng dụng.
  - `t:\Quizz\frontend\src\index.css`: Cài đặt CSS Variables (màu sắc toàn cục), Fonts, và nền động.
- **Trang HTML khởi chạy:** `t:\Quizz\frontend\index.html`

---

## ⚙️ Hướng Dẫn Chạy Cục Bộ (Local)

Để chạy ứng dụng, bạn cần mở **2 cửa sổ Terminal** (Command Prompt hoặc PowerShell) chạy song song với nhau.

### Hướng dẫn chạy Backend:
Mở Terminal 1 và lần lượt điền:
1. Di chuyển vào mục backend:
   ```bash
   cd t:\Quizz\backend
   ```
2. *(Tùy chọn)* Cài đặt thư viện nếu đây là lần chạy trên máy tính mới:
   ```bash
   python -m pip install -r requirements.txt
   ```
3. Khởi động máy chủ Server:
   ```bash
   python -m uvicorn main:app --reload
   ```

> 🎯 **Trạng thái:** Backend sẽ chạy tại **http://localhost:8000** (bạn có thể vào http://localhost:8000/docs để dùng thử API thẳng trên web).

### Hướng dẫn chạy Frontend:
Mở màn hình Terminal 2 và lần lượt điền:
1. Di chuyển vào mục frontend:
   ```bash
   cd t:\Quizz\frontend
   ```
2. *(Tùy chọn)* Cài đặt thư viện Nodejs nếu đây là lần chạy trên máy mới:
   ```bash
   npm install
   ```
3. Khởi động hệ thống trang Web:
   ```bash
   npm run dev
   ```

> 🎯 **Trạng thái:** Frontend sẽ chạy tại **http://localhost:5173**. Lúc này, bạn chỉ cần mở trình duyệt và vào link này để dùng app.

Chúc bạn có một trải nghiệm thật vui với sản phẩm của mình! Nếu bạn muốn chỉnh sửa hay bổ sung thêm gì đừng ngại cho mình biết nhé.
