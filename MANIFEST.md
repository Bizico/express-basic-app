# This is Node Project Manifest

## Project structure and files

* Required files:
  ```
  .gitignore
  .editorconfig
  ```
* Organize your Files Around `Features`, Not `Roles`.
* Don't Put Logic in `index.js` Files.
* Try to test. Amount of test: `Unit Tests` > `Integration Tests` > `End-to-End Test`.
* Place your test files next to the tested modules using some kind of naming convention, like `<module_name>.spec.js` and `<module_name>.e2e.spec.js`

## Git

* Use GitFlow.
* Name branches in kebab-case: `some-new-brand-feature`.
* Try to make commit message as understandable as it possible.
* Commit message must be in `Present Simple`.

## Editorconfig

* Indent Style: `space`
* Indent Size: `2`
* Charset: `utf-8`
* Trim Trailing Whitespace: `true`
* Insert Final New Line: `true`
* End Of Line: `lf`
* Max Line Length: `80`

## Code Style

* Don't use `var`.
* Don't use `reserved` words as keys, variables name and etc. Use readable synonyms in place of reserved words.
* Avoid `single` letter names. Be descriptive with your naming.
* `Semicolons` **are** required.
* Constants should be named in `ALL_UPPERCASE` separated by underscores.
* One variable per declaration.

  ```
  // bad
  let a = 1, b = 2, c = 3;

  // good
  let a = 1;
  let b = 2;
  let c = 3;
  ```

* Use the literal syntax for `Object`/`Array`/`Regex` creation.

  ```
  // bad
  var item = new Object();

  // good
  var item = {};
  ```

* Use `dot` notation when accessing properties if it's possible.

  ```
  // bad
  me['name'];

  // good
  me.name;
  ```

* Recommended to use arrow-functions instead of old school.

  ```
  //bad
  function(){};

  // good
  () => {};
  ```

* Use template strings instead of concatenation `Like ${this}.`

* **Never** do horizontal alignment.

* Use `async` - `await`.

## To QA:

After developer has finished task, he/she should perform dev testing. Dev testing have to contain such scenarios:

* Permissions (according to task)
* Validations (according to task)
* Positive business logic cases. And negative if the task contains such logic
* General compliance of the task with the СR acceptance criterias
* UI elements, fonts, sizes and effects should be according to design.
* App should work stable
* Moreover dev should test neighbouring logic that can be affected by the implementation of the task.

After that developer should merge this task to dev branch and test that CI system has successfully build it.

Only after these checks software engineer can change status of the task to “QA”.
