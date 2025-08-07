Hi!

Sadly, I finished right now the main exercise, and didn't have much time to use in this "Generative AI tools" request.

On the other side, this exercise was written based in an initial prompt to Chat GPT, and then I tweaked it to solve the exercise.

The reason why I asked Chat GPT a boilerplate was because I don't have much experience writing from scratch an application with
a separate backend in Ruby on Rails and a frontend in React. When I have worked with this stack, I've worked with the frontend
written in React embedded in a Rails application (with esbuild, for example). So things are quite different than what was
requested here.

However, I know this is a solution many people use, so LLMs should be well trained to generate this kind of code.

This was the initial propt I gave to GPT:

```
I am working in a application with separate frontend and backend. Backend is written in Ruby on Rails only API mode, and frontend is written in React. Write me the steps to create authentication using devise gem and omniauth with Google.
```

But there were a lot of mistakes done by GPT. You can see my attempts to have google auth in these two branches: `oauth_1` and `oauth_with_devise`.

The reasons these mistakes happened are OMNIAUTH protocol is very flexible, and there are many solutions you can implement. There are
many different gem versions. What will you do with Rails CSRF token? If you have your frontend embedded in Rails it is more simple to use it,
but if you have a completely separate frontend then perhaps you have another security solution you'd rather implement.

This divergence confuses GPT if it does not have a clear and big context. I know I could have used Claude Code or another paid LLM.
But right now I don't have much money, and each one of this requests are cents that are being spent. I hope you understand me, if you
want to discuss it further on the matter, I would be happy to do it.
