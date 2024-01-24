// 더진한 PJ 메인 js

// 뷰 인스턴스 생성 메서드
const makeVue = (x) => new Vue({ el: x });

const navList = ["회사소개", "제품안내", "제휴문의", "고객센터", "레시피"];
let i = -1;
// 뷰 메뉴 컴포넌트
Vue.component("nav-comp", {
  template: `
        <li v-text="menu"></li>
    `,
  data:function(){
    return{
        menu:`${this.gnbMenu()}`,
    };
  },
  methods:{
    gnbMenu(){
        i++;
        return navList[i];
    },
  }
}); // 메뉴 컴포넌트
makeVue('.nav ul');

// 뷰 로고 컴포넌트
Vue.component('logo-comp',{
    template:`
        <li><img v-bind:src='logosrc' alt='더진한로고이미지' /></li>
    `,
    data(){
        return{
            logosrc:`./images/theBase/001.png`
        }
    },
}); // 로고 컴포넌트
makeVue('.nav ul');

// 뷰 검색창 컴포넌트
Vue.component('search-comp',{
    template:``,
    
});