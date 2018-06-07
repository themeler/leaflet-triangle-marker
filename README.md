Leaflet TriangleMarker
================

Draw vector triangles using fast Canvas renderer (SVG renderer not supported for now) on Leaflet map. TriangleMarker is isosceles triangle with given width and height, top pointed (can be rotated).

L.TriangleMarker is based on L.CircleMarker, extension to L.Path which from inherits options and methods.

Usage
================

All options are optional as in CircleMarker, LatLng is required. Other, non listed options, events and methods inherited as in CircleMarker (from Path, Interactive layer and Layer) .

#### Creation and options

```js

var // example data
    renderer = L.canvas(),
    latLng = L.latLng(50.671062, 17.926126)
    // example marker
    myTriangleMarker = L.triangleMarker(latLng, {
        renderer: renderer, // your canvar renderer (default: L.canvas())
        rotation: 45, // triangle rotation in degrees (default: 0)
        width: 12, // width of the base of triangle (default: 24)
        height: 8, // height of triangle (default: 24)
    }))
```

#### Methods

Triangle specific methods.

```js
// rotation
myTriangleMarker.setWidth(90) // set new width in px
myTriangleMarker.getWidth() // get current width in px
// width
myTriangleMarker.setHeight(90) // set new height in px
myTriangleMarker.getHeight() // get current height in px
// height
myTriangleMarker.setRotation(90) // set new rotation in deg
myTriangleMarker.getRotation() // get current rotation in deg
```

Compatibility
================

Created and tested on Leaflet 1.3.1
