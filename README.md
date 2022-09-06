
# Content Management System for English Deck 

I wanted a content management for the site which would allow me to update it with a single click, while providing all the data that was needed for the interactive elements on the site, such as the flashcards and quizzes. My solution was to build a CMS with sections corresponding to individual components in the React app. This also allowed me complete control over the structure of the database.

I started with a clear idea that I wanted individual components to update a single object which was accessible to their common parent so that all of the data could be uploaded to the database (or edited) with a single click. By keeping the app modular in this way, I hope to easily be able to scale the CMS to the needs of the website, which is something I plan to continue working on, adding more interactive elements which will have their own corresponding sections in the CMS.




## Challenges


The app is relatively simple so there weren’t too many technical challenges that I came across during the build. However, I was surprised by how much thought had to go into designing the functionality. Some questions I had to ask were: Should section edits be saved automatically or require manual saves? When does it make sense to add a tab system as opposed to displaying all the information on the page in a list? What kind of feedback should users get when updating, saving and deleting elements?
## Lessons

Since finishing the functionality of the app and using it to update my site, I realise that I got some of the answers to those questions wrong. Users are required to manually save edits to the vocabulary section, which feels clunky in practice. It also doesn’t feel like there is enough feedback to indicate successful saves on edit. Although these are not huge changes to make, I do wish I had spent a little more time testing out the user experience while making that section, and it’s certainly something I will start doing more of when working on future builds.
## Features

- Create, edit and delete articles
- Upload pictures
- Tab system for adding vocabulary
- Create quiz items

