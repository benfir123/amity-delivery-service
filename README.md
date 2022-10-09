# Amity Delivery Service

A small react web application that can compute edge length and possible paths from a weighted directed graph.

[Live Demo](https://benfir123.github.io/amity-delivery-service/) :point_left:

## Features

- [x] compute edge length
- [x] compute possible paths from source to destination

## Technologies used

- [React](https://pl.reactjs.org/)
- [Jest](https://jestjs.io/)

## How to use the app

### Step 1
Click on the demo [link](https://benfir123.github.io/amity-delivery-service/) to open up the app in your browser.
### Step 2
Enter your directed graph in the specified format. (Example: AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1)
### Step 3
Enter a route where you would like to see the delivery cost (Example: A-B-E). Then click submit to show the delivery cost.
### Step 4
Enter in constraints such as start town (source node), end town (destination node), and maximum number of stops. Click submit to show possible paths.

## More about the project

Amity Delivery Service was developed following Test First principles. All the requirements were converted into test cases and code was then refactored to pass said cases. The two main pieces of business logic are the delivery cost function and the possible paths function. The delivery cost function simply looks up the cost associated with each sub-route that the user specified similar to VLOOKUP in Excel. On the other hand, the possible path function uses the Depth-first search (DFS) algorithm in the form of a JavaScript generator function to explore the graph as far as possible before backtracking due to reaching the end or meeting constraints.
