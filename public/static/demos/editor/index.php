<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="assets/css/cms.css" rel="stylesheet">
        <link href="assets/css/simditor.css" rel="stylesheet">
    </head>
    <body>

        <div class="container">
            <form class="form-editor" method="post" action="">
                <input type="hidden" name="type" value="" class="editor-field field-type"/>
                <input type="text" name="title" value="" placeholder="Enter a title here..."
                       class="editor-field field-title"/>


                <input type="datetime" name="published_at" value="<?= date("F jS, Y");?>" placeholder="open datepicker..."
                       class="editor-field field-published"/>

                <textarea id="ss" class="editor-field field-content" name="content"
                          placeholder="Share a new story with the world..."></textarea>
            </form>
        </div>
        <script type="text/javascript" src="assets/js/jquery.js"></script>
        <script type="text/javascript" src="assets/js/simditor.js"></script>
        <script>

            var Editorium = (function () {

                var DatePicker = new Pikaday({
                    field: document.querySelector('.field-published'),
                    format: 'MMMM Do, YYYY',
                    firstDay: 1,
                });

                var TextEditor = (function () {

                    Simditor.locale = 'en-US';

                    var editor = new Simditor({
                        textarea: $('#ss'),
                        toolbar: ['bold', 'italic', 'underline', 'blockquote']
                    });
                })();

              /*  $('html').one('mouseover', function(){
                    $('.editor-field.field-title').focus();
                });*/

                var StoreActions = (function () {

                    var _addEvents = function _addEvents() {

                    };

                    var _handleClick = function _handleClick(event) {
                        event.preventDefault();

                        var data = _getFormData();
                    };

                    var _getFormData = function (postType) {
                        var data = {};

                        $('.form-editor').serializeArray().forEach(function (obj) {
                            data[obj.name] = obj.value;
                        });

                        return data;
                    };

                    _addEvents();
                })();

                function isEmpty(value) {
                    var val = value.toString().trim();
                    return (val == "" || val == null);
                }

            });

            Editorium();
        </script>
    </body>
</html>
    


