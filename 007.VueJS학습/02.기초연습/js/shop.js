// 쇼핑몰 갤러리 JS - shop.js

// 템플릿 html코드 객체 JS 가져오기
import hcode from "./hcode.js";

// 뷰JS 인스턴스 생성용 함수!
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역컴포넌트 만들기
Vue.component("tit-comp", {
  template: hcode.tit,
}); // 전역 컴포넌트

// 뷰 인스턴스 생성하기
makeVue(".tit");

// 이미지 번호 숫자 증감 변수
let inum = 0;
// 세일가 저장을 위한 임시 변수
let randomPriceNum;
// 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];

// 2. 그리드 레이아웃 상품박스 컴포넌트 만들기
Vue.component("list-comp", {
  // 2-1. template옵션 : 태그 구성을 잡아줌
  // src속성을 셋팅 된 변수를 적용하기 위해 속성 앞에 v-bind:을 붙여서 v-bind:src로 쓰면
  // 값으로 문자형을 써도 그 안의 값은 변수가 된다!!!!(***중요)

  // 자식컴포넌트는 실제로 있는 이벤트만 사용 가능함
  // 부모는 자식의 methods를 연결 할 수 있음(v-on:으로 이벤트명이 이상해도 가능함)
  template: hcode.list,
  // 2-2. props옵션 : 부모 인스턴스 요소에서 v-bind:속성명=값으로 전달한
  // 속성변수를 받는 옵션!!!
  // 사용법 -> props : [데이터,]/{데이터:데이터형,}로 받음
  // 데이터형 일치안되면 에러발생
  props: {
    "data-num": Number,
    "end-let": String,
  },
  // props로 셋팅한 부모전달 속성을 this키워드로 사용할때 캐믈케이스로 사용하면 된다
  // 'data-num' ->>> this.dataNum
  // 2-3. data옵션 : 컴포넌트 내부변수 세팅
  // 실행원리 : 컴포넌트가 빌드할 때 data속성의 함수를 호출한다!
  // 그래서 리턴되는 객체값이 컴포넌트 내부에 전달된다.
  data: function () {
    // 템플릿에서 사용할 변수를 객체형으로 반드시 리턴한다!!!
    // 속성:값
    return {
      // 이미지경로
      gsrc: `images/${this.dataNum}.jpg`,
      // 상품명 : this.dataNum이 짝수-😘/홀수-👍에 따라 아이콘 변경
      gname: `${this.setName()}` + "24" + `${this.dataNum}` + `${this.endLet}` + (this.dataNum % 2 ? "👍" : "😘"),
      // 상품가
      gprice: `${this.setPrice()}`,
      // 세일가격 : 원가*70%
      salePrice: (randomPriceNum * 0.7).toFixed(0),
      // 숫자.toFixed(자리수) 자리수-0 : 소수점아래 날리기
    };
  },
  // 2-4. methods옵션 : 컴포넌트 내부 메서드 세팅
  methods: {
    // inum을 1씩 증가하여 리턴함
    setNum() {
      inum += 1;
      console.log("inum:", inum);
      return inum;
    },
    setName() {
      // 상품명 랜덤수
      let randomGoodsNum = Math.floor(Math.random() * 4);
      return goods[randomGoodsNum];
    },
    setPrice() {
      // 가격 랜덤수 4~20사이 난수 곱
      randomPriceNum = (Math.ceil(Math.random() * 17) + 3) * 10000;
      return randomPriceNum;
    },
    // 세일여부 리턴함수
    isSale() {
      return (
        this.dataNum == 3 ||
        this.dataNum == 8 ||
        this.dataNum == 11 ||
        this.dataNum == 18 ||
        this.dataNum == 24 ||
        this.dataNum == 33 ||
        this.dataNum == 39 ||
        this.dataNum == 45
      );
    },
    // 정규식 함수(숫자 세자리마다 콤마해주는 기능)
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
}); // 전역 컴포넌트 2

// 리스트뷰 인스턴스 생성하기
// makeVue('.grid');
// [ 부모컴포넌트에서 메서드 설정을 해야
// 자식컴포넌트가 호출할 수 있는 메서드가 만들어진다 ]
// 부모 컴포넌트
new Vue({
  el: ".grid",
});

// 상품상세정보
Vue.component("win-comp", {
  template: hcode.detail,
}); // 상세정보 컴포넌트

// 3자리 수 콤마
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// win-comp 부모컴포넌트 뷰 인스턴스 생성
new Vue({
  el: ".pbg",
  // DOM이 모두 로딩 후 실행구역(리액트의 useLayoutEffect와 유사함)
  mounted() {
    // 제이쿼리 코드를 사용가능!!
    // 원래 가격변수
    let numberPrice;
    // 가격 변수 대상
    const inputSum = $("#sum");
    // 현재 리스트 순번 : 양쪽 이동버튼에서 사용
    let currentIdx;

    // 1. 갤러리 리스트 클릭 시 큰 이미지 박스 보이기
    $(".grid>div").on("click", function () {
      // console.log('대상!! : ',this);

      // 현재 리스트 순번 세팅하기
      currentIdx = $(this).index();
      console.log("클릭 된 리스트 순번!!", currentIdx);
      // 클릭 된 데이터 셋업
      let isrc = $(this).find("img").attr("src");
      console.log(isrc);
      // 상세정보창 큰 이미지 변경하기
      $(".gimg img").attr("src", isrc);

      // 가격 읽어오기
      let price = $("h3", this).html();
      // 현재판매가 읽어오기
      let currPrice = $("h3>span:last-child", this).html();
      // 가격 넣기
      $("#gprice").html(price);

      // 상품명 읽어오기
      // let currPrice = $(this).find('h3>span:last-child').html();
      let currName = $("h2", this).html();
      // 상품명 넣기
      $("#gtit").html(currName);

      // 최초 가격 총합계 넣기
      $("#total").html(currPrice);

      // 가격 숫자형으로 전환 -> 문자열.replace(바꿀놈,바뀔놈)
      // '￦',',' 모두 없애기
      numberPrice = Number(currPrice.replace("￦", "").replace(/,/g, ""));
      console.log(numberPrice);

      // input창 초기화
      inputSum.val(1);
      // 상세정보창 보이기
      $("#bgbx").show();
    }); // 리스트 이미지 보이기

    // 2 .가격 증감 설정
    $(".chg_num img").click(function () {
      let idx = $(this).index();
      // idx = 0 : 증가  idx = 1 : 감소
      let num = Number(inputSum.val());
      if (idx === 0) {
        num += 1;
        if (num > 10) num = 10;
      } else {
        num -= 1;
        if (num < 1) num = 1;
      }
      // input 업데이트
      inputSum.val(num);
      // 가격 수정
      $("#total").html("￦" + numberWithCommas(numberPrice * num));
    }); // 가격 증감 클릭

    // 3. 닫기버튼
    $(".cbtn").click((e) => {
      e.preventDefault();
      $("#bgbx").hide();
    }); // 닫기 클릭

    // 4. 전/후 버튼 클릭
    $(".abtn").click(function (e) {
      e.preventDefault();
      let isR = $(this).is(".rb");
      // 방향분기
      if (isR) {
        // 오른쪽
        ++currentIdx;
        if (currentIdx > 49) currentIdx = 0;
      } else {
        // 왼쪽
        --currentIdx;
        if (currentIdx < 0) currentIdx = 49;
      }
      // 정보타겟요소
      const target = $(".grid>div").eq(currentIdx);

      /**초기 세팅구역 - 대상 target */
      // 클릭 된 데이터 셋업
      let isrc = $(target).find("img").attr("src");
      // 상세정보창 큰 이미지 변경하기
      $(".gimg img").attr("src", isrc);

      // 가격 읽어오기
      let price = $("h3", target).html();
      // 현재판매가 읽어오기
      let currPrice = $("h3>span:last-child", target).html();
      // 가격 넣기
      $("#gprice").html(price);

      // 상품명 읽어오기
      // let currPrice = $(this).find('h3>span:last-child').html();
      let currName = $("h2", target).html();
      // 상품명 넣기
      $("#gtit").html(currName);

      // 최초 가격 총합계 넣기
      $("#total").html(currPrice);

      // 가격 숫자형으로 전환 -> 문자열.replace(바꿀놈,바뀔놈)
      // '￦',',' 모두 없애기
      numberPrice = Number(currPrice.replace("￦", "").replace(/,/g, ""));
      console.log(numberPrice);

      // input창 초기화
      inputSum.val(1);
    }); // 전/후 버튼 클릭
  },
});
