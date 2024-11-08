# Hướng dẫn bỏ qua khảo sát.
### Bước 1: Truy cập vào phần khảo sát của bạn.
### Bước 2: Mở công cụ nhà phát triển (F12) và chuyển sang mục console (điều khiển).
### Bước 3: Dán lệnh bên dưới và enter để thực thi.
```javascript
fetch('https://raw.githubusercontent.com/ngclam/survey_skip/main/script_skip.js').then(res => res.text()).then(script => eval(script));
