## Requirements
- Docker

## To start the application: - 
- First go and clone this repo as well as the messaging server repo for the messaging server <a>https://github.com/mohit-sankhla2002/brobase-messaging-system</a>.
- Go into this repo
- run ```npm run dev```
- While keeping this application running, we need to start the mesaaging system now. For that go into the repo, and run ```npm run redis && npm run dev```

## TODO: 
- [ ] Create friends in the db
- [ ] Create friend requests system in the app
- [ ] Create a kafka queue as a cache before the db
