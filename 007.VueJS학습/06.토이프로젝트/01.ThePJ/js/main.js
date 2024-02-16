// 더진한 PJ 메인 js
import { banData } from "./bannerData.js";

// 뷰 인스턴스 생성 메서드
const makeVue = (x) => new Vue({ el: x });

const navList = ["회사소개", "제품안내", "제휴문의", "고객센터", "레시피"];
let i = -1;
// 뷰 메뉴 컴포넌트
Vue.component("nav-comp", {
  template: `
        <li v-text="menu"></li>
    `,
  data: function () {
    return {
      menu: `${this.gnbMenu()}`,
    };
  },
  methods: {
    gnbMenu() {
      i++;
      return navList[i];
    },
  },
}); // 메뉴 컴포넌트

// 뷰 로고 컴포넌트
Vue.component("logo-comp", {
  template: `
        <div><img v-bind:src='logosrc' alt='더진한로고이미지' /></div>
    `,
  data() {
    return {
      logosrc: `./images/theBase/001.png`,
    };
  },
}); // 로고 컴포넌트

// 뷰 검색창 컴포넌트
Vue.component("sch-comp", {
  template: `
    <div class='sch-box'>
    <input type="text" name="sch" id="sch-box" maxlength="10">
    </input>
    <button><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    `,
}); // 검색창 컴포넌트

// 뷰 햄버거버튼 컴포넌트
Vue.component("side-comp", {
  template: `
    <div>
        <a href="" class="moblie-btn">
            <div></div>
            <div></div>
            <div></div>
        </a>
    </div>
    `,
}); // 햄버거버튼 컴포넌트
// 뷰 인스턴스 생성
makeVue(".nav ul");

// 하단 구현 컴포넌트
Vue.component("footer-comp", {
  template: `
  <div class="footer-info inbox">
    <!-- 고객센터 / 배송정보 -->
    <div class="info-top">
      <dl>
        <dt class='info-title'>고객센터</dt>
        <dd>02-853-8176</dd>
        <dd>
          <span>평일 09:00 - 18:00</span>
          <span>점심 11:30 - 12:30</span>
          <span>(주말/공휴일 휴무)</span>
        </dd>
      </dl>
      <dl>
        <dt class='info-title'>배송정보</dt>
        <dd>배송조회 롯데 택배</dd>
      </dl>
    </div>
    <div class="info-bottom">
      <!-- 회사정보 -->
      <div class="co-info">
        <ul>
          <li>그린푸드메이커 대표 : 허정규</li>
          <li>주소 : 경기도 안양시 만안구 일직로 94번길 3, 신화타워 8층</li>
          <li>D.C : 강원도 횡성군 우천면 전재로 160</li>
          <li>전화 : 02-853-8176</li>
          <li>팩스 : 031-441-2203</li>
          <li>사업자등록번호 : 381-86-01902</li>
          <li>통신판매신고번호 : 제 2020-강원횡성-103호</li>
          <!-- 권한정보 -->
          <span>
          Copyright © 더진한 All rights reserved.
          </span>
        </ul>
        <!-- 로고 -->
          <div class="footer-logo">
            <!-- 로고컴포넌트 -->
            <logo-comp></logo-comp>
          </div>
      </div>
    </div>
 </div>
  `,
}); // 하단 컴포넌트
// 뷰 인스턴스 생성
makeVue("#footer");

// 메인 배너 컴포넌트
Vue.component("banner-comp", {
  template: `<div class='banner-box'>
  <swiper-container class="mySwiper" slides-per-view="auto" loop="true" space-between="30" pagination="true" pagination-clickable="true">
  <!-- 개별배너 -->
  <swiper-slide v-for="val in this.listData" class=''>
    <!-- 배너 이미지 전체박스 -->
    <figure>
      <img v-bind:src="val['isrc']" alt='배너이미지1'>
    </figure>
    <!-- 배너 이미지 설명 -->
    <figcaption>
      <ul class='inbox'>
        <li class='tag'>{{val["tag"]}}</li>
        <li class='bold-tit'>{{val["bold-tit"]}}</li>
        <li class='light-tit'>{{val["light-tit"]}}</li>
        <li class='i-tit'>{{val["i-tit"]}}</li>
        <li class='detail'>{{val["detail"]}}</li>
        <button class="view-btn" v-if="val['view-btn']!== ''">{{val["view-btn"]}}</button>
      </ul>
    </figcaption>
  </swiper-slide>
</swiper-container>
<div class="swiper-pagination"></div>
  </div>`,
  data(){
    return{
      listData : banData,
    };
  },
});

const titleData = {
  '베스트 상품':'가장 사랑받는 추천제품!',
  '더진한 레시피':'정말 쉽고 간편한 더진한 비밀 레시피!',
  '한국 카페쇼 주요 참여업체 선정!':'35개국 672개사 3,533여개 브랜드 참여하는 글로벌 전시회'
}
// 상품파트 타이틀 구성 컴포넌트
Vue.component("part-tit-comp", {
  template:`
  <div class='inbox'>
    <ul class='part-title'>
      <li>{{tit1}}</li>
      <li>{{tit2}}</li>
    </ul>
  </div>
  `,
  props:['part-tit'],
  data(){
    return{
      tit1:this.partTit,
      tit2:titleData[this.partTit],
    }
  },
});

const bestItemData = {
  '허니자몽블랙티':{
    src:'./images/prod/010.png',
    tit:'허니자몽블랙티 고농축 베이스',
    sub:'달콤~ 쌉싸름! 기분 좋아지는 깊은 풍미!',
    sub2:'29,500원',
  },
  '패션후르츠':{
    src:'./images/prod/012.png',
    tit:'패션후르츠 고농축 베이스',
    sub:'동남아의 맛!까만 씨앗이 톡톡!',
    sub2:'29,500원',
  },
  '오미자':{
    src:'./images/prod/013.png',
    tit:'오미자 고농축 베이스',
    sub:'다섯가지 얼굴을 가진신비한 맛!',
    sub2:'29,500원',
  },
};
// 베스트 상품 컴포넌트
Vue.component('prod-comp',{
  template:`<li>
        <img :src="src" alt='상품이미지' />
        <h4>{{tit}}</h4>
        <h5>{{sub}}</h5>
        <h5>{{sub2}}</h5>
      </li>`,
  props:['prod-name'],
  data(){
    return{
      src:bestItemData[this.prodName].src,
      tit:bestItemData[this.prodName].tit,
      sub:bestItemData[this.prodName].sub,
      sub2:bestItemData[this.prodName].sub2,
    }
  },
});

const recipeBeverageData = [
  {
    src:'./images/theBase/016.png',
    part:'COFFEE',
    name:'자몽 카푸치노',
  },
  {
    src:'./images/theBase/017.png',
    part:'ADE',
    name:'레몬 체리 에이드',
  },
  {
    src:'./images/theBase/018.png',
    part:'COFFEE',
    name:'레몬 사케라또',
  },
  {
    src:'./images/theBase/019.png',
    part:'COFFEE',
    name:'레몬 아메리카노',
  },
];
// 더 진한 레시피 컴포넌트 
Vue.component('recipe-comp',{
  template:`<li>
    <img :src="src" alt='상품이미지' />
    <span v-text="part" class='part-name'></span>
    <span v-text="name" class='bev-name'></span>
  </li>
  `,
  props: {"data-num": Number},
  data: function(){
    return{
      src:`${this.bevList().src}`,
      part:`${this.bevList().part}`,
      name:`${this.bevList().name}`,
    };
  },
  methods: {
    bevList(){
      return recipeBeverageData[this.dataNum - 1];
    }
  }
});

const cafeshowData = [
  './images/theBase/029.png',
  './images/theBase/030.png',
  './images/theBase/031.png',
  './images/theBase/032.png',
]

// 홍보문 컴포넌트
Vue.component('promote-comp',{
  template:`
    <img :src="src" alt='카페쇼 이미지' />
  `,
  props: {'data-seq':Number},
  data: function(){
    return{
      src:`${this.imgList()}`,
    };
  },
  methods: {
    imgList(){
      console.log(this.dataSeq);
      return cafeshowData[this.dataSeq - 1];
    }
  }
})
// 뷰 인스턴스 생성
makeVue("main");
