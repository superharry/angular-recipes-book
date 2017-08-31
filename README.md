# AngularRecipesBook

A project created for Maximilian Schwarzmüller's wonderful [Angular 4 Course](https://www.udemy.com/the-complete-guide-to-angular-2/l)

## Live Demo

Hosted on [Amazon S3](http://angular-recipes-book.s3-website-us-east-1.amazonaws.com/); an auth guard will make everything blank at first; sign in to see data; for a test account, either [create one](http://angular-recipes-book.s3-website-us-east-1.amazonaws.com/signup) or use:

* username: a@a.com
* password: aaaaaa

## Notable Features

* **Forms & Validation** Selected reactive forms approach; used `novalidate` attribute on `<form>` tags to prevent browser default validation behaviors; used angular's built-in `FormBuilder` service to make working with reactive forms easier; the image preview feature (when adding/editing recipes) is enhanced with a custom URL validator; form submit buttons everywhere have their `disabled` properties bound with `form.valid`;
* **Typeahead** `Observable.scan(...)` is used in combination with ngrx Store to provide typeahead suggestions when working with ingredients;
* **Ngrx Store and Effects** A more readable way of handling `token` in the Firebase auth params interceptor; both **recipes** and **shopping list** are saved; readable effects chaining (for example, user log in will also trigger a data load action; and a successful data load will then trigger **both** set recipes **and** set shopping list actions); and
* **Modules** the app is broken down into feature modules (including a core module) and a shared module; Routing modules are broken down based on feature modules also.