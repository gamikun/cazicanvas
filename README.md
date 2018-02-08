# cazicanvas
HTML CANVAS prototype extension native-like functions.

![alt text](https://github.com/gamikun/cazicanvas/raw/master/demo.png)

# Available functions

## Circles
A simpler way of drawing circles.

* circle(x, y, radius)
* **strokeCircle**
* **fillCircle**
* **modelCircle**. Draw the limits of a circle in the screen.

## Rounded corner rectangle

* roundedRect
* strokeRoundedRect
* fillRoundedRect

## Starts

* star
* fillStar
* strokeStar
* modelStar

## Utils

* **iterateCircumference**. given a center x and y, a radius and number of positions, you get a list of generated positions that correspondes to equidistant spots around an imaginary circle.
* **iterateLine**. Given a point A and a B, you get all the posible positions (pixels) between them without leaving empty spaces.

## Others

* **strokeGrid**. Adds a grid with specified dimensions.
* **chess**. Adds a chess pattern, given dimensions and two different colors.