// 문서의 모든 요소가 로드되면 자바스크립트 실행
    //이벤트 핸들러 추가
    window.onload = function(){

        // querySelectorAll는 리스트형태로 반환
        var cardNodeList = document.querySelectorAll(".card");
    
        //스프레드 연산자를 이용해서 NodeList를 Array로변환
        var cardArr=[...cardNodeList];
        //console.dir(cardArr);
        var colors = ['red','greed','blue','orange','pink','navy'];
        cardArr.forEach((item,idx)=>{
            console.log(item,idx);
            item.onclick = function(){
                //colsole.log(this);
                alert(idx);
                document.body.bgColor = colors[idx];
            }
    
        })
    
        
    }