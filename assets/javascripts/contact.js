$(window).on('load', function () {
    $('body').addClass('show');
});
$(document).ready(function () {
    // requiredCheck();
    // required.addEventListener('input', function(e){requiredCheck();}, false);

    $.validator.setDefaults({ ignore: [] });
    //追加ルールの定義
    var methods = {
        phone: function(value, element){
            return this.optional(element) || /^(?:\+?\d+-)?\d+(?:-\d+){2}$|^\+?\d+$/.test(value);
        }
    };

    //メソッドの追加
    $.each(methods, function(key) {
        $.validator.addMethod(key, this);
    });


    $("#form").validate({
        rules: {
            name: {
                required: true,
                maxlength: 50
            },
            kana: {
                required: true
            },
            company: {
                required: true
            },
            email: {
                required: true,
                email:true
            },
            tel: {
                required: true,
                phone: true
            },
            subject: {
                required: true
            },
            body: {
                required: true
            },
            agree: {
                required: true
            }
        },
        messages: {
            name: {
                required: "必須項目です。",
                maxlength: "50文字以内で入力してください。"
            },
            kana: {
                required: "必須項目です。"
            },
            company: {
                required: "必須項目です。"
            },
            email: {
                required: '必須項目です。',
                email: 'メールアドレスを正確に入力してください。'
            },
            tel: {
                required: "必須項目です。",
                phone: '電話番号を正確に入力してください。'
            },
            subject: {
                required: "必須項目です。"
            },
            body: {
                required: "必須項目です。",
                maxlength: "3,000文字以内で入力してください。"
            },
            agree: {
                required: "必須項目です。"
            },
        },
        submitHandler: function (form) {
            $("#btn_submit").prop("disabled", true);
            form.submit();
        }
    });
});