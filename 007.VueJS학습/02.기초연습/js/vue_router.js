// 뷰라우터를 위한 뷰인스턴스 생성 JS - vue_router.js

// 라우터 셋팅 가져오기
import router from "./router.js";
// import 시 {} 없이 변수를 쓰면 default로 받아들임
// {}를 쓰면 여러 변수를 list로 보내는 느낌!

// 뷰 라우터에서 사용할 링크 셋팅 데이터
const linkData = {
    "세계여행사": { path: "/trip" },
    "세계먹거리": { path: "/foods" },
    "피자": { name: "umsik", params: { item: "피자", cls: "pizza" } },
    "파스타": { name: "umsik", params: { item: "파스타", cls: "pasta" } },
    "똠양꿍": { name: "umsik", params: { item: "똠양꿍", cls: "ddom" } },
};
// 실제로 사용할 것은 linkData2임, 위의 것과 비교하면 구조화한 데이터가 아래 데이터
// 하위메뉴 구조화 데이터 객체
const linkData2 = {
    "세계여행사": {
        link:{ path: "/trip" },
        menu:[]
    },
    "세계먹거리": {
        link:{ path: "/foods" },
        menu:{
            "피자": { 
                name: "umsik", 
                params: { item: "피자", cls: "pizza" } },
            "파스타": { 
                name: "umsik", 
                params: { item: "파스타", cls: "pasta" } },
            "똠양꿍": { 
                name: "umsik", 
                params: { item: "똠양꿍", cls: "ddom" } },

        }
    },
};

// 뷰 인스턴스 객체 생성하기 // 
new Vue({
    // 대상 요소
    el: '#app',
    // 라우터 인스턴스 등록 필수!!
    // 라우터 상단에 import 된 router임,
    router, 
    // 데이터 영역
    data:{
        // 외부데이터를 뷰 인스턴스 내부에 데이터화 한다!!
        linkData : linkData2, // 하위메뉴 구조 데이터로 변경
    }, // data
    // DOM구성 후 첫페이지 라우터 설정하기
    mounted(){
        this.$router.push('/trip');
        // this는 현재 뷰 인스턴스 
        // $router는 라우터 전체객체
        // push(경로) : 강제 경로 이동
    }

}); // 뷰 인스턴스 //