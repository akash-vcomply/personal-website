<a name="readme-top"></a>

<div align="center">
  <img src="https://i.postimg.cc/8PhNjRts/Chat-GPT-Image-Nov-19-2025-05-24-32-PM.png" alt="Taskman Logo" width="130"/>
</div>

<h1 align="center">🚀 TaskMan</h1>
<p align="center"><b>Your personal task companion => designed to capture, plan, schedule, and organize everything that crosses your mind.</b></p>
## By [@akash-vcomply](https://akash-vcomply.github.io/personal-website/)

# 🚀 TaskMan

You got a man for all your task! Get along with the Taskman😏 

---

# 📃Table of Contents
- Overview
- Features
- Tech Stack
- Prerequisites
- Installation & Setup
- Usage
- Folder Structure
- Running Tests
- Common Issues / Troubleshooting
- Contributing
- License
- Acknowledgments

---

## 📘 Overview
TaskMan is to handle and plan all and everyday ideas tools tasks etc , whatever pops in your mind, Taskman helps you do it, it creates , updates , schedules reminders as well as lists it down for you to easily understand and time block accordingly so that you never miss a day without being **PRODUCTIVE**.
The Core Idea behind is simple **focus more on doing, and less on re-planning**, 
- To understand and track your daily tasks or hobbies and align them based on your prefered order.

---

## 🧩 Features
- You can add your Task, by typing , or just by directly communicating (Hey Taskman could add a reminder to schedule a call with Michael Scott at 2pm)
- You can view all your tasks by day month or by status or by a simple list 
- And the best part it supports the kanban view so its just so easy to drag and drop your tasks around and replan your day! :)

---

## 🛠️ Tech Stack
- **Language:** Node.js
- **Database:** MongoDB
- **API Framework:** (Express)

---

## 📦 Prerequisites
Make sure you have the following installed:

- Node.js (>= 20)
- MongoDB

---

## ⚙️ Installation & Setup

### **1. Clone the repository**
```bash
git clone https://github.com/akash-vcomply/taskman.git
cd taskman
```

### **2. Install dependencies**

```bash
npm install
```


### **3. Add environment variables**
Create a .env file inside the project root:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskman
```



### **4. Start the development server**

```bash
npm start
```

---

## 🚀 Usage

### **Run the app**

```bash
npm run dev
```

### **Sample API Call for TaskMan**

```bash
POST /api/tasks
{
  "title": "Have a sip of Apple Cider Vinegar",  
  "status": "todo"
}
```

---

## 🗂️ Folder Structure

```bash
taskman/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── tests/
│   └── utils/
│
├── public/
├── package.json
└── README.md

```

---

## 🧪 Running Tests

```bash
npm test
```

## ❗ Common Issues / Troubleshooting

MongoNetworkError
```bash
Ensure MongoDB is running locally or your URI is correct.
```
Port already in use	Update PORT in .env to a free port.


---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Commit changes
4. Open a Pull Request
5. Add yourself as Assignor and in the Reviewer Section Tag @akash-vcomply

---

## 📄 License

MIT License

---

## 🙌 Acknowledgments

- Libraries/Tools
    - Apache Charts
    - Mongoose
- Inspiration 
    - Postman
    - Postwoman 
- Reference Projects
    - https://akash-vcomply.github.io/personal-website/
