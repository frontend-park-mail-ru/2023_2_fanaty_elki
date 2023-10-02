(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Button.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button class=\"button__"
    + alias4(((helper = (helper = lookupProperty(helpers,"style") || (depth0 != null ? lookupProperty(depth0,"style") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"style","hash":{},"data":data,"loc":{"start":{"line":1,"column":23},"end":{"line":1,"column":34}}}) : helper)))
    + "\" type=\"button\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":54},"end":{"line":1,"column":62}}}) : helper)))
    + "\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":1,"column":65},"end":{"line":1,"column":75}}}) : helper)))
    + "</button>";
},"useData":true});
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
templates['category.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"cardTemplate"),depth0,{"name":"cardTemplate","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"category_grid\">\r\n    <h2>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":17}}}) : helper)))
    + "</h2>\r\n    <div class=\"grid_items\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"cards") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":6,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['FormInputWithMsg.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"form-input-with-msg\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":47}}}) : helper)))
    + "\">\r\n    <div class=\"form-input-with-msg-msg__"
    + alias4(((helper = (helper = lookupProperty(helpers,"style") || (depth0 != null ? lookupProperty(depth0,"style") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"style","hash":{},"data":data,"loc":{"start":{"line":2,"column":41},"end":{"line":2,"column":52}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":2,"column":54},"end":{"line":2,"column":67}}}) : helper)))
    + "</div>\r\n    <input class=\"form-input-with-msg-input__"
    + alias4(((helper = (helper = lookupProperty(helpers,"style") || (depth0 != null ? lookupProperty(depth0,"style") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"style","hash":{},"data":data,"loc":{"start":{"line":3,"column":45},"end":{"line":3,"column":56}}}) : helper)))
    + "\" type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":3,"column":64},"end":{"line":3,"column":74}}}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":82},"end":{"line":3,"column":92}}}) : helper)))
    + "\" id=\"input-"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":104},"end":{"line":3,"column":114}}}) : helper)))
    + "\"\r\n        placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeholder") || (depth0 != null ? lookupProperty(depth0,"placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data,"loc":{"start":{"line":4,"column":21},"end":{"line":4,"column":38}}}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":4,"column":47},"end":{"line":4,"column":58}}}) : helper)))
    + "\">\r\n</div>";
},"useData":true});
templates['FormInput.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<input class=\"form-input__"
    + alias4(((helper = (helper = lookupProperty(helpers,"style") || (depth0 != null ? lookupProperty(depth0,"style") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"style","hash":{},"data":data,"loc":{"start":{"line":1,"column":26},"end":{"line":1,"column":37}}}) : helper)))
    + "\" type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":1,"column":45},"end":{"line":1,"column":55}}}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":63},"end":{"line":1,"column":73}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":79},"end":{"line":1,"column":89}}}) : helper)))
    + "\"\r\n    placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeholder") || (depth0 != null ? lookupProperty(depth0,"placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data,"loc":{"start":{"line":2,"column":17},"end":{"line":2,"column":34}}}) : helper)))
    + "\">";
},"useData":true});
templates['card.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"category_grid_item\">\r\n    <img class=\"rest_image\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":2,"column":33},"end":{"line":2,"column":42}}}) : helper)))
    + "\" />\r\n    <div class=\"title_stars\">\r\n        <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"r_name") || (depth0 != null ? lookupProperty(depth0,"r_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"r_name","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":22}}}) : helper)))
    + "</h3>\r\n        <div class=\"rating\">\r\n            <svg class=\"active_star\" width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                <g clip-path=\"url(#clip0_87_44)\">\r\n                    <path\r\n                        d=\"M10.2785 0.0458378C10.1112 0.101484 9.98813 0.180044 9.90445 0.28479C9.86836 0.330617 9.74859 0.551566 9.63867 0.777425C8.72156 2.64322 6.98414 6.14895 6.96774 6.16368C6.95625 6.1735 6.73805 6.21114 6.48047 6.24878C6.22289 6.28643 5.10563 6.45009 3.99492 6.61212C2.88586 6.77415 1.67508 6.95255 1.3043 7.00656C0.935156 7.05893 0.587344 7.11785 0.531563 7.13422C0.351094 7.18659 0.187031 7.32243 0.103359 7.48774C0.0590625 7.57284 0 7.77252 0 7.83307C0 7.90345 0.0721875 8.12112 0.123047 8.21114C0.180469 8.3077 -0.013125 8.11785 2.62172 10.6694C4.64625 12.6301 4.83984 12.8233 4.83164 12.8625C4.82672 12.8854 4.76109 13.2652 4.68398 13.707C4.60852 14.1473 4.47891 14.8936 4.39688 15.365C4.31648 15.8347 4.18359 16.6007 4.10156 17.0671C4.02117 17.5319 3.90633 18.1931 3.84727 18.5352C3.71602 19.2815 3.71273 19.365 3.81117 19.563C3.91289 19.7676 4.05891 19.8887 4.29516 19.9607C4.4543 20.0098 4.50352 20.0082 4.66758 19.9542C4.74961 19.9264 5.85211 19.3601 7.64039 18.4239C9.20391 17.6072 10.4967 16.9395 10.5115 16.9395C10.5279 16.9395 10.7363 17.0409 10.9758 17.167C11.2153 17.2913 12.4523 17.9362 13.7238 18.6007C14.997 19.2652 16.0995 19.8396 16.1766 19.8756C16.316 19.9427 16.316 19.9427 16.5129 19.9427C16.7032 19.9427 16.7147 19.9411 16.818 19.8904C17.0855 19.7594 17.243 19.5139 17.243 19.2341C17.243 19.1719 17.1888 18.8167 17.1199 18.4125C17.051 18.0213 16.9296 17.3192 16.8492 16.8527C16.7672 16.3879 16.6359 15.6252 16.5539 15.1588C16.4735 14.694 16.3521 13.9918 16.2832 13.6007C16.2159 13.2095 16.1602 12.8724 16.1602 12.8543C16.1602 12.8298 16.8148 12.1784 18.3799 10.6514C21.0705 8.02129 20.8245 8.26515 20.8786 8.17513C20.9278 8.09003 21 7.87072 21 7.80198C21 7.73815 20.9442 7.54666 20.9016 7.46155C20.8441 7.35026 20.7867 7.28315 20.685 7.20787C20.562 7.11785 20.4389 7.08021 20.1469 7.03929C19.9238 7.00819 18.2651 6.77579 16.9887 6.59576C16.6737 6.55157 16.1454 6.47628 15.8156 6.43045C14.1291 6.19314 14.0093 6.17513 13.9863 6.15222C13.9748 6.13913 13.3235 4.8298 12.5393 3.2406C11.1907 0.507376 11.1103 0.346983 11.0217 0.253694C10.9134 0.137491 10.8166 0.0802077 10.6477 0.0343812C10.4902 -0.00980868 10.4393 -0.00817202 10.2785 0.0458378Z\" />\r\n                </g>\r\n                <defs>\r\n                    <clipPath id=\"clip0_87_44\">\r\n                        <rect width=\"21\" height=\"20\" fill=\"white\" />\r\n                    </clipPath>\r\n                </defs>\r\n            </svg>\r\n            <svg class=\"active_star\" width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                <g clip-path=\"url(#clip0_87_44)\">\r\n                    <path\r\n                        d=\"M10.2785 0.0458378C10.1112 0.101484 9.98813 0.180044 9.90445 0.28479C9.86836 0.330617 9.74859 0.551566 9.63867 0.777425C8.72156 2.64322 6.98414 6.14895 6.96774 6.16368C6.95625 6.1735 6.73805 6.21114 6.48047 6.24878C6.22289 6.28643 5.10563 6.45009 3.99492 6.61212C2.88586 6.77415 1.67508 6.95255 1.3043 7.00656C0.935156 7.05893 0.587344 7.11785 0.531563 7.13422C0.351094 7.18659 0.187031 7.32243 0.103359 7.48774C0.0590625 7.57284 0 7.77252 0 7.83307C0 7.90345 0.0721875 8.12112 0.123047 8.21114C0.180469 8.3077 -0.013125 8.11785 2.62172 10.6694C4.64625 12.6301 4.83984 12.8233 4.83164 12.8625C4.82672 12.8854 4.76109 13.2652 4.68398 13.707C4.60852 14.1473 4.47891 14.8936 4.39688 15.365C4.31648 15.8347 4.18359 16.6007 4.10156 17.0671C4.02117 17.5319 3.90633 18.1931 3.84727 18.5352C3.71602 19.2815 3.71273 19.365 3.81117 19.563C3.91289 19.7676 4.05891 19.8887 4.29516 19.9607C4.4543 20.0098 4.50352 20.0082 4.66758 19.9542C4.74961 19.9264 5.85211 19.3601 7.64039 18.4239C9.20391 17.6072 10.4967 16.9395 10.5115 16.9395C10.5279 16.9395 10.7363 17.0409 10.9758 17.167C11.2153 17.2913 12.4523 17.9362 13.7238 18.6007C14.997 19.2652 16.0995 19.8396 16.1766 19.8756C16.316 19.9427 16.316 19.9427 16.5129 19.9427C16.7032 19.9427 16.7147 19.9411 16.818 19.8904C17.0855 19.7594 17.243 19.5139 17.243 19.2341C17.243 19.1719 17.1888 18.8167 17.1199 18.4125C17.051 18.0213 16.9296 17.3192 16.8492 16.8527C16.7672 16.3879 16.6359 15.6252 16.5539 15.1588C16.4735 14.694 16.3521 13.9918 16.2832 13.6007C16.2159 13.2095 16.1602 12.8724 16.1602 12.8543C16.1602 12.8298 16.8148 12.1784 18.3799 10.6514C21.0705 8.02129 20.8245 8.26515 20.8786 8.17513C20.9278 8.09003 21 7.87072 21 7.80198C21 7.73815 20.9442 7.54666 20.9016 7.46155C20.8441 7.35026 20.7867 7.28315 20.685 7.20787C20.562 7.11785 20.4389 7.08021 20.1469 7.03929C19.9238 7.00819 18.2651 6.77579 16.9887 6.59576C16.6737 6.55157 16.1454 6.47628 15.8156 6.43045C14.1291 6.19314 14.0093 6.17513 13.9863 6.15222C13.9748 6.13913 13.3235 4.8298 12.5393 3.2406C11.1907 0.507376 11.1103 0.346983 11.0217 0.253694C10.9134 0.137491 10.8166 0.0802077 10.6477 0.0343812C10.4902 -0.00980868 10.4393 -0.00817202 10.2785 0.0458378Z\" />\r\n                </g>\r\n                <defs>\r\n                    <clipPath id=\"clip0_87_44\">\r\n                        <rect width=\"21\" height=\"20\" fill=\"white\" />\r\n                    </clipPath>\r\n                </defs>\r\n            </svg>\r\n            <svg class=\"active_star\" width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                <g clip-path=\"url(#clip0_87_44)\">\r\n                    <path\r\n                        d=\"M10.2785 0.0458378C10.1112 0.101484 9.98813 0.180044 9.90445 0.28479C9.86836 0.330617 9.74859 0.551566 9.63867 0.777425C8.72156 2.64322 6.98414 6.14895 6.96774 6.16368C6.95625 6.1735 6.73805 6.21114 6.48047 6.24878C6.22289 6.28643 5.10563 6.45009 3.99492 6.61212C2.88586 6.77415 1.67508 6.95255 1.3043 7.00656C0.935156 7.05893 0.587344 7.11785 0.531563 7.13422C0.351094 7.18659 0.187031 7.32243 0.103359 7.48774C0.0590625 7.57284 0 7.77252 0 7.83307C0 7.90345 0.0721875 8.12112 0.123047 8.21114C0.180469 8.3077 -0.013125 8.11785 2.62172 10.6694C4.64625 12.6301 4.83984 12.8233 4.83164 12.8625C4.82672 12.8854 4.76109 13.2652 4.68398 13.707C4.60852 14.1473 4.47891 14.8936 4.39688 15.365C4.31648 15.8347 4.18359 16.6007 4.10156 17.0671C4.02117 17.5319 3.90633 18.1931 3.84727 18.5352C3.71602 19.2815 3.71273 19.365 3.81117 19.563C3.91289 19.7676 4.05891 19.8887 4.29516 19.9607C4.4543 20.0098 4.50352 20.0082 4.66758 19.9542C4.74961 19.9264 5.85211 19.3601 7.64039 18.4239C9.20391 17.6072 10.4967 16.9395 10.5115 16.9395C10.5279 16.9395 10.7363 17.0409 10.9758 17.167C11.2153 17.2913 12.4523 17.9362 13.7238 18.6007C14.997 19.2652 16.0995 19.8396 16.1766 19.8756C16.316 19.9427 16.316 19.9427 16.5129 19.9427C16.7032 19.9427 16.7147 19.9411 16.818 19.8904C17.0855 19.7594 17.243 19.5139 17.243 19.2341C17.243 19.1719 17.1888 18.8167 17.1199 18.4125C17.051 18.0213 16.9296 17.3192 16.8492 16.8527C16.7672 16.3879 16.6359 15.6252 16.5539 15.1588C16.4735 14.694 16.3521 13.9918 16.2832 13.6007C16.2159 13.2095 16.1602 12.8724 16.1602 12.8543C16.1602 12.8298 16.8148 12.1784 18.3799 10.6514C21.0705 8.02129 20.8245 8.26515 20.8786 8.17513C20.9278 8.09003 21 7.87072 21 7.80198C21 7.73815 20.9442 7.54666 20.9016 7.46155C20.8441 7.35026 20.7867 7.28315 20.685 7.20787C20.562 7.11785 20.4389 7.08021 20.1469 7.03929C19.9238 7.00819 18.2651 6.77579 16.9887 6.59576C16.6737 6.55157 16.1454 6.47628 15.8156 6.43045C14.1291 6.19314 14.0093 6.17513 13.9863 6.15222C13.9748 6.13913 13.3235 4.8298 12.5393 3.2406C11.1907 0.507376 11.1103 0.346983 11.0217 0.253694C10.9134 0.137491 10.8166 0.0802077 10.6477 0.0343812C10.4902 -0.00980868 10.4393 -0.00817202 10.2785 0.0458378Z\" />\r\n                </g>\r\n                <defs>\r\n                    <clipPath id=\"clip0_87_44\">\r\n                        <rect width=\"21\" height=\"20\" fill=\"white\" />\r\n                    </clipPath>\r\n                </defs>\r\n            </svg>\r\n            <svg class=\"active_star\" width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                <g clip-path=\"url(#clip0_87_44)\">\r\n                    <path\r\n                        d=\"M10.2785 0.0458378C10.1112 0.101484 9.98813 0.180044 9.90445 0.28479C9.86836 0.330617 9.74859 0.551566 9.63867 0.777425C8.72156 2.64322 6.98414 6.14895 6.96774 6.16368C6.95625 6.1735 6.73805 6.21114 6.48047 6.24878C6.22289 6.28643 5.10563 6.45009 3.99492 6.61212C2.88586 6.77415 1.67508 6.95255 1.3043 7.00656C0.935156 7.05893 0.587344 7.11785 0.531563 7.13422C0.351094 7.18659 0.187031 7.32243 0.103359 7.48774C0.0590625 7.57284 0 7.77252 0 7.83307C0 7.90345 0.0721875 8.12112 0.123047 8.21114C0.180469 8.3077 -0.013125 8.11785 2.62172 10.6694C4.64625 12.6301 4.83984 12.8233 4.83164 12.8625C4.82672 12.8854 4.76109 13.2652 4.68398 13.707C4.60852 14.1473 4.47891 14.8936 4.39688 15.365C4.31648 15.8347 4.18359 16.6007 4.10156 17.0671C4.02117 17.5319 3.90633 18.1931 3.84727 18.5352C3.71602 19.2815 3.71273 19.365 3.81117 19.563C3.91289 19.7676 4.05891 19.8887 4.29516 19.9607C4.4543 20.0098 4.50352 20.0082 4.66758 19.9542C4.74961 19.9264 5.85211 19.3601 7.64039 18.4239C9.20391 17.6072 10.4967 16.9395 10.5115 16.9395C10.5279 16.9395 10.7363 17.0409 10.9758 17.167C11.2153 17.2913 12.4523 17.9362 13.7238 18.6007C14.997 19.2652 16.0995 19.8396 16.1766 19.8756C16.316 19.9427 16.316 19.9427 16.5129 19.9427C16.7032 19.9427 16.7147 19.9411 16.818 19.8904C17.0855 19.7594 17.243 19.5139 17.243 19.2341C17.243 19.1719 17.1888 18.8167 17.1199 18.4125C17.051 18.0213 16.9296 17.3192 16.8492 16.8527C16.7672 16.3879 16.6359 15.6252 16.5539 15.1588C16.4735 14.694 16.3521 13.9918 16.2832 13.6007C16.2159 13.2095 16.1602 12.8724 16.1602 12.8543C16.1602 12.8298 16.8148 12.1784 18.3799 10.6514C21.0705 8.02129 20.8245 8.26515 20.8786 8.17513C20.9278 8.09003 21 7.87072 21 7.80198C21 7.73815 20.9442 7.54666 20.9016 7.46155C20.8441 7.35026 20.7867 7.28315 20.685 7.20787C20.562 7.11785 20.4389 7.08021 20.1469 7.03929C19.9238 7.00819 18.2651 6.77579 16.9887 6.59576C16.6737 6.55157 16.1454 6.47628 15.8156 6.43045C14.1291 6.19314 14.0093 6.17513 13.9863 6.15222C13.9748 6.13913 13.3235 4.8298 12.5393 3.2406C11.1907 0.507376 11.1103 0.346983 11.0217 0.253694C10.9134 0.137491 10.8166 0.0802077 10.6477 0.0343812C10.4902 -0.00980868 10.4393 -0.00817202 10.2785 0.0458378Z\" />\r\n                </g>\r\n                <defs>\r\n                    <clipPath id=\"clip0_87_44\">\r\n                        <rect width=\"21\" height=\"20\" fill=\"white\" />\r\n                    </clipPath>\r\n                </defs>\r\n            </svg>\r\n            <svg class=\"active_star\" width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                <g clip-path=\"url(#clip0_87_44)\">\r\n                    <path\r\n                        d=\"M10.2785 0.0458378C10.1112 0.101484 9.98813 0.180044 9.90445 0.28479C9.86836 0.330617 9.74859 0.551566 9.63867 0.777425C8.72156 2.64322 6.98414 6.14895 6.96774 6.16368C6.95625 6.1735 6.73805 6.21114 6.48047 6.24878C6.22289 6.28643 5.10563 6.45009 3.99492 6.61212C2.88586 6.77415 1.67508 6.95255 1.3043 7.00656C0.935156 7.05893 0.587344 7.11785 0.531563 7.13422C0.351094 7.18659 0.187031 7.32243 0.103359 7.48774C0.0590625 7.57284 0 7.77252 0 7.83307C0 7.90345 0.0721875 8.12112 0.123047 8.21114C0.180469 8.3077 -0.013125 8.11785 2.62172 10.6694C4.64625 12.6301 4.83984 12.8233 4.83164 12.8625C4.82672 12.8854 4.76109 13.2652 4.68398 13.707C4.60852 14.1473 4.47891 14.8936 4.39688 15.365C4.31648 15.8347 4.18359 16.6007 4.10156 17.0671C4.02117 17.5319 3.90633 18.1931 3.84727 18.5352C3.71602 19.2815 3.71273 19.365 3.81117 19.563C3.91289 19.7676 4.05891 19.8887 4.29516 19.9607C4.4543 20.0098 4.50352 20.0082 4.66758 19.9542C4.74961 19.9264 5.85211 19.3601 7.64039 18.4239C9.20391 17.6072 10.4967 16.9395 10.5115 16.9395C10.5279 16.9395 10.7363 17.0409 10.9758 17.167C11.2153 17.2913 12.4523 17.9362 13.7238 18.6007C14.997 19.2652 16.0995 19.8396 16.1766 19.8756C16.316 19.9427 16.316 19.9427 16.5129 19.9427C16.7032 19.9427 16.7147 19.9411 16.818 19.8904C17.0855 19.7594 17.243 19.5139 17.243 19.2341C17.243 19.1719 17.1888 18.8167 17.1199 18.4125C17.051 18.0213 16.9296 17.3192 16.8492 16.8527C16.7672 16.3879 16.6359 15.6252 16.5539 15.1588C16.4735 14.694 16.3521 13.9918 16.2832 13.6007C16.2159 13.2095 16.1602 12.8724 16.1602 12.8543C16.1602 12.8298 16.8148 12.1784 18.3799 10.6514C21.0705 8.02129 20.8245 8.26515 20.8786 8.17513C20.9278 8.09003 21 7.87072 21 7.80198C21 7.73815 20.9442 7.54666 20.9016 7.46155C20.8441 7.35026 20.7867 7.28315 20.685 7.20787C20.562 7.11785 20.4389 7.08021 20.1469 7.03929C19.9238 7.00819 18.2651 6.77579 16.9887 6.59576C16.6737 6.55157 16.1454 6.47628 15.8156 6.43045C14.1291 6.19314 14.0093 6.17513 13.9863 6.15222C13.9748 6.13913 13.3235 4.8298 12.5393 3.2406C11.1907 0.507376 11.1103 0.346983 11.0217 0.253694C10.9134 0.137491 10.8166 0.0802077 10.6477 0.0343812C10.4902 -0.00980868 10.4393 -0.00817202 10.2785 0.0458378Z\" />\r\n                </g>\r\n                <defs>\r\n                    <clipPath id=\"clip0_87_44\">\r\n                        <rect width=\"21\" height=\"20\" fill=\"white\" />\r\n                    </clipPath>\r\n                </defs>\r\n            </svg>\r\n        </div>\r\n    </div>\r\n    <div class=\"rest_info\">\r\n        Доставка: "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":64,"column":18},"end":{"line":64,"column":26}}}) : helper)))
    + " &nbsp\r\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"min_time") || (depth0 != null ? lookupProperty(depth0,"min_time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"min_time","hash":{},"data":data,"loc":{"start":{"line":65,"column":8},"end":{"line":65,"column":20}}}) : helper)))
    + "-"
    + alias4(((helper = (helper = lookupProperty(helpers,"max_time") || (depth0 != null ? lookupProperty(depth0,"max_time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max_time","hash":{},"data":data,"loc":{"start":{"line":65,"column":21},"end":{"line":65,"column":33}}}) : helper)))
    + " минут\r\n    </div>\r\n</div>\r\n";
},"useData":true});
templates['MainView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"main\">\r\n    <div id=\"navbar\"></div>\r\n    <div id=\"categories\"></div>\r\n</div>\r\n";
},"useData":true});
templates['LoginView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"login_form\" class=\"loginform-formwindow\">\r\n    <div class=\"loginform-header\">\r\n        <img src=\"img/Принеси&Подай.svg\" alt=\"\" srcset=\"\">\r\n        <div class=\"loginform-text\">Создайте аккаунт</div>\r\n    </div>\r\n    <form class=\"loginform-form\" action=\"#\">\r\n        <div class=\"loginform-inputgroup\">\r\n            <input type=\"text\" class=\"loginform-input\" name=\"username\" id=\"username\" placeholder=\"Имя пользователя\">\r\n            <input type=\"password\" class=\"loginform-input\" name=\"password\" id=\"password\" placeholder=\"Пароль\">\r\n        </div>\r\n        <div class=\"loginform-control\">\r\n            <button type=\"submit\" class=\"loginform-submit\">Войти</button>\r\n            <a href=\"#\" class=\"loginform-auth\">Зарегистрироваться</a>\r\n        </div>\r\n    </form>\r\n</div>\r\n";
},"useData":true});
templates['SignUpView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"signup\" class=\"signup-formwindow\">\r\n    <div class=\"signup-header\">\r\n        <img src=\"img/Принеси&Подай.svg\" alt=\"\" srcset=\"\">\r\n        <div class=\"signup-text\">Создайте аккаунт</div>\r\n    </div>\r\n    <form class=\"signup-form\" action=\"#\">\r\n        <div class=\"signup-inputgroup\">\r\n        </div>\r\n        <div class=\"signup-control\">\r\n        </div>\r\n    </form>\r\n</div>";
},"useData":true});
})();