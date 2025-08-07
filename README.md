## Important notes:

This project was built using:

- Debian GNU/Linux 12 (bookworm)
- PostgreSQL v15.13
- Ruby v3.2.2
- Ruby on Rails v8.0.2
- Node v22.13.0

## Setup instructions:

### STEP 0

Download this repository into your local computer.

```
git clone https://github.com/KarlHeitmann/task_management_system
```

### Backend

Open a terminal and navigate to the backend folder:

```
cd library_management_system_backend/
```

Install dependencies:

```
bundle install
```

Create, migrate and seed the database:
```
bundle exec rails db:create
bundle exec rails db:migrate; RAILS_ENV=test bundle exec rails db:migrate
bundle exec rails db:seed
```

**NOTE**: you need to setup the jwt_secret value.
Run this command in your terminal:
```
bundle exec rails secret
```

Copy the output string into your clipboard, run this command:

```
bin/rails credentials:edit
```

And add the key-value pair in your editor

```
jwt_secret: <your random generated secret>
```

Save and exit, you're ready to continue

**NOTE** you may have notices I use `bundle exec`, I have it aliased to `be` command so it is
not long to type. I've seen people often use `bin/rails`, but I have not seen any problems with
this old fashioned method.


```
bundle exec rspec spec
```

You should see everything is OK. Now it is time to run the rails server


```
bundle exec rails server
```

Backend server is up and running on port 3000

### Frontend


**Pro tip:** use [nvm](https://github.com/nvm-sh/nvm) to manage your node versions like me :)

Open a terminal and navigate to the frontend folder:

```
cd library_management_system_only_react/
```

Install dependencies
```
npm install
```

Run the project

```
npx nx dev library_management_system_only_react
```

Frontend development server is up and running on port 4200

## Usage

Visit `http://localhost:4200/` on your web browser. If you run into any errors, just refresh the page. It may be a cookie
it is bothering.
The credentials are:
- To login as a *member:* email: "member@example.com", password: "asdasd"
- To login as a *librarian:* email: "librarian@example.com", password: "asdasd"
**NOTE:** You can corroborate it by viewing the credentials inside the seed file: `library_management_system_backend/db/seeds.rb`,
line 12 and 15

The frontend don't use any router at all. Is everything *literally* built into a single page app, with all the specifications
written in the exercice.
I think the seeded data and the web interface makes the application very intuitive. If you log in as a member or as a librarian
you will see the member or librarian dashboard with the lists and stats written on the specs at the top of the page. Both
types of users will see a books list below.

Members will have all buttons disabled, they will only be able to borrow a book from the list.
Librarians will have all CRUD actions enabled, they will have disabled the "borrow" buttons, but they will have enable
the "return" button for the books they can return.

The first days of the challenge I was struggling with authorization: should I use omniauth? Or devise? I attempted to do
something, but there were a lot of decisions to made. I think they are beyond the scope of this exercise. So I dropped this
approach and decided to go with a simple encrypted Bearer token on the header. I know this is very insecure, but the instructions
don't say anything about security. However, this insecure method is useful to show the way I fix the authorization problems
by myself.

The philosophy behind all this exercise is: use as few dependencies as possible.

About the tests, I'd have liked to have had time to do tests on Cypress. Sadly, it was not possible to do. I don't have
any tests at all for the frontend. But the backend is well tested.

My books_controller is very important for the application, it does a lot of things, and it is responsible to call
the right methods to borrow and return books depending on whether the user is a member or a librarian. That's the reason
its corresponding test file: `library_management_system_backend/spec/requests/books_spec.rb` has nearly 500 lines. This
test file contains shared examples, and simulates requests done by members, librarians and anonymous people.

I have followed a "fractal" approach to develop the frontend code. By inspecting the code, you'll discover the codebase
not only grows vertically (in number of files), but it grows horizontally: it has folders and nested folders. You can know
more about this fractal approach by reading this article I wrote on an [old blog entry of my blog](https://karlheitmann.github.io/karlheitmann_legacy/estudios/fractal_refactorization_methodology.html)

TODO: Right now I don't have much time left, but if possible I will record a screencast doing a walkthrough of the app and will
paste the link here.





