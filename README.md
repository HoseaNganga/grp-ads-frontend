
<h2>Screenshots of the Project 📸</h2>
<br>

<h5>SignUp Page</h5>

<div align='center'>
<img src='/grp-ads/src/assets/signup.png' width="200" height="200"  />

</div>
<br/>
<h5>Verification Page</h5>

<div align='center'>
<img src='/grp-ads/src/assets/verification.png' width="200" height="200"  />

</div>
<br/>
<h5>Login Page</h5>

<div align='center'>
<img src='/grp-ads/src/assets/loginpage.png' width="200" height="200"  />

</div>
<br/>
<h5>Dashboard Page</h5>

<div align='center'>
<img src='/grp-ads/src/assets/dashboard.png' width="200" height="200"  />

</div>
<br/>

# GrpAds(Next)

Welcome to the GrpAds Frontend — a fully responsive, production-ready web application built using Next.js, TypeScript, and Tailwind CSS, integrated with a secure Express.js + MongoDB backend. It supports full authentication flow, including signup, email verification, login, dashboard access, and logout. The app is thoroughly tested using Jest and React Testing Library, and deployed using Firebase Hosting with GitHub Actions CI/CD.



---

## Technologies used

- Technologies used
  - **Framework**: [Next.js](https://nextjs.org/) (App Router, `output: 'export'`)
  - **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)
  - [Jest](https://jestjs.io/)- A delightful JavaScript Testing Framework with a focus on simplicity.
  - **Backend**: Node.js + Express (hosted on Render)
  - **Database**: MongoDB
  - [Typescript](https://www.typescriptlang.org/) - Strongly typed language for safe incontractly to using Javasript
  - [Github-Actions](https://github.com/features/actions)-  (CI/CD) platform that allows you to automate your   build, test, and deployment pipeline
  - [Firebase Hosting](https://firebase.google.com/)-A fast and secure web hosting platform provided by Google for deploying web apps.
  - State Management: Zustand Store: A small, fast and scalable bearbones state-management solution using simplified flux principles.
  - Email Service: Nodemailer
  - Authentication: JWT (JSON Web Tokens)



## 🚀 Features  

- **Sign Up**  
  - Accessible at `/auth/signup`
  - Validates user inputs (email, password, name)
  - Submits signup data to the backend API:  
  `POST https://grp-ads-backend.onrender.com/api/auth/register`
  - Sends a verification email via the backend using **Nodemailer**
  - Important: Users must enter a valid email address — verification code will be sent to this email

- **Email Verification**  
  - After registration, the user receives a link in their inbox
  - Clicking it confirms their email and activates their account

  - **User Login**  
    - Accessible at `/auth/login`
    - Sends credentials to the backend:  
         `POST https://grp-ads-backend.onrender.com/api/auth/login`
    - On success:
    - Receives a JWT token and user info
    - Stores them in a secure **zustand store**
    - Navigates to the dashboard

- **User Dashboard**  
  - Accessible at `/home` after successful login
  - Displays authenticated user data and greeting
  - Responsive header with dynamic user profile circle and logout button

- **LogOut**  
  - Clears user session from zustand
  - Redirects back to `/auth/login`

- **BackEndIntegration**
  - This frontend calls a fully dedicated backend hosted on Render, using: Express.js, JWT for authentication, MongoDB for user storage and Nodemailer for email verification

---

## Test

<img src="/grp-ads/src/assets/test.png" width="400"/>
<br/>

This project uses Jest unit testing in Angular.

### 🧪 How to Use

- npm run test – Run selected or focused tests.

- npm run test:coverage – Get the Coverage.

## Github Action (CI/CD)

Automate project build, test, and deployment pipeline

<img src="/grp-ads/src/assets/deployments.png" width="600"/>
This project is automatically deployed to Firebase Hosting using GitHub Actions.

✅ GitHub Workflows:
.github/workflows/firebase-hosting-pull-request.yml
🔁 Deploys a preview on each PR

.github/workflows/firebase-hosting-merge.yml
🚀 Deploys to production when changes are merged to main

## 📦 Getting Started

First, run the development server:

1. Clone the project

```bash
git clone https://github.com/HoseaNganga/grp-ads-frontend.git
```

2. Change directory

```bash
 cd grp-ads-frontend
```

3. Install dependecies

```bash
npm install
```

4. Create a .env.local file

Create a .env.local file in the root of the project and add your environment variables:

```bash
NEXT_PUBLIC_BASE_URL=https://grp-ads-backend.onrender.com/api
```

5. Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
