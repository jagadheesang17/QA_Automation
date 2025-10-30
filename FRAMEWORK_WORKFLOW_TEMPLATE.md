# Test Automation Framework Workflow Template

## Standard Process for Creating New Test Scenarios

### Step 1: Connect & Login
- Connect MCP Playwright server
- Login to ExpertusONE admin portal using appropriate credentials
- Navigate to target module/functionality

### Step 2: Analyze Existing Framework Structure
- **Check existing page objects** for relevant methods
- **Analyze inheritance hierarchy** (PlaywrightWrapper → base pages → specific pages)
- **Review existing selectors and methods** in related page classes
- **Identify reusable utilities** (FakerData, CSV data, fixtures)

### Step 3: Method Validation Process
- **FIRST**: Check if required methods already exist in existing page objects
- **IF EXISTS**: Use existing methods - DO NOT recreate
- **IF MISSING**: Create new methods in appropriate existing page class
- **VALIDATE**: Manually test the workflow to confirm methods work correctly

### Step 4: Implementation Strategy
- **Use existing framework patterns**:
  - Import `expertusFixture` for dependency injection
  - Follow established naming conventions
  - Use `FakerData` for dynamic test data generation
  - Implement proper error handling and assertions
- **Create test file** following existing structure in `/tests/admin/` directory
- **Add multiple test scenarios** (positive, negative, edge cases)

### Step 5: Framework Extension Rules
- **Add methods to existing page objects only** - don't create new page classes unless absolutely necessary
- **Follow existing selector patterns** (XPath for complex elements, CSS for simple ones)
- **Maintain inheritance structure** - add methods to most specific applicable page class
- **Document new methods** with clear purpose and parameters

## Key Framework Components to Leverage

### Page Objects Hierarchy
```
PlaywrightWrapper (base)
├── AdminLogin
├── AdminHomePage  
├── LocationPage
├── [Other Admin Pages]
```

### Fixtures & Utilities
- `expertusFixture.ts` - Dependency injection
- `FakerData.ts` - Dynamic test data
- CSV data files in `/data/` directory
- `playwright.config.ts` - Environment management

### Standard Test Structure
```typescript
import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/FakerData';

test.describe('Module Name Tests', () => {
  test('Scenario Description', async ({ adminHome, specificPage }) => {
    // 1. Login & Navigation
    await adminHome.loadAndLogin("ROLE");
    
    // 2. Use existing methods first
    await specificPage.existingMethod();
    
    // 3. Add new methods only if needed
    await specificPage.newMethodIfRequired();
    
    // 4. Assertions
    await specificPage.verifyExpectedResult();
  });
});
```

## Validation Checklist
- [ ] Existing methods identified and catalogued
- [ ] Manual workflow tested successfully  
- [ ] New methods added to appropriate page objects
- [ ] Test file follows framework patterns
- [ ] Multiple scenarios covered
- [ ] Proper assertions implemented

## Example Usage
When creating tests for ANY new functionality:
1. "Connect MCP server and login"
2. "Analyze existing framework structure for [MODULE_NAME]"  
3. "Create test scenarios using existing framework methods, add new methods only if required"
4. Validate manually first, then create automated tests

This ensures consistency, reusability, and maintains the integrity of the existing framework architecture.