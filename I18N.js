/*
 * 18N.gs - a simple gettext library for GAS
 *
 * Based on GNU libintl implementation.
 *
 * Copyright (c) 2013 Ondrej Mosnáček
 *
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

(function () {
  var locale;
  var getLocale = function() {
    if(locale === undefined)
      locale = UserProperties.getProperty('LANGUAGE')/* || 'the_default_language'*/;
    return locale;
  };
  var setLocale = function(value) {
    UserProperties.setProperty('LANGUAGE', locale = value);
  };

  var catalogs = {};
  var defaultCatalog = 'messages';
  var textdomain = function(domainName) {
    if(domainName === undefined || domainName === null)
      return defaultCatalog;
    
    if(domainName === '')
      defaultCatalog = 'messages';
    else
      defaultCatalog = domainName;
  };

  var digettext = function(domainName, msgid1, msgid2, plural, n) {
    if(domainName === undefined || domainName === null)
      domainName = defaultCatalog;

    var catalog = catalogs[domainName];
    if(!catalog)
      return (plural && n != 1) ? msgid2 : msgid1;

    var locale = getLocale();
    if(!locale)
      return (plural && n != 1) ? msgid2 : msgid1;
    
    catalog = catalog[locale];
    if(!catalog)
      return (plural && n != 1) ? msgid2 : msgid1;

    var messages = catalog.messages || {};
    var message = messages[msgid1];
    if(!message)
      return (plural && n != 1) ? msgid2 : msgid1;

    if(plural) {
      var plural = catalog.plural || function(n) { return n == 1 ? 0 : 1; };
      var index = plural(n);
      return message.msgstr_plural[index];
    }
    else
      return message.msgstr;
  };
  
  var dgettext = function(domainName, msgid) {
    return digettext(domainName, msgid, null, false, 1);
  };
  var gettext = function(msgid) {
    return dgettext(null, msgid);
  };

  var dngettext = function(domainName, msgid1, msgid2, n) {
    return digettext(domainName, msgid1, msgid2, true, n);
  };
  var ngettext = function(msgid1, msgid2, n) {
    return dngettext(null, msgid1, msgid2, n);
  };
  
  I18N = {
    catalogs: catalogs,
    
    getLocale: getLocale,
    setLocale: setLocale,

    textdomain: textdomain,

    dgettext: dgettext,
    gettext: gettext,
 
    dngettext: dngettext,
    ngettext: ngettext,
  };
})();

var _ = I18N.gettext;
// you can add another aliases here:
// var gettext = I18N.gettext;
// var ngettext = I18N.ngettext;
