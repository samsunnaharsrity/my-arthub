# 🎨 ArtHub

ArtHub is a modern online artwork marketplace built with Next.js, MongoDB, and HeroUI. The platform connects artists and art collectors, allowing users to discover, buy, sell, and manage unique artworks in a seamless digital experience.


---

## 🚀 Live Demo

🔗 https://your-live-site-url.com

---

## ✨ Features

### 👨‍🎨 Artist Features

- Artist registration and authentication
- Create, edit, and delete artworks
- Upload artwork images
- Manage personal artist profile
- View artwork performance
- Mark artworks as sold
- Automatic artwork status management

### 🛍️ Buyer Features

- Browse artwork collections
- Search artworks
- Filter by category
- Sort by newest and price
- Add artworks to wishlist
- Add artworks to cart
- Purchase artworks
- View order history

### ❤️ Wishlist System

- Save favorite artworks
- Remove artworks from wishlist
- Quick add-to-cart functionality
- Persistent storage in database

### 🔎 Artwork Discovery

- Search by title
- Category filtering
- Price range filtering
- Sorting options
- Responsive gallery view

### 📊 Dashboard

- Artist Dashboard
- Artwork Management
- Profile Management
- Order Tracking
- Wishlist Management

### 🔐 Authentication

- Secure authentication using Better Auth
- Protected routes
- Session management
- User role support

### 📱 Responsive Design

- Mobile-friendly layout
- Tablet optimized UI
- Desktop dashboard
- Responsive artwork cards

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- HeroUI
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- Next.js API Routes
- Better Auth
- MongoDB

### Database

- MongoDB Atlas

### Deployment

- Vercel

---

## 📂 Project Structure

```bash
src
├── app
│   ├── dashboard
│   ├── artworks
│   ├── login
│   ├── register
│   ├── wishlist
│   ├── cart
│   └── api
│
├── components
│   ├── shared
│   ├── ui
│   ├── navbar
│   ├── footer
│   └── cards
│
├── lib
│   ├── actions
│   ├── db
│   ├── auth
│   └── utils
│
├── hooks
├── providers
└── assets
```

---

## 🗄️ Database Models

### User

```js
{
  name: String,
  email: String,
  image: String,
  role: "artist" | "buyer",
  wishlist: [ArtworkId],
  createdAt: Date
}
```

### Artwork

```js
{
  title: String,
  description: String,
  image: String,
  category: String,
  price: Number,
  artistId: ObjectId,
  status: "available" | "sold",
  createdAt: Date
}
```

### Order

```js
{
  buyerId: ObjectId,
  artworkId: ObjectId,
  amount: Number,
  status: String,
  createdAt: Date
}
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/arthub.git
```

Navigate to the project:

```bash
cd arthub
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔧 Available Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Build production application.

```bash
npm run start
```

Start production server.

```bash
npm run lint
```

Run ESLint.

---

## 🎯 Future Improvements

- Payment Gateway Integration
- Real-time Messaging
- Artist Verification System
- Artwork Reviews & Ratings
- Auction System
- AI Artwork Recommendation
- Multi-vendor Analytics
- Admin Dashboard

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

### ArtHub Team

Building a modern marketplace for artists and collectors worldwide.

---

## 📬 Contact

Email: support@arthub.com

Website: https://your-live-site-url.com

---

⭐ If you like this project, don't forget to give it a star!