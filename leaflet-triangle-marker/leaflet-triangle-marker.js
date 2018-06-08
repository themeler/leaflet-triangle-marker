/**
 * Leaflet triangle marker plugin for canvas renderer (renderer extension included)
 * https://github.com/themeler/leaflet-triangle-marker/tree/master/leaflet-triangle-marker
 * @author      Przemysław Melnarowicz
 */


/**
 * Extend Canvas protype for triangle update handler
 */
L.Canvas.prototype._updateTriangle = function (layer) {
    var p, ctx, w, h

    if (!this._drawing || layer._empty()) return null

    p   = layer._point
    ctx = this._ctx
    wh  = layer._width / 2
    hh  = layer._height / 2
    // rotation angle from deg to rad
    r   = layer._rotation !== 0 ? layer._rotation * (Math.PI * 2) / 360 : 0

    this._drawnLayers[layer._leaflet_id] = layer

    // rotate canvas on triangle center before drawing
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(r)
    // draw triangle
    ctx.beginPath()
    ctx.moveTo(0, -hh)
    ctx.lineTo(wh, hh * 2)
    ctx.lineTo(-wh, hh * 2)
    ctx.closePath()
    // rotate back and restore position
    ctx.restore()

    this._fillStroke(ctx, layer)
},


/**
 * A triangle marker of a fixed size. Extends `Path`.
 * @requires    Leaflet ^1.3.1
 * @class       TriangleMarker
 * @extends     Path
 */
L.TriangleMarker = L.Path.extend({

    /**
     * TriangleMarker opcions
     * @type    {Object}
     */
	options: {
		fill: true,
        // width {Number} in px
        width: 12,
        // height {Number} in px
        height: 12,
        // rotation (in deg)
        rotation: 0,
        // set default renderer (works only in Canvas renderer)
        renderer: L.canvas()
	},

    /**
     * Initialize
     * @param   {Object}    latlng
     * @param   {Object}    options
     */
	initialize: function (latlng, options) {
		L.setOptions(this, options)

		this._latlng = L.latLng(latlng)
		this._width = this.options.width
		this._height = this.options.height
		this._rotation = this.options.rotation
		this._renderer = this.options.renderer
	},

    /**
     * Set new latlng for triangle
     * @param   {Object}    latlng
     * @return  {?}
     */
	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng)
		this.redraw()

		return this.fire('move', {latlng: this._latlng})
	},

    /**
     * Get latlng of triangle
     * @return  {Object}
     */
	getLatLng: function () {
		return this._latlng
	},

    /**
     * Set new width for triangle
     * @param   {Number}    width                   Width in px
     * @return  {?}
     */
	setWidth: function (width) {
		this.options.width = this._width = width

		return this.redraw()
	},

    /**
     * Set new height for triangle
     * @param   {Number}    height                  Height in px
     * @return  {?}
     */
	setHeight: function (height) {
		this.options.height = this._height = height

		return this.redraw()
	},

    /**
     * Set new width for triangle
     * @param   {Number}    deg                     Rotation in degrees
     * @return  {?}
     */
	setRotation: function (deg) {
		this.options.rotation = this._rotation = deg

		return this.redraw()
	},

    /**
     * Get width of triangle
     * @return  {Number}    width                  Width in px
     */
	getWidth: function () {
		return this._width
	},

    /**
     * Get height of triangle
     * @return  {Number}    height                 Height in px
     */
	getHeight: function () {
		return this._height
	},

    /**
     * Get rotation of triangle
     * @return  {Number}    height                 Rotation in deg
     */
	getRotation: function () {
		return this._rotation
	},

    /**
     * Set new style
     * @param   {Object}    options
     * @chainable
     */
	setStyle : function (options) {
		var width   = options && options.width  || this._width,
            height  = options && options.height || this._height

		L.Path.prototype.setStyle.call(this, options)
		this.setWidth(width)
		this.setHeight(height)

		return this
	},

	_project: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng)
		this._updateBounds()
	},

    /**
     * Update pixelbounds
     */
	_updateBounds: function () {
		var w = this._width / 2,
		    h = this._height / 2,
		    b = this._clickTolerance(),
		    p = [w + b, h + b]

		this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p))
	},

    /**
     * Update
     */
	_update: function () {
		if (this._map) this._updatePath()
	},

    /**
     * Update triangle path
     */
	_updatePath: function () {
		this._renderer._updateTriangle(this)
	},

	_empty: function () {
		return this._width && this._height && !this._renderer._bounds.intersects(this._pxBounds)
	},

	// Needed by the `Canvas` renderer for interactivity
	_containsPoint: function (p) {
		return this._pxBounds && this._pxBounds.contains(p)
	}
})


/**
 * Instantiates a triangle marker object given a geographical point,
 * and an optional options object.
 * @param   {Object}    latlng
 * @param   {Object}    options                     [Optional] options
 * @return  {Object}
 */
L.triangleMarker = function (latlng, options) {
	return new L.TriangleMarker(latlng, options)
}
