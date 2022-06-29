/* 비밀번호 보이기, 감추기 */
$(".pw-show").on("click",function(){
    $("input").toggleClass("active");
    if($("input").hasClass("active")){
        $(".pw-show").prev("input").attr("type","text");
        $(".pw-show").toggleClass("pw-hide");
    }else{
        $(".pw-show").prev("input").attr("type","password");
        $(".pw-show").removeClass("pw-hide");
    }
});

/* 모달 클릭 시 닫힘 */
$(".modal-outer").click(function() {
    $(".modal-outer").hide();
    $(".docs-component").hide();
});

/* 모달 X 클릭 시 닫힘 */
$("button.close").click(function() {
    $(".modal-outer").hide();
    $(".docs-component").hide();
});

/* 이용 약관 버튼 클릭 시 모달 열림 */
$("#btn-terms-of-service").click(function() {
    $(".modal-outer").show();
    $(".terms-of-service").show();
});

/* 개인정보 약관 버튼 클릭 시 모달 열림 */
$("#btn-privacy-policy").click(function() {
    $(".modal-outer").show();
    $(".privacy-policy").show();
});

function checkEmail() {
    let userEmail = $('#userEmail').val(); //userEmail값이 "userEmail"인 입력란의 값을 저장
    const feedback = $("div.invalid-feedback-email");
    let str = "";
    if (!userEmail) {
    	str = "<small>이메일 주소를 입력해주세요.</small>";
    	feedback.html(str);
    	return;
    }

    $.ajax({	// ajax선언
        url: '/user/checkEmail', //Controller에서 인식할 주소
        type: 'post', //POST 방식으로 전달
        dataType: "json",
        data: userEmail,	// 데이터 타입은 userEmail타입이고 userEmail이 들어감
        contentType: "application/json",
        success: function (result) {	// 외부로부터 result를 받아오면 => 만약 이메일 전송에 성공하면
            let str = "";	// str 빈칸으로 정의
            const feedback = $("div.invalid-feedback-email");	// const타입 feedback은 클래스가 invalid-feedback인 div태그
            console.log("처리 성공 시 변경되는 내용");	// 출력문

            if (result) { // 이메일 중복있을 때 result는 boolean타입
                str = "<small>이미 사용중인 이메일입니다.</small>";
            } //else { // 이메일 중복 없을 때
              //  str = "<small>사용가능한 이메일입니다.</small>";
            //}

            feedback.html(str);
        },
        error: function () {
            alert("에러입니다");
        }
    });
}

function checkName() {
    let userName = $('#userName').val(); //userEmail값이 "userEmail"인 입력란의 값을 저장
    const feedback = $("div.invalid-feedback-name");
    let str = "";
    if (!userName) {
        str = "<small>이름을 입력해주세요.</small>";
        feedback.html(str);
        return;
    } else if(userName.length < 2){
        str = "<small>이름은 최소 2자 이상 입력해주세요.</small>";
        feedback.html(str);
        return;
    }
    else {
        str = "";
        feedback.html(str);
        return;
    }

}

function checkPassWord() {
    let userPw = $('#userPw').val(); //userEmail값이 "userEmail"인 입력란의 값을 저장
    const feedback = $("div.invalid-feedback-password");
    let str = "";
    var chk_num = userPw.search(/[0-9]/g);
    var chk_eng = userPw.search(/[a-z]/ig);
    if (!userPw) {
        str = "<small>비밀번호를 입력해주세요.</small>";
        feedback.html(str);
        return;
    } else if(chk_num < 0 || chk_eng < 0){
        str = "<small>비밀번호는 숫자와 영문자를 혼용하여야 합니다.</small>";
        feedback.html(str);
        return;
    } else if(userPw.length < 8){
        str = "<small>비밀번호는 최소 8자 이상 입력해주세요.</small>";
        feedback.html(str);
        return;
    }
    else {
        str = "";
        feedback.html(str);
        return;
    }

}

function checkPhoneNum() {
    let userPhoneNum = $('#userPhoneNum').val(); //userEmail값이 "userEmail"인 입력란의 값을 저장
    const feedback = $("div.invalid-feedback-phonenum");
    let str = "";
    if (!userPhoneNum) {
        str = "<small>휴대 전화 번호를 입력해주세요.</small>";
        feedback.html(str);
        return;
    } else if(userPhoneNum.length < 11 || userPhoneNum.length > 11 ){
        str = "<small>올바른 휴대 전화 번호를 입력해주세요.</small>";
        feedback.html(str);
        return;
    }
    else {
        str = "";
        feedback.html(str);
        return;
    }
}

$("#agree-terms").on('click', function() {
    $("#agree-terms").toggleClass("checked");
    notEnough();
});

$("#agree-14").on('click', function() {
    $("#agree-14").toggleClass("checked");
    notEnough();
});


// 만약 입력칸에 입력을 안하거나 필수체크란에 동의를 하지 않았다면
function notEnough() {
    if($("div.invalid-feedback-name").html() != ""
        || $("div.invalid-feedback-email").html() != ""
        || $("div.invalid-feedback-password").html() != ""
        || $("div.invalid-feedback-phonenum").html() != ""
        || !$("#agree-terms").hasClass("checked")
        || !$("#agree-14").hasClass("checked")){
        $(".join-btn").prop("type", "button");
        console.log("회원가입 X");
    }else{
        $(".join-btn").prop("type", "submit");
    }
}



$(".join-btn").on('click', function(){
    if($("div.invalid-feedback-name").html() != ""){
        alert('이름을 입력하세요!')
    } else if($("div.invalid-feedback-email").html() != ""){
        alert('이메일을 입력하세요!')
    } else if($("div.invalid-feedback-password").html() != ""){
        alert('비밀번호를 입력하세요!')
    } else if($("div.invalid-feedback-phonenum").html() != ""){
        alert('휴대 전화 번호를 입력하세요!')
    } else if(!$("#agree-terms").hasClass("checked")){
        alert('이용약관, 개인정보 수집 및 이용에 동의해주세요!')
    } else if(!$("#agree-14").hasClass("checked")){
        alert('만 14세 이상 (필수)에 동의해주세요!')
    }
});