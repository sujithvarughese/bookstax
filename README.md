This app allows the user to search for books based on genre, and will use the OpenLibrary Subject API to return results based on user search. User can view the search results and will be provided links to preview the book, and to get more information/reviews. The user can choose to add the book to myLibrary.

In myLibrary, the user will have basic book information along with the ability to create and edit notes. The user can organize the notes in any way (chapter, topic, subject, etc).

----------------------------------------------------
// dev notes
React router will use Root.jsx as the "/" path and render Landing as default
Landing page -> visuals and brief About section; access to Login and Register pages

Library -> will use loader to fetch and load user's library and data before load
Each book will have the link "/library/_id" (based on _id assigned from mongoDB)

Discover -> will use loader to fetch from OpenLibrary API (default to editor's picks)

### Application Details
* MERN Stack
* Integrated API from OpenLibrary to search books by subject
* User can view preview of the book or get reviews straight from the search, then can choose to add book to library
* Automatically recommends books of similar genres in user’s library
* Rate books, create notebook to record thoughts or take notes