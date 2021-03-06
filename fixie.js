/* 
 * Fixie.js
 * by Ryhan Hassan
 * ryhanh@me.com
 * and Ilter Canberk
 * anything@icanberk.com
 *
 * Automagically adds filler content
 * whenever an element has class="fixie".
 * Hope you find it useful :)
 */
var fixie = {

    getElementsByAttribute: function (oElm, strTagName, strAttributeName, strAttributeValue) {
        var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        var oAttributeValue = (typeof strAttributeValue != "undefined") ? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
        var oCurrent;
        var oAttribute;
        for (var i = 0; i < arrElements.length; i++) {
            oCurrent = arrElements[i];
            oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
            if (typeof oAttribute == "string" && oAttribute.length > 0) {
                if (typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))) {
                    arrReturnElements.push(oCurrent);
                }
            }
        }
        return arrReturnElements;
    },
    /* 
     * Spec
     * Here are some functions you might find useful
     * 
     * fixie_fetchWord();
     * fixie_fetchPhrase();
     * fixie_fetchSentence();
     * fixie_fetchParagraph();
     * fixie_fetchParagraphs();
     *
     */

    /* 
     * fixie_handler(element)
     *
     * Takes in an element and adds filler content.
     * Returns false if tag is unrecognized.
     */
    handler: function (element) {
        switch (element.nodeName.toLowerCase()) {
        case 'b':
        case 'em':
        case 'strong':
        case 'button':
        case 'th':
        case 'td':
        case 'title':
        case 'tr':
            element.innerHTML = fixie_fetchWord();
            break;

        case 'header':
        case 'cite':
        case 'caption':
        case 'mark':
        case 'q':
        case 's':
        case 'u':
        case 'small':
        case 'span':
        case 'code':
        case 'pre':
        case 'li':
        case 'dt':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            element.innerHTML = this.fetchPhrase();
            break;

        case 'footer':
        case 'aside':
        case 'summary':
        case 'blockquote':
        case 'p':
            element.innerHTML = this.fetchParagraph();
            break;

        case 'article':
        case 'section':

            element.innerHTML = this.fetchParagraphs()
            break;

            /* Special cases */
        case 'a':
            element.href = "http://ryhan.me/";
            element.innerHTML = "www." + this.fetchWord() + this.capitalize(this.fetchWord()) + ".com";
            break;

        case 'img':
            if (element.width == 0) {
                element.width = element.height;
            }
            if (element.height == 0) {
                element.height = element.width;
            }
            if (element.height == 0) {
                element.height = 100;
                element.width = 250;
            }
            element.src = "http://placehold.it/" + element.width + "x" + element.height;
            break;

        default:
            element.innerHTML = this.fetchSentence();
            return false;
        }
        return true;
    },
    wordlibrary: ["I", "8-bit", "ethical", "reprehenderit", "delectus", "non", "latte", "fixie", "mollit", "authentic", "1982", "moon", "helvetica", "dreamcatcher", "esse", "vinyl", "nulla", "Carles", "bushwick", "bronson", "clothesline", "fin", "frado", "jug", "kale", "organic", "local", "fresh", "tassel", "liberal", "art", "the", "of", "bennie", "chowder", "daisy", "gluten", "hog", "capitalism", "is", "vegan", "ut", "farm-to-table", "etsy", "incididunt", "sunt", "twee", "yr", "before", "gentrify", "whatever", "wes", "Anderson", "chillwave", "dubstep", "sriracha", "voluptate", "pour-over", "esse", "trust-fund", "Pinterest", "Instagram", "DSLR", "vintage", "dumpster", "totally", "selvage", "gluten-free", "brooklyn", "placeat", "delectus", "sint", "magna", "brony", "pony", "party", "beer", "shot", "narwhal", "salvia", "letterpress", "art", "party", "street-art", "seitan", "anime", "wayfarers", "non-ethical", "viral", "iphone", "anim", "polaroid", "gastropub", "city", 'classy', 'original', 'brew'],

    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    fetchWord: function () {
        return this.wordlibrary[Math.round(Math.random() * (this.wordlibrary.length - 1))];
    },

    fetchPhrase: function () {
        var fixie_length = Math.round(Math.random() * 2 + 3);
        var fixie_str = "";
        for (var fixie_i = 0; fixie_i < fixie_length - 1; fixie_i++) {
            fixie_str += this.fetchWord() + " ";
        }
        fixie_str += this.fetchWord();
        return this.capitalize(fixie_str);
    },

    fetchSentence: function () {
        var fixie_length = Math.round(Math.random() * 5 + 4);
        var fixie_str = "";
        for (var fixie_i = 0; fixie_i < fixie_length - 1; fixie_i++) {
            fixie_str += this.fetchWord() + " ";
        }
        fixie_str += this.fetchWord() + ".";
        return this.capitalize(fixie_str);
    },

    fetchParagraph: function () {
        var fixie_length = Math.round(Math.random() * 4 + 3);
        var fixie_str = "";
        for (var fixie_i = 0; fixie_i < fixie_length - 1; fixie_i++) {
            fixie_str += this.fetchSentence() + " ";
        }
        fixie_str += this.fetchSentence();
        return this.capitalize(fixie_str);
    },

    fetchParagraphs: function () {
        var fixie_length = Math.round(Math.random() * 4 + 3);
        var fixie_str = "";
        for (var fixie_i = 0; fixie_i < fixie_length - 1; fixie_i++) {
            fixie_str += "<p>" + this.fetchParagraph() + "</p>";
        }
        return fixie_str;
    },
    attribute: "data-fixie",
    init: function (str) {
        var to_be_fixied = this.getElementsByAttribute(document, "*", this.attribute, "true");
        for (var fixie_i = 0; fixie_i < to_be_fixied.length; fixie_i++) {
            fixie.handler(to_be_fixied[fixie_i]);
        }
        var elem = document.querySelectorAll(str);
        for (var fixie_i = 0; fixie_i < elem.length; fixie_i++) {
            this.handler(elem[fixie_i]);
        }
    }
};