# Task Completion Checklist

## Before Completing Any Task

### Code Quality Checks
1. **TypeScript Validation**: Run `bun run typecheck` to ensure no type errors
2. **Linting**: Run `bun run lint` to check code style and catch potential issues
3. **Build Test**: Run `bun run build` to ensure the library builds successfully

### Testing Procedures
1. **Playground Testing**: Run `bun run dev` and test changes in the playground
2. **Component Testing**: Verify component functionality and appearance
3. **Cross-browser Testing**: Test in different browsers if UI changes made

### Code Standards Verification
1. **Import Organization**: Ensure proper import structure and no unused imports
2. **Class Usage**: Verify `cn` utility is used for class management instead of direct concatenation
3. **TypeScript**: Confirm all props are properly typed and interfaces defined
4. **Accessibility**: Check ARIA attributes and semantic HTML usage

### Documentation Updates
1. **README**: Update examples if new features added
2. **Component Documentation**: Add JSDoc comments for new components/props
3. **CHANGELOG**: Document significant changes

### Pre-commit Checks
1. **File Organization**: Ensure files are in correct directories
2. **Naming Conventions**: Verify PascalCase for components, camelCase for props
3. **Export Verification**: Confirm new components are exported in index files
4. **Dependency Updates**: Check if 7.css updates are needed

### Known Issues to Address
- NavBar styling issues
- Window StatusBar positioning problems
- Navigation component breakage
- Tab functionality issues
- Missing/broken components: Balloon, ListView, Vertical Slider, ProgressBar classes, Scrollbar, TextBox variants, TextArea, TreeView, Dialog, Modal
- Main Windows buttons functionality

### Final Validation
1. **Library Build**: Run `bun run build:lib` for production build
2. **Type Declarations**: Verify .d.ts files are generated correctly
3. **Package Integrity**: Confirm dist/ contains all necessary files