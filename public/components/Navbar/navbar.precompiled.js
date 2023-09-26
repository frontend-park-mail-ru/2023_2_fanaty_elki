(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header class=\"header\">\r\n    <img src=\"img/logo.svg\" alt=\"Logo\" class=\"logo\">\r\n    <div class=\"header__title\">\r\n        <form class=\"search gray_bordered_white\">\r\n            <input class=\"nosubmit\" type=\"search\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"search_ph") || (depth0 != null ? lookupProperty(depth0,"search_ph") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"search_ph","hash":{},"data":data,"loc":{"start":{"line":5,"column":63},"end":{"line":5,"column":76}}}) : helper)))
    + " ...\">\r\n        </form>\r\n        <button class=\"address gray_bordered_white\" type=\"button\" value=\"\">\r\n            <img src=\"img/gps.svg\" alt=\"\">\r\n            <p class=\"address_title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"address") || (depth0 != null ? lookupProperty(depth0,"address") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"address","hash":{},"data":data,"loc":{"start":{"line":9,"column":37},"end":{"line":9,"column":48}}}) : helper)))
    + "</p>\r\n        </button>\r\n        <button class=\"person gray_bordered_white\" type=\"button\" value=\"\">\r\n            <img src=\"img/person.svg\" alt=\"\">\r\n        </button>\r\n        <button class=\"backet gray_bordered_white\" type=\"button\" value=\"\">\r\n            <img src=\"img/shop_basket.svg\" alt=\"\">\r\n        </button>\r\n    </div>\r\n</header>\r\n";
},"useData":true});
})();