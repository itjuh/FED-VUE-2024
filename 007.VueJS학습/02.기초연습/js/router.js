// 뷰라우터 인스턴스 설정파일 - router.js

// 라우터 템플릿 만들기 : 내용 컴포넌트
let Trip = {
    template: `<div class="trip router">World Trip</div>`,
};
let Foods = {
    template: `
    <div v-bind:class="
        'foods router '+this.$route.params.cls
    ">
        World Foods {{ this.$route.params.item }}
    </div>`,
};
/**
 * 파라미터로 전달 된 라우터 값을 읽는 코드법
 * this.$route.params.item
 * 1. this.는 현재 라우터를 사용하는 뷰 인스턴스
 * 2. $route 는 현재 연결 된 라우트 정보객체
 * 3. params 는 라우트 하위 파라미터 전달속성
 * 4. item/cls는 전달 파라미터의 키
 */

// 뷰 라우터 인스턴스 생성하여 내보내기
export default new VueRouter({ // 1 개 내보내기  :  받을 때 import router from '경로'
// export const router = new VueRouter({ // default없이 보내기 : 받을 때 import {router} from '경로' 로 받기
// const router = new VueRouter({ // 변수에 담으면 별도로 export 해야한다!!
    routes : [
        // 첫번째 루트
        {
            path:'/trip',
            component:Trip,
        },
        // 두번째 루트
        {
            path:'/foods',
            component:Foods,
        },
        // 두번째 루트의 파라미터 버전 루트 추가!!
        {
            // 파라미터를 받는 같은 path의 루트는
            // 호출과 구분을 위해 반드시 name 속성을 설정해야함!!
            name: 'umsik',
            path: '/foods:item',
            // 경로뒤에 콜론(:)을 쓰고 뒤에 파라미터 변수를 씀
            component: Foods,
        },
    ]
});

// 변수에 담은 경우 별도로 보내야함
// export default router;