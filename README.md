# PUBG Currency Shop

A Next.js website for selling PUBG virtual currency.

## Features
- Multi-language support (English, Chinese, Arabic)
- User Authentication (Login/Register)
- Product Listing and Checkout (Mock Payment)
- Admin Dashboard (Manage Orders and Products)
- Responsive Design

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Setup Database**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

3.  **Seed Database**
    ```bash
    npx prisma db seed
    ```
    This will create mock products and an admin user:
    -   Email: `admin@example.com`
    -   Password: `admin123`

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000)

## Admin Access
Login with the admin credentials above to access the `/admin` dashboard.
