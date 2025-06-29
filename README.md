# Vaping Survey Frontend

[![React](https://img.shields.io/badge/React-18%2B-blue.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, bilingual (English/Arabic) web application for conducting an anonymous survey on vaping habits, perceptions, and social influences. Originally developed as a school project, this app is now open source for the benefit of educators, students, and the community.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Related Projects](#related-projects)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**Vaping Survey Frontend** is a React-based SPA that enables users to participate in a survey about vaping in either English or Arabic. It is designed for clarity, accessibility, and ease of customization. All survey questions are managed in a single data file for rapid adaptation to different research needs.

---

## Features

- 🗣️ **Bilingual**: Full support for English and Arabic (RTL/LTR).
- 📱 **Responsive**: Works seamlessly on desktop and mobile.
- 🕵️ **Anonymous**: No personal data collected by default.
- 💡 **Customizable**: Questions and options are easily editable.
- 🎨 **Modern UI**: Clean, dark-mode design for comfortable use.
- 🛡️ **Environment-based API endpoint**: No hardcoded secrets.

---

## Demo

> _You can deploy this app to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static host. Screenshots and a live demo link can be added here if available._

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/0x-4b/survey-frontend.git
   cd survey-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

---

## Configuration

This app requires an API endpoint to handle survey submissions.  
Create a `.env` file in the root directory:

```
REACT_APP_API_URL=https://your-api-endpoint.com
```

> **Tip:** Never commit your real `.env` file with secrets or production URLs.

---

## Usage

1. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Edit survey questions:**  
   All questions are stored in [`src/data/questions.js`](src/data/questions.js).  
   Customize them as needed for your survey.

---

## Project Structure

```
survey-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── HomePage.js
│   │   ├── Survey.js
│   │   └── CustomButton.js
│   ├── data/
│   │   └── questions.js
│   ├── styles/
│   │   ├── Survey.css
│   │   └── HomePage.css
│   ├── index.js
│   └── index.css
├── .env.example
├── README.md
└── LICENSE
```

---

## Related Projects

- **Backend:** [survey-backend](https://github.com/0x-4b/survey-backend) – The Node.js/Express.js API for this frontend.

---

## Roadmap

- [ ] Export survey results as CSV
- [ ] Add admin dashboard for analytics
- [ ] Support for more languages
- [ ] Advanced question types (sliders, dropdowns)
- [ ] Theme customization

---

## Contributing

Pull requests and suggestions are welcome!  
To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code adheres to the style and conventions of the project.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**0x-4b**  
GitHub: [@0x-4b](https://github.com/0x-4b)

---
