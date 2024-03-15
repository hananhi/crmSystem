#!/bin/bash

# Start the server
cd Server
npm install
node server.js &
cd ..

# Start the client
cd Client
npm install
npm run dev
