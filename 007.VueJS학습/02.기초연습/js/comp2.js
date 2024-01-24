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

  // 자식컴포넌트는 실제로 있는 이벤트만 사용 가능함
  // 부모는 자식의 methods를 연결 할 수 있음(v-on:으로 이벤트명이 이상해도 가능함)
  template: `
    <div>
        <img
            v-on:click='goPapa("나는 공유!!")' 
            v-bind:src="gsrc" alt="dress" />
        <aside>
          <h2 
            v-text='gname'
            v-on:mouseover='overPapa({이름:"김고은",나이:"34살"})'
          ></h2>
          <h3 
            v-text='gprice'
            v-on:click='goPapa("나는 김수현!!")' 
            ></h3>
        </aside>
    </div>
  `,
  // 2-2. props옵션 : 부모 인스턴스 요소에서 v-bind:속성명=값으로 전달한
  // 속성변수를 받는 옵션!!!
  // 사용법 -> props : [데이터,]/{데이터:데이터형,}로 받음
  // 데이터형 일치안되면 에러발생
  props:{
      'data-num':Number,'end-let':String,
  },
  // props로 셋팅한 부모전달 속성을 this키워드로 사용할때 캐믈케이스로 사용하면 된다
  // 'data-num' ->>> this.dataNum
  // 2-3. data옵션 : 컴포넌트 내부변수 세팅
  // 실행원리 : 컴포넌트가 빌드할 때 data속성의 함수를 호출한다!
  // 그래서 리턴되는 객체값이 컴포넌트 내부에 전달된다.
  data: function(){
    // 템플릿에서 사용할 변수를 객체형으로 반드시 리턴한다!!!
    // 속성:값
    return{
        // 이미지경로
        gsrc:`images/${this.dataNum}.jpg`,
        // 상품명
        gname:`DE${this.setName()+this.endLet}`,
        // 상품가
        gprice:`￦${this.setPrice()}`,
    }
  },
  // 2-4. methods옵션 : 컴포넌트 내부 메서드 세팅
  methods: {
    // 자식메서드에서 부모 메서드를 호출한다
    goPapa(txt){
        // $emit(부모가 만든 이벤트 명, 전달값)
        // 부모가 만든 이벤트 명은 여기서 hull
        this.$emit('hull',txt);
        // 과정 : 자식이벤트인 'click'가 부모컴포넌트에 세팅 된
        // hull 이벤트로 전달되어 연결된 함수가 실행된다.
    },
    overPapa(map){
        this.$emit('got-kimchi',map);
    },
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
// makeVue('.grid');
// [ 부모컴포넌트에서 메서드 설정을 해야 
// 자식컴포넌트가 호출할 수 있는 메서드가 만들어진다 ]
// 부모 컴포넌트
new Vue({
    el: '.grid',
    // 부모 뷰 인스턴스 메서드 구역
    methods:{
        // 자식 이벤트 전달 후 실행메서드
        goMsg(txt){
            alert(txt+'자식이 부모에게 이벤트 전달 성공!!');
        },
        // 자식컴포넌트에 오버 이벤트가 전달되어 호출하는 메서드
        overMsg(map){
            alert(map.이름+map.나이);
        },
    },
});

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
    props:['data-link'],
    // data:function(){
    data(){
        return{
            isrc:`https://www.youtube.com/embed/${this.dataLink}?autoplay=1&mute=1&loop=1&playlist=${this.dataLink}`,
            itit:`#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩`,
        }
    },
});

// 부모컴포넌트 인스턴스 생성하기 //
makeVue('.iframe-box');