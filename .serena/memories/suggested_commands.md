# Suggested Commands for Solid7 Development

## Development Commands

### Primary Development
- `bun run dev` - Start development server with playground
- `bun run build` - Build the library for development
- `bun run build:lib` - Build the library for production/publishing
- `bun run preview` - Preview the built application

### Code Quality
- `bun run typecheck` - TypeScript type checking (no emit)
- `bun run lint` - Lint TypeScript/TSX files in src/
- `bunx tsc --noEmit` - Alternative typecheck command

### Package Management
- `bun install` - Install dependencies
- `bun run check-updates` - Check for 7.css updates
- `bun run update-7css` - Auto-update 7.css and reinstall
- `bun run prepublishOnly` - Prepare package for publishing

### Windows System Commands
- `dir` - List directory contents (Windows equivalent of ls)
- `cd <path>` - Change directory
- `type <file>` - Display file contents (Windows equivalent of cat)
- `findstr <pattern> <files>` - Search in files (Windows equivalent of grep)

### Git Commands
- `git status` - Check repository status
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote repository

### File Operations
- `explorer .` - Open current directory in Windows Explorer
- `code .` - Open project in VS Code
- `mkdir <dirname>` - Create directory
- `copy <source> <destination>` - Copy files