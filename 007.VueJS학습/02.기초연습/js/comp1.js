// 01. 컴포넌트 연습 JS

// 뷰JS 인스턴스 생성용 함수 : 부모컴포넌트
const makeVue = (x) => new Vue({ el: x }); // x는 대상요소

// 1. 제목에 넣을 전역 컴포넌트 만들기
// Vue.component(캐밥케이스 컴포넌트 태그명,{옵션}) 이것으로 생성
Vue.component("tit-comp", {
  template: `
        <strong>
            <span>
                🧚‍♀️Vue JS 컴포넌트 : 
            </span>
            쇼핑몰 갤러리 리스트
        </strong>
    `,
}); // 전역 컴포넌트 1

// 컴포넌트를 먼저 만들고 나서 뷰 인스턴스 생성하기
makeVue(".tit");

// 이미지 번호 숫자 증감 변수
let inum = 0;
// 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];


// 2. 그리드 레이아웃 상품박스 컴포넌트 만들기
Vue.component("list-comp", {
  // 2-1. template옵션 : 태그 구성을 잡아줌
  // src속성을 셋팅 된 변수를 적용하기 위해 속성 앞에 v-bind:을 붙여서 v-bind:src로 쓰면
  // 값으로 문자형을 써도 그 안의 값은 변수가 된다!!!!(***중요)
  template: `
    <div>
        <img v-bind:src="gsrc" alt="dress" />
        <aside>
          <h2 v-text='gname'></h2>
          <h3 v-text='gprice'></h3>
        </aside>
    </div>
  `,
  // 2-2. data옵션 : 컴포넌트 내부변수 세팅
  // 실행원리 : 컴포넌트가 빌드할 때 data속성의 함수를 호출한다!
  // 그래서 리턴되는 객체값이 컴포넌트 내부에 전달된다.
  data: function(){
    // 템플릿에서 사용할 변수를 객체형으로 반드시 리턴한다!!!
    // 속성:값
    return{
        // 이미지경로
        gsrc:`images/${this.setNum()}.jpg`,
        // 상품명
        gname:`${this.setName()}`,
        // 상품가
        gprice:`￦${this.setPrice()}`,
    }
  },
  // 2-3. methods옵션 : 컴포넌트 내부 메서드 세팅
  methods: {
    // inum을 1씩 증가하여 리턴함
    setNum(){
        inum +=1;
        console.log('inum:',inum);
        return inum;
    },
    setName(){
        // 상품명 랜덤수
        let randomGoodsNum = Math.floor(Math.random() * 4);
        return goods[randomGoodsNum];
    },
    setPrice(){
        // 가격 랜덤수 4~20사이 난수 곱
        let randomPriceNum = Math.ceil(Math.random() * 17) + 3;
        return this.numberWithCommas(randomPriceNum+'0000');
    },
    // 정규식 함수(숫자 세자리마다 콤마해주는 기능)
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
}); // 전역 컴포넌트 2

// 리스트뷰 인스턴스 생성하기
makeVue('.grid');

// 유튜브 아이프레임 컴포넌트 //
Vue.component('ifr-comp',{
    template:`
        <iframe
        width="49%"
        style="aspect-ratio: 16/9"
        v-bind:src="isrc"
        v-bind:title="itit"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
         ></iframe>
    `,
    // data:function(){
    data(){
        return{
            isrc:`https://www.youtube.com/embed/ZH1Y1l1OmTY?autoplay=1&mute=1&loop=1&playlist=ZH1Y1l1OmTY`,
            itit:`#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩`,
        }
    },
});

// 부모컴포넌트 인스턴스 생성하기 //
makeVue('.iframe-box');