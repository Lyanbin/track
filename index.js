import { before, track } from './src/track'

class App {
    
    @track(before(() => { console.log(1) }))
    test() {
        console.log('test');
    }

}

const A = new App();
A.test();


// 这里parcel对装饰符支持有毛病，hack一下。
export default {
    before,
    track
}