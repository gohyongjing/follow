# Follower Analysis Tool

A Next.js application for analyzing social media follower data by comparing followers and following lists from ZIP file exports.

## 🚀 Features

- **ZIP File Upload**: Drag & drop or browse for ZIP files containing social media data exports
- **Smart File Detection**: Automatically finds followers and following files in nested directories
- **Data Parsing**: Handles multiple formats (JSON, CSV, TXT) with binary data cleaning
- **Comprehensive Analysis**:
  - Total followers and following counts
  - Users who don't follow back
  - Users you don't follow back
  - Mutual followers
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Code Quality**: Automated linting, formatting, and type checking

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **File Processing**: JSZip for ZIP extraction
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── file-picker.tsx   # ZIP file upload component
│   ├── file-info-card.tsx # File details display
│   ├── analysis-results.tsx # Analysis results container
│   ├── stats-cards.tsx   # Statistics cards
│   ├── user-lists.tsx    # User lists display
│   └── error-card.tsx    # Error message component
├── hooks/                # Custom React hooks
│   └── use-follower-analysis.ts # Analysis state management
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   └── follower-analysis.ts # ZIP processing and parsing
└── types/               # TypeScript type definitions
    └── follower-analysis.ts # Analysis result types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd follow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🔧 Code Quality Setup

### Pre-commit Hooks

The project uses Husky with pre-commit hooks to ensure code quality:

- **Pre-commit**: Runs lint-staged to check and fix staged files
- **Commit-msg**: Validates commit message format (conventional commits)

### Configuration Files

- **`.prettierrc`**: Prettier configuration with Tailwind CSS plugin
- **`.prettierignore`**: Files excluded from formatting
- **`eslint.config.mjs`**: ESLint configuration with Next.js and Prettier integration
- **`.husky/`**: Git hooks directory

### Commit Message Format

Follow conventional commit format:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Example: `feat: add user authentication`

## 📊 How It Works

### File Processing

1. **Upload**: User uploads a ZIP file containing social media data export
2. **Extraction**: JSZip extracts files from the ZIP archive
3. **Detection**: Tool automatically finds followers and following files
4. **Parsing**: Parses JSON/CSV/TXT files and extracts usernames
5. **Analysis**: Compares followers and following lists
6. **Display**: Shows comprehensive analysis results

### Supported File Formats

- **JSON**: Objects with `username`, `user`, `name`, or `value` fields
- **CSV**: Comma-separated values (first column as username)
- **TXT**: Plain text files with one username per line

### File Detection Logic

The tool searches for files with these patterns:

- `followers` or `follower` in filename → Followers list
- `following` or `follows` in filename → Following list
- Filters out macOS system files (`__MACOSX`, `._`, `.DS_Store`)

### Data Cleaning

- Removes null bytes and control characters
- Filters out system-related strings (`com.apple`, `Mac OS X`, etc.)
- Validates usernames (length > 1, valid characters)
- Removes duplicates

## 🎨 UI Components

### FilePicker

- Drag & drop interface
- File validation (ZIP only, 100MB limit)
- Visual feedback for upload states
- Error handling and display

### Analysis Results

- **Stats Cards**: Total counts and percentages
- **User Lists**: Scrollable lists of users
- **Color Coding**: Red for not following back, green for mutual, etc.

## 🔒 Security & Privacy

- All processing happens client-side
- No data is sent to external servers
- Files are processed in memory only
- No persistent storage of user data

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:

```bash
npm run build
```

The `out/` directory contains static files for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Commit with conventional commit format
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **ZIP file not processing**: Ensure the ZIP contains JSON/CSV files with follower data
2. **No results found**: Check that files have "followers" or "following" in their names
3. **Binary data errors**: The tool automatically cleans binary artifacts from files

### Development Issues

1. **Linting errors**: Run `npm run lint:fix`
2. **Formatting issues**: Run `npm run format`
3. **Type errors**: Run `npm run type-check`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [JSZip Documentation](https://stuk.github.io/jszip/)

## 🤖 Instructions for LLMs

LLMs are changing quickly. Always assume that the next dev or LLM working on this file have a new blank context window. As such, follow the following guidelines to the best of your ability:

1. **Read this file before starting**, and once in a while when the context length gets large to refresh yourself.
2. **Document all important information, decisions and instructions** in this file.
3. **If any file seems inconsistent** with what is written here, fix the file or update this file to reconcile the inconsistencies.
4. **Be concise and abstract out common code**, or instructions as needed. Remove unused code, config and instructions.
5. **Split up large files** into groups of smaller files.
6. **Follow best practices and common conventions**.
7. **Do not add comments in the code** unless necessary.

### Project Initial Setup

This section consists of the steps needed to set up for reproducibility and ease of set up of future code repositories:

1. **Install Next.js**

   ```bash
   npx create-next-app@latest
   ```

2. **Install linter and formatter**

   ```bash
   npm install --save-dev prettier
   npm install --save-dev prettier-plugin-tailwindcss
   npm install --save-dev eslint-config-prettier
   npm install --save-dev lint-staged
   npm install --save-dev husky
   npx husky init
   ```

3. **Install shadcn/ui**

   ```bash
   npx shadcn@latest init
   ```

4. **Install additional dependencies**
   ```bash
   npm install jszip
   npx shadcn@latest add button card input
   ```
