# HR Dashboard

A modern HR dashboard built with Next.js and Tailwind CSS for managing employee data, performance tracking, and analytics.

## Features

- Employee Management
- Performance Analytics
- Advanced Search & Filtering
- Bookmarking System
- Department-wise Statistics
- Responsive Design

## Tech Stack

- **Framework:** Next.js 13+
- **Styling:** Tailwind CSS
- **Charts:** Chart.js with react-chartjs-2
- **Data:** DummyJSON API

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hr-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Usage

- **Search:** Use the search bar to find employees by name, email, or department
- **Filters:** 
  - Filter by department (Engineering, HR, Marketing, etc.)
  - Filter by performance rating (1-5 stars)
- **Employee Details:** Click on "View Profile" to see detailed employee information
- **Bookmarks:** Star employees to add them to your bookmarks
- **Analytics:** View department-wise performance and bookmark trends

## Project Structure

```
hr-dashboard/
├── src/
│   ├── app/
│   │   ├── page.js          # Home page
│   │   ├── layout.js        # Root layout
│   │   └── analytics/       # Analytics page
│   ├── components/
│   │   ├── UserCard.js      # Employee card component
│   │   ├── SearchAndFilter.js
│   │   └── employee/        # Employee-related components
│   └── constants/           # Shared constants
├── public/                  # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

The dashboard is optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)
- [DummyJSON](https://dummyjson.com)