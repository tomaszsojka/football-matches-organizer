# football-matches-organizer
Project of web application for organization of amateur football matches and leagues. App supports communication between people interested in playing amateur football.

<!-- INFO -->
## 1. Info

The application was created as part of an engineering thesis. The /doc folder contains a brief presentation of the application, without going into the inner, technical details. The head folder contains the backend part, and the /fmo-front-reactjs folder contains the frontend part.

## 2. Screenshots of the app running

| ![login page](https://github.com/tomaszsojka/football-matches-organizer/blob/main/screenshots/login.png?raw=true) |
|:--:|
| *Login page* |

| ![forum PC view](https://github.com/tomaszsojka/football-matches-organizer/blob/main/screenshots/globalForum.png?raw=true) |
|:--:|
| *Main forum* |

| ![teams mobile view](https://github.com/tomaszsojka/football-matches-organizer/blob/main/screenshots/teams.png?raw=true) |
|:--:|
| *List of user's teams, creating a new team (mobile view)* |

|![calendar PC view](https://github.com/tomaszsojka/football-matches-organizer/blob/main/screenshots/calendar.png?raw=true) |
|:--:|
| *Calendar* |

| ![adding a match](https://github.com/tomaszsojka/football-matches-organizer/blob/main/screenshots/matchAdd.png?raw=true) |
|:--:|
| *Adding a new match into the calendar* |

| ![contact and profile pages mobile view](https://github.com/tomaszsojka/football-matches-organizer/blob/main/screenshots/contactProfile.png?raw=true) |
|:--:|
| *Contact and profile page (movile view)* |

| ![navbar mobile view](https://github.com/tomaszsojka/football-matches-organizer/blob/main/screenshots/navbar.png?raw=true) |
|:--:|
| *Navbar (dropdown mobile and PC)* |
<!-- FUNCTIONALITIES -->
## 3. Implemented functionalities

With the app, players can communicate on a global forum. The forum is available to all users. It allows the user to search for a new team. For example, a person who would like to get together from time to time to play soccer, but does not know anyone who is interested in doing so, will be able to ask if there is a group of people (team) that is missing players. The players of the team interested in taking on a new person can reply on the forum or send that person an invitation to join their team. The situation could be reversed, in which the team is looking for a player, and the recipients would be people willing to join the team. Since this is amateur soccer, players are not tied to only one team and each player can join multiple teams. The reason for a player to join more than one team may be the desire to increase the number of games per week or the lack of a permanent home location. 

Being a member of a team, one has access to its forum. Its main purpose is to provide an opportunity for communication between team players. Players can write on any topics they would like to discuss with team members. They can propose a date and time for a meeting or summarize the course of past matches. 

Each player has access to the team's calendar, where they can add an event - a training. A training is a meeting in which players from one team can participate. Once added, it appears in the team's calendar, in cells with a predetermined date and time. 

Any player can create a new team. After creating a team, the player becomes its captain and gets additional privileges to manage the created. He has the ability to invite players to the team, add an event - a match to the calendar, and sees incoming match invitations from other teams (profile page). When adding a match to the calendar, the captain decides with which team he wants his team to play with. If the team exists in the system, a match invitation will be sent to its captain. If accepted, the event will appear in the calendar of both teams. The option to create a new team may be of interest to person who is already in a group of people with whom he plays every day, but would like to facilitate communication with its members or seek new challenges in the form of matches with other teams from the system. 

<!-- FRAMEWORKS -->
## 4. Frameworks

The application is developed according to the SPA approach. The backend of the application is created using the Node.js environment and the Express.js framework. The frontend of the application is created using React and Redux libraries. The application data is stored in a NoSQL database -- MongoDB. 

Most of the cascading style sheets were created from scratch. By using the built-in Media Queries functionality, responsive view to the size of screens and type of devices was achieved. The CSS Flexbox Layout module was also used, which allowed for easier organization of objects and worked well with Media Queries.
