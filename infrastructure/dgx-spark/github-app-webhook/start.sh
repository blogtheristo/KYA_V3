#!/bin/bash
cd "$(dirname "$0")"
npm install
PORT=8080 node app.js