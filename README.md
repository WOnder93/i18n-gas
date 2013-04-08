I18N for Google Apps Script
========

I18N is a simple libintl-like internationalization script for Google Apps Script.
It supports gettext and ngetttext functions and partially supports multiple domains (but seriously, who uses them anyway...).

## Using the script

1. Copy the contents of **I18N.js** into a new file in your project.
2. In your code, use `I18N.[d][n]gettext` functions (or the `_` alias for `I18N.gettext`) to mark strings as translatable (you *must* use double quotes):

    ```javascript
    _("This will be translated.");
    I18N.gettext("Also this...");
    Utilities.formatString(I18N.ngettext("I have %s apple", "I have %s apples", n), n);
    ```

3. Copy your code files into a local directory and generate a message template:

    ```bash
    $ xgettext --from-code=utf-8 -C -k_ -o messages.pot source1.gs source2.gs ui.html ...
    ```

4. Use the template to create .po files for the languages you want to support.
5. Use **msgfmt.py** to generate a Google Apps Script file containing the translated messages from one or more .po files:

    ```bash
    $ python msgfmt.py -o messages.gs *.po
    ```

6. Add the generated script file (<b>messages.gs</b> by default) to your project.

You can get/set current locale with `I18N.getLocale`/`I18N.setLocale` functions. It is stored as a user property with key `"LANGUAGE"`, but you can change the code to whatever you need.
