# Pace gets organised 📅

## Running the app

`npm install`

`npm run dev`

To test:
`npm run test`

To generate graphql schema types
`npm run generate`

## Writeup
Overall a fairly straightforward but fun task. It took me some time to think about how to structure the event data but i'd say most of the time I took on this task was spent on CSS and styling.

### What choices did you make and why?
First thing I did was to add types generated from the GraphQL schema using the @graphql-codegen library. I find this useful as you can easily type the response from the api request and have events typed throughout the app.

Next I added TailwindCSS for styling - I like using tailwind especially for apps like this because it's super easy to setup, and removes a lot of the boilerplate needed for other libraries. Although it was hard to do everything I needed with tailwind so I had to pass in some inline styles to certain components (mainly when dynamically calculating height/margin of calendar events).

For testing, because the UI is not interactive, I didn't use react testing library and simply opted for Jest to test the function that groups events together. This is really the only complex bit of logic throughout the app. Typically I would take a more TDD driven approach and use frameworks like react testing library and mock service worker (API mocking) but given the time constraint I opted to just test any complex logic.

The architecture of the app is quite simple, to render the calendar I use a grid, with 48 rows (each 2 rows = 1 hour). Then to calculate where the events appear, first I create a data structure which groups overlapping events together. So I have an array of `EventGroups`, where each `EventGroup` is an array of events. 

I then calculate the height of the calendar based on whatever device is rendering it using a react reference to the element. From the height I can represent the pixel height of 1 minute, and based on that I know where the events will go on the calendar using margin and height css props.


### What challenges did you face?
The hardest parts where creating the data structure that allows for event grouping. My solution will work for any number of overlapping events. Then creating the CSS to place events correctly was difficult. I first attempted to use css grid to place the elements and got it working, but I found it hard to read and it had some unintended consequences like changing the row height on the calendar. So I refactored to just use absolutely positioned divs with margin and height, and this worked better.

### What tradeoffs did you choose?
I think the main thing I wanted to do was finish the task in the given time (or close to it). So as I mentioned I would normally think about things a little differently and write tests as I go, rather than just trying to come up with a solution and then test after the fact. 

Using Tailwind is nice for a quick solution, but it can quickly lead to unnecessary classes being added which can pollute the JSX code.

### What do you like and not like about your solution?
The Good:
* I like the end result and that I managed to complete the task in just over 3 hours
* I like my css grid calendar view

The Bad:
* I think I would like to think a bit more about other possible data structures/patterns to group the events, it works, but it's not the most readable and understandable code. 
* Some of the CSS classes are just sort of thrown in there, it could definitely do with some cleaning up and refactoring.

### What areas would you work on next?

I'd like to add more robust testing. It would be good to test that the events are actually rendered in the correct place on the grid. I think this might be difficult to do - but I think possible by setting a fixed height and working out what the margin/height should be based on that. 

### Feedback

I think the task was fun and made me think about certain things. But i'd say the majority of the time was thinking about styling and CSS. I think for a fullstack role it would be better to have some backend part of the test, adding a graphQL mutation or something like this. And the frontend I think should test more "React" things - like using hooks, re-rendering, state management etc.. Then I could utilise things like TDD and other best practices.