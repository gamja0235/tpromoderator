class Initial {
    #hashs = '';
    #modeExplain = new Object();
    #loadState = "NOLOAD";
    #modeList = ["manualReview", "dobaeAutoRemove", "blockedWordsSetting", "ALLMODE"];
    
    constructor() {
        fetch("./data/modeExplain.json")
        .then((data) => data.json())
        .then((obj) => {
          this.#modeJson(obj);
        })
        this.#hashs = opener.hashs;
        opener.close()
    }
    
    #modeJson(obj) {
        this.#modeExplain = obj
        this.#loadState = "DONE"
        this.#modeExplainInit()
        //this.#radioInit()
    }
    
    getHashs() {
        return this.#hashs
    }
    
    getModeExplain() {
        return this.#modeExplain
    }
    
    getExplainString(mode = "manualReview") {
        if (this.getLoadState() == "DONE") {
            if (this.#modeList.indexOf(mode) > -1) {
                return (mode==this.#modeList[3]?this.#modeExplain:this.#modeExplain[mode])
            } else {
                return "null"
            }
        }
    }
    
    getLoadState() {
        return this.#loadState
    }
    
    #modeExplainInit() {
        let modeCopy = this.#modeExplain
        let ml = this.#modeList.slice(0,3)
        ml.forEach((x) => {
            modeCopy[x] = modeCopy[x].replace(/⌒/g, ' ')
        })
        this.#modeExplain = modeCopy
    }
    
    /*#radioInit() {
        let radios = document.querySelectorAll('input[name="modes"]');
        let label = document.querySelector('label[id="modeExplanation"]');
        radios.forEach((rs)=>{
            rs.addEventListener("change", (e) => {
                const current = e.currentTarget;
                if(current.checked) {
                    let val = current.value;
                    if (this.#modeList.indexOf(val) > -1) {
                        label.innerText = this.#modeExplain[val].replace(/다\.\s/gu, '다.\n')
                    } else {
                        console.log('오류');
                    }
                }
            });
        });
        let checked = document.querySelector('input[name="modes"]:checked');
        checked.removeAttribute('checked');
        checked.click();
    }*/
}

// 강제 창 크기 조절
window.onresize = (_=>{
    if (window.innerWidth == window.screen.width) {
        alert('전체화면 사용은 권장하지 않습니다.')
    } else {
        window.resizeTo(750,1400)
    }
})
//document.querySelector('input[name="modes"]:checked').value;

// 라디오 등등 초기화 클래스-인스턴트
let init = new Initial();
let modes = {
    'modeExplain': init.getModeExplain(),
    '#loadState': init.getLoadState(),
    'modeList': ["manualReview", "dobaeAutoRemove", "blockedWordsSetting", "ALLMODE"],
    'radioInit': function() {
        let radios = document.querySelectorAll('input[name="modes"]');
        let label = document.querySelector('label[id="modeExplanation"]');
        radios.forEach((rs)=>{
            rs.addEventListener("change", (e) => {
                const current = e.currentTarget;
                if(current.checked) {
                    let val = current.value;
                    if (this.modeList.indexOf(val) > -1) {
                        label.innerText = this.modeExplain[val].replace(/다\.\s/gu, '다.\n')
                    } else {
                        console.log('오류');
                    }
                }
            });
        });
        let checked = document.querySelector('input[name="modes"]:checked');
        checked.removeAttribute('checked');
        checked.click();
    }
}
modes.radioInit();
//delete initial;
//init = 'undefined';
