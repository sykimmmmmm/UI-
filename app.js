const navcontainer = document.querySelector('.searchBox')//네비
const nav = navcontainer.querySelectorAll('.search')//네비목록
const runway = document.getElementById('runway')//런웨이영상세션
const lookbook = document.getElementById('lookbook')//룩북세션
const lookbookContainer = lookbook.querySelector('.items')//룩북아이템컨테이너
const lookMoreBtn = document.querySelector('.more-btn')//룩북더보기버튼

const creditContainer = document.querySelector('.credit-container')
const credit = creditContainer.querySelector('.group-container')//크레딧
const creditGroups = credit.querySelectorAll('.group') 
const creditGroup = credit.querySelector('.group')//크레딧 목록 그룹
const creditControl = document.querySelector('.control-btns')
const creditPrev = creditControl.querySelector('.prev')
const creditPage = creditControl.querySelector('.pagenation') 
const creditNext = creditControl.querySelector('.next')
const body = document.querySelector('.body') 

const shop = document.getElementById('shop')//숍 세션
const lastSeason = document.getElementById('last-season')//라스트시즌세션

const lookbookHeight = 1520//룩북세션의 원 높이
let isDown =false
let scrollLeft
let startX
let isOver = false
let isRight =false

// console.log(lookbookContainer.scrollHeight)


// 룩북 목록 더보기
function moreLookBook(){
    lookbook.classList.toggle('more')
    if(lookbook.classList.contains('more')){
        lookbook.style.height = lookbookContainer.scrollHeight+'px'
        lookMoreBtn.innerText = 'CLOSE'
    }else{
        lookbook.style.height = lookbookHeight+'px'
        lookMoreBtn.innerText = 'SEE ALL THE LOOKS'
    }
}


// 크레딧 슬라이드
function moveToLeft(){
    // console.log(creditGroup.clientWidth)
    creditContainer.scrollLeft += creditGroup.clientWidth
    creditPage.innerText = `2/${creditGroups.length}`
    creditNext.disabled = true
    creditPrev.disabled = false
    
}

function moveToRight(){
    // console.log('click')
    creditContainer.scrollLeft -= creditGroup.clientWidth
    creditPage.innerText = `1/${creditGroups.length}`
    creditNext.disabled = false
    creditPrev.disabled = true

}

function handleMouseDown(e){
    // console.log('down')
    isDown = true
    startX = e.pageX
    scrollLeft = creditContainer.scrollLeft
}

function handleMouseMove(e){
    if(!isDown)return
    const walk = e.pageX - startX
    const walk2vw = px2vw(Math.abs(walk))
    creditContainer.scrollLeft = scrollLeft - walk
    if(walk>0){
        isRight =true
        if(walk2vw>50){
            moveToRight()
            isOver = false
        }else{
            creditContainer.scrollLeft = scrollLeft-walk
            isOver = true
        }
    }else{
        if(walk2vw>50){
            moveToLeft()
            isOver = false
        }else{
            isOver = true
            creditContainer.scrollLeft = scrollLeft-walk
        }
    }
    
}

function handleMouseUp(){
    // console.log('up',isOver)
    isDown = false
    if(isOver){
        if(isRight){
            creditContainer.scrollLeft = creditContainer.scrollWidth
            isRight=false
        }else{
            creditContainer.scrollLeft = 0
        }
    }
}

function handleMouseLeave(){
    isDown = false
    // console.log('leave')
}


function px2vw(px){
    return px / creditGroup.clientWidth * 100
}
//아이템 생성
function createItem(){
    for(let i=1;i<=65;i++){
        const modal =document.createElement('div')
        modal.id=`${i}`
        modal.className = 'item'
        modal.innerHTML = `
        <p>${i}</p>
        <img src="/imgs/model-${i}.jpg" alt="">
        `
        lookbookContainer.appendChild(modal)
    }

}

const modalContainer = document.querySelector('.modal-container')
function createModal(){
    for(let i=1;i<=65;i++){
        const modal = document.createElement('div')
        modal.id=`${i}`
        modal.className = 'model'
        modal.innerHTML = `
        <div class='modal-img'>
            <img src="/imgs/model-${i}.jpg" alt="">
        </div>
        <div class="modal-text">
            <p>FALL/WINTER 2024</p>
            <p>JULIA</p>
        </div>
        `
        modalContainer.appendChild(modal)
    }
}

createModal()//모달창 아이템 생성
createItem()//룩북아이템생성
const modal = document.querySelector('.lookbook-modal')
const exit = modal.querySelector('.exit')
const showModel = modal.querySelector('.show-model')
const modalPrev = modal.querySelector('.modal-prev')
const modalNext = modal.querySelector('.modal-next')


const lookItems = lookbookContainer.querySelectorAll('.item')
const modalItems = modalContainer.querySelectorAll('.model')
console.log(lookItems)
let scrollY

// console.log(lookItems)
function closeModal(){
    modal.classList.add('hide')
    body.classList.remove('hide')
    document.documentElement.scrollTo(0,scrollY)
    modalContainer.scrollLeft = 0
}
// console.log(lookItems[1].id)

function openModal(e){
    scrollY = document.documentElement.scrollTop
    modal.classList.remove('hide')
    body.classList.add('hide')
    // console.log(e.target.parentNode.id)
    for(let i=0;i<lookItems.length;i++){
        if(e.target.parentNode.id===modalItems[i].id){
            modalContainer.scrollLeft = modalItems[i].clientWidth*i
        }  
    }
    // console.log(scrollY)
    
}
function moveLeft(){
    // console.log('click')
    modalContainer.scrollLeft += modalItems[0].getBoundingClientRect().width
}
function moveRight(){
    // console.log(modalContainer.scrollWidth,modalItems[0].getBoundingClientRect().width)
    modalContainer.scrollLeft -= modalItems[0].getBoundingClientRect().width
}

let walk = 0

function MouseDown(e){
    isDown=true
    startX = e.pageX
}
function MouseMove(e){
    if(!isDown)return
    walk = e.pageX - startX
    // console.log(walk)

}
function MouseUp(){
    if(walk<-50){
        moveLeft()
    }else if(walk>50){moveRight()}
    isDown=false
}
function MouseLeave(){
    isDown=false
}


const documentHeight = document.documentElement.clientHeight
const navMenus = document.querySelectorAll('.menu')


function navAnime(){
    for(let menu of navMenus){
        let offset = menu.getBoundingClientRect().top
        // console.log(menu)
        // console.log(menu.getBoundingClientRect().bottom)
        if(offset<150&&menu.getBoundingClientRect().bottom>100){
            for(let i = 0;i<nav.length;i++){
                if(menu.id===nav[i].innerText.toLowerCase()){
                    nav[i].classList.add('on')
                }
            }  
        }else{
            for(let i = 0;i<nav.length;i++){
                if(menu.id===nav[i].innerText.toLowerCase()){
                    nav[i].classList.remove('on')
                }
            }
        }
    }
}



creditPrev.addEventListener('click',moveToRight)//크레딧 슬라이드
creditNext.addEventListener('click',moveToLeft)//크레딧 슬라이드
creditContainer.addEventListener('mousedown', handleMouseDown)//크레딧 슬라이드
creditContainer.addEventListener('mousemove', handleMouseMove)//크레딧 슬라이드
creditContainer.addEventListener('mouseup', handleMouseUp)//크레딧 슬라이드
creditContainer.addEventListener('mouseleave', handleMouseLeave)//크레딧 슬라이드
lookMoreBtn.addEventListener('click',moreLookBook)//룩북아이템 확장


for (const item of lookItems) {
    item.addEventListener('click',openModal)//모달 열기
}
exit.addEventListener('click',closeModal)//모달닫기
modalPrev.addEventListener('click',moveRight)//모달 슬라이드
modalNext.addEventListener('click',moveLeft)//모달 슬라이드
modalContainer.addEventListener('mousedown', MouseDown)//모달 슬라이드
modalContainer.addEventListener('mousemove', MouseMove)//모달 슬라이드
modalContainer.addEventListener('mouseup', MouseUp)//모달 슬라이드
modalContainer.addEventListener('mouseleave', MouseLeave)//모달 슬라이드
window.addEventListener('scroll',navAnime)//네비게이션 하이라이트
