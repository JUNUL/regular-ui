/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * --------------------------------------------
 * @class Selectex
 * @extend BaseComponent
 * @param {Object} options
 *     options.value             
 *              
 */

var BaseComponent = require('./base.js');
var template = require('./selectex.html');
var _ = require('./util.js');

var Selectex = BaseComponent.extend({
    name: 'selectex',
    template: template,
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            placeholder: '请选择',
            shown: false,
            disabled: false,
            multiple: false
        });
        this.supr();
    },
    select: function(item) {
        this.data.selected = item;
        this.toggle(false);
    },
    toggle: function(shown) {
        if(this.data.disabled)
            return;

        this.data.shown = shown;

        var index = Selectex.selectexesShown.indexOf(this);
        if(shown && index < 0)
            Selectex.selectexesShown.push(this);
        else if(!shown && index >= 0)
            Selectex.selectexesShown.splice(index, 1);
    }
});

Selectex.selectexesShown = [];

_.addEvent(window.document, 'click', function(e) {
    Selectex.selectexesShown.forEach(function(selectex) {
        var element = selectex.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        selectex.toggle(false);
        selectex.$update();
    });
});

module.exports = Selectex;