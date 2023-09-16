// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="login">
        <Set wrap={MainLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/categories" page={CategoryCategoriesPage} name="categories" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Records" titleTo="records" buttonLabel="New Record" buttonTo="newRecord">
          <Route path="/records/new" page={RecordNewRecordPage} name="newRecord" />
          <Route path="/records/{id:Int}/edit" page={RecordEditRecordPage} name="editRecord" />
          <Route path="/records/{id:Int}" page={RecordRecordPage} name="record" />
          <Route path="/records" page={RecordRecordsPage} name="records" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Categories" titleTo="categories" buttonLabel="New Category" buttonTo="newCategory">
          <Route path="/categories/new" page={CategoryNewCategoryPage} name="newCategory" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Tasks" titleTo="tasks" buttonLabel="New Task" buttonTo="newTask">
          <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
          <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
          <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />
          <Route path="/tasks" page={TaskTasksPage} name="tasks" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Repeats" titleTo="repeats" buttonLabel="New Repeat" buttonTo="newRepeat">
          <Route path="/repeats/new" page={RepeatNewRepeatPage} name="newRepeat" />
          <Route path="/repeats/{id:Int}/edit" page={RepeatEditRepeatPage} name="editRepeat" />
          <Route path="/repeats/{id:Int}" page={RepeatRepeatPage} name="repeat" />
          <Route path="/repeats" page={RepeatRepeatsPage} name="repeats" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
