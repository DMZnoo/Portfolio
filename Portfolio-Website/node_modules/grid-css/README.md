# [Grid](http://grumpywizards.github.io/Grid/)
Simple grid for flexible layouts.

Uses [flexbox](http://caniuse.com/#search=flex) to produce flexible easy to use classes for rows and columns.

There are 2 versions of Grid. A modern version and one with -prefixes- for better browser support.

## Contents
  1. [Install](#install)
  1. [Basic grid](#basicgrid)
  1. [Nesting](#nesting)
  1. [Widths](#widths)
  1. [Offsets](#offsets)
  1. [Wrapping](#wrapping)
  1. [Vertical alignment](#vertical-alignment)
  1. [Responsiveness](#responsiveness)
  1. [Utility classes](#utility)
  1. [Credits](#credits)

## How to use

### <a name='install' href='#'>Install</a>

`bower install wiz-grid`

or

`npm install grid-css --save`


### <a name='basicgrid' href='#'>Basic grid</a>

    .grid {
      display: flex;
    }
    .cell {
      flex: 1;
      box-sizing: border-box;
    }

#### Example

    <div class="grid">
      <div class="cell">first</div>
      <div class="cell">second</div>
      <div class="cell">third</div>
    </div>

This will create a simple flexible row of cells.

    -------------------------------------
    | first    | second     | third     |
    -------------------------------------

### <a name='nesting' href='#'>Nesting</a>

You can nest grids inside cells with relative ease...

#### Example

    <div class="grid">
      <div class="cell">
        <div class="grid">
          <div class="cell">first</div>
          <div class="cell">second</div>
        </div>
        <div class="grid">
          <div class="cell">third</div>
          <div class="cell">fourth</div>
        </div>
      </div>
      <div class="cell">fifth</div>
    </div>

Little complicated to explain. This is what it should produce:

    -------------------------------------
    | first      | second     | fifth   |
    --------------------------|         |
    | third      | fourth     |         |
    -------------------------------------

### <a name='widths' href='#'>Widths</a>

    .cell-width-20 {
      flex: 0 0 20%;
    }

#### Example

    <div class="grid">
      <div class="cell cell-width-20">first</div>
      <div class="cell">second</div>
      <div class="cell">third</div>
    </div>

In this example the first cell is 20% the width of the grid, the other two share the remaining space equally.

    -------------------------------------
    | first        | second   | third   |
    -------------------------------------


### <a name='offsets' href='#'>Offsets</a>

    .cell-offset-20 {
      margin-left: 20%;
    }

#### Example

    <div class="grid">
      <div class="cell cell-width-10">first</div>
      <div class="cell cell-width-10 cell-offset-80">second</div>
    </div>

Adding `cell-offset-80` will add a `margin-left: 80%` to the cell, pushing it right.

    ---------                  ----------
    | first |                  | second |
    ---------                  ----------


### <a name='wrapping' href='#'>Wrapping</a>

    .grid-wrap {
      flex-wrap: wrap;
    }

#### Example

Here we have 2 cells, 50% and 66.6666% wide, but the grid is only 100% wide...

    <div class="grid">
      <div class="cell cell-width-50">first</div>
      <div class="cell cell-width-66">second</div>
    </div>

this means the cells are now in control and have broken out of their confinment!

    <div class="grid grid-wrap">
      <div class="cell cell-width-50">first</div>
      <div class="cell cell-width-66">second</div>
    </div>

Adding `grid-wrap` will push the second cell down under the first cell.

    -------------------
    | first           |
    -------------------
    -----------------------
    | second              |
    -----------------------

**Why not just make this default behaviour?** Leaving this option to the developer provides more flexibility.


### <a name='vertical-alignment' href='#'>Vertical alignment</a>

    /* All cells */
    .grid-top {
      align-items: flex-start;
    }
    .grid-center {
      align-items: center;
    }
    .grid-bottom {
      align-items: flex-end;
    }

    /* Individual cells */
    .cell-top {
      align-self: flex-start;
    }
    .cell-center {
      align-self: center;
    }
    .cell-bottom {
      align-self: flex-end;
    }

#### Example

    <div class="grid grid-bottom">
      <div class="cell cell-top">first</div>
      <div class="cell cell-center">second</div>
      <div class="cell">third</div> <!-- grid-bottom pushes this to the bottom -->
      <div class="cell">fourth
        <br>fourth
        <br>fourth
        <br>fourth
        <br>fourth
        <br>
      </div>
    </div>

Notice there are two vertical aligment rules being applied to this grid. A grid wide rule of `grid-bottom` that pushes everything to the bottom, and per cell alignment rules of `cell-top` and `cell-center` that vertically align the cells to the top and center of the grid respectively.

    ------------                        -------------
    | first    |                        | fourth    |
    ------------                        |           |
                                        | fourth    |
                -------------           |           |
                | second    |           | fourth    |
                -------------           |           |
                                        | fourth    |
                            -------------           |
                            | third     | fourth    |
                            -------------------------

### <a name='responsiveness' href='#'>Responsiveness</a>

    @media (min-width: 24em) and (max-width: 48em) {
      .grid-medium-fit > .cell:not([class*="cell-width"]) {
        flex: 1;
      }
      .grid-medium-full {
        flex-wrap: wrap;
      }
      .grid-medium-full > .cell {
        flex: 0 0 100%;
        margin-left: 0;
      }
    }

#### Example

Let's make this grid thing respond to different screen sizes...

    <div class="grid grid-small-full grid-medium-fit grid-large-full">
      <div class="cell cell-top">first</div>
      <div class="cell cell-center">second</div>
      <div class="cell">third</div> <!-- grid-bottom pushes this to bottom -->
      <div class="cell">fourth
        <br>fourth
        <br>fourth
        <br>fourth
        <br>fourth
        <br>
      </div>
    </div>

- `.grid-small-full` this rule makes the cells full width but only when the screen is small
- `.grid-medium-fit` makes the cells share the space, but only for medium screens
- `.grid-large-full` turns it all into columns again


### <a name='utility' href='#'>Utility classes</a>

There are some handy "make visible when small" and "hide when large" rules for you to play with.

    .visible-small {
      display: none;
    }
    .hidden-medium {
      display: none;
    }
    .hidden-large {
      display: none;
    }
    
