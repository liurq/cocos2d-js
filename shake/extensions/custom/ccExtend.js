/**
 * Created by adin on 10/30/15
 * email: phpgege@163.com
 */
var DrawNode = cc.DrawNode.extend({
    ctor: function () {
        this._super();
    },
    fillCircle: function (center, radius) {
        if (cc._renderType == cc._RENDER_TYPE_WEBGL) {
            var segments = Math.min(400, 2 * radius);
            var coef = 2.0 * Math.PI / segments;
            var vertices = [], rads, j, k;
            for (var i = 0; i < segments; i++) {
                rads = i * coef;
                j = radius * Math.cos(rads) + center.x;
                k = radius * Math.sin(rads) + center.y;
                vertices.push(cc.p(j, k));
            }
            this.drawPoly(vertices, cc.color(0, 0, 0, 0), 1, cc.color(0, 0, 0, 0));
        } else {
            this.drawDot(center, radius, cc.color(0, 0, 0, 0));
        }
    }
});