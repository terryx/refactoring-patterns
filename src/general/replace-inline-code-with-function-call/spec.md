# Replace Inline Code with Function Call

## Guideline

- **Replace Inline Code with Function Call**: Always use existing functions instead of duplicating their logic inline

## Example: Date Formatting

```javascript
// Before
function displayUserInfo(user) {
  const date = new Date(user.createdAt)
  const formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  return `User ${user.name} joined on ${formatted}`
}

// After
function displayUserInfo(user) {
  const formatted = formatDate(user.createdAt)
  return `User ${user.name} joined on ${formatted}`
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
```

## Motivation

When you find yourself writing code that duplicates the behavior of an existing function, replace that inline code with a call to the existing function. This is the DRY (Don't Repeat Yourself) principle in action.

- **Single Source of Truth**: When logic exists in one place, changes only need to be made once instead of tracking down all duplicates
- **Consistency**: Using the same function everywhere ensures consistent behavior across your codebase
- **Bug Fixes Propagate**: When you fix a bug in the function, all call sites benefit immediately
- **Easier Testing**: Functions can be tested independently and thoroughly, giving confidence to all call sites
- **Readability**: Well-named functions communicate intent better than inline implementation details
- **Maintenance**: Future developers don't need to verify that multiple copies of the same logic are identical

## Mechanics

- Identify inline code that duplicates the behavior of an existing function
- Verify that the existing function produces the same result for the same inputs
- Replace the inline code with a call to the existing function
- Pass any necessary parameters to the function
- Test to ensure the behavior is preserved
- Remove any variables that are no longer needed after the replacement
