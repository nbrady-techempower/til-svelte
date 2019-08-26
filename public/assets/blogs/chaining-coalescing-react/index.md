When ES6 was released in 2015, it breathed new live into JavaScript. Since then,
the language continues to evolve, introducing modern features every year. It's
been a lot more fun to pay attention to proposals to TC39, the committee that
approves new language features.

_Quick Note_: ECMAScript is a standard. JavaScript is one implementation of the
ECMAScript standard.

Two features that were just moved up in the approval process are
[Optional Chaining](https://github.com/tc39/proposal-optional-chaining)
and [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing).

I'm mostly going to concentrate on how these new standards will help clean up
your React code, but the examples will be easy enough to follow.

### Optional Chaining

Here's an example of how it works. Let's assume you're getting some data from
an API that you expect to have the following shape:

```javascript
data = {
  board: {
    title: "Welcome Board"
  }
}
```

To access the title, you'd simply do: `data.board.title`. You may have a simple
React component with some JSX that looks like this:

```jsx harmony
<div>
  {data.board.title ? 
    (<div className="title">{data.board.title}</div>)
    : (<div>Loadiing...</div>)
  }
</div>
```

You're asking React to display the title if it exists or show some Loading
text. The problem here is that if the `board` property is `undefined` because
the response hasn't come back from the server, or it's a different shape that
might include an error message, your App will throw an error. You know the one:
`TypeError: Cannot read property 'title' of undefined`. You might rewrite
that snippet like this:

```jsx harmony
<div>
  {(data.board && data.board.title) ? 
    (<div className="title">{data.board.title}</div>)
    : (<div>Loadiing...</div>)
  }
</div>
```

Now we're making sure `board` is defined before accessing the title. Optional
chaining allows us to do this with one new operator: `?`.

```jsx harmony
{data.board?.title ? (...)}
```

If `board` is `null` or `undefined` the expression while evaluate to `undefined`
instead of throwing an error. Imagine a deeper structure like:

```javascript
data.user.profile.optionalSettings.colorScheme
```

Maybe you're working with an API that will only return the `profile` property
if the user has set it up, and `optionalSettings` if they've set any. Now you
can do:

```javascript
const colorScheme = data.user.profile?.optionalSettings?.colorScheme;
```

`colorScheme` will simply be `undefined` if `profile` or `optionalSettings`
don't exist. This is a lot cleaner than something like:

```javascript
let colorScheme;
if (data.user.profile && data.user.profile.optionalSettings) {
  colorScheme = data.user.profile.optionalSettings;
}
```

Theoretically (_I haven't seen benchmarks_) the former will also be faster, as
you won't have to access object properties multiple times.

Another fun "Reactism" this solves is having to check if an array exists
before mapping over it in JSX.

```jsx harmony
<div className="items">
  {data.items?.map((item, idx) => (
    <div className="item" key={idx}>
      {item.name}
    </div>
  ))}
</div>
```

Now, if `items` doesn't exist, instead of trying to `map` over an `undefined`
and throwing an error, the whole expression will evaluate to `undefined` and
React simply won't add anything to the DOM.

### Nullish Coalescing

This next proposal is a lot simpler than its name. It introduces the nullary
coalescing operator: `??`. If anything on the left-hand side of this operator
is `null` or `undefined` than the right-hand side is returned.

```javascript
const defaultTitle = data.title ?? "No Title!";
```

The real power here comes when we combine it with optional chaining.

```javascript
const colorScheme = data.user.profile?.optionalSettings?.colorScheme ?? "blue";
```

Let's imagine a scenario where you're getting the cost of an item from the API.
If the cost is `0` the item is free, but if the cost hasn't been defined, you
want it to be $5. You might think of doing something like this:

```javascript
const cost = data.item.cost || 5;
```

But there's a logical error here. If the cost is `0`, the expression above
evaluates to `5` which is not what we want. Because the nullary coalescing
operator returns the right-hand side of the equation if the left-hand side
evaluates to **ONLY** `null` or `undefined` **NOT** other falsy values, it's
what we want:

```javascript
const cost = data.item.cost ?? 5;
```

You can do the same when you want, for instance, a default title but you want
to allow an empty string if that's what's returned from the API:

```javascript
const title = data.title ?? "Needs a Title!";
```

### Try it Yourself

I've begun using these new features in some of my codebases and love how much
code I've been able to clean up. These are currently only Stage 3 proposals, but
that generally means they'll be added to the standard soon. At this stage,
[they're normally included in create-react-app](https://github.com/facebook/create-react-app/pull/7438).
You can also add them yourself with
[Babel](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining).
