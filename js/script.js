let all = document.querySelectorAll('.header a');
let tasks = document.querySelectorAll('.tasks .a');
trans()
/*هذا الجزء بين الانتقال للactive بين جزء الرئيسى*/ 
function active(item){
    all.forEach((ele)=>{
        if(ele.classList.contains('activeTast')){
            ele.classList.remove('activeTast')
        }
    })
    item.classList.add("activeTast")
    trans()
}
function trans() {
    for(let i =0 ; i <= 2 ; i++){
        if(all[i].classList.contains('activeTast')){
            tasks.forEach(ele=>{
                ele.classList.replace('block','none')
            })
            tasks[i].classList.replace('none','block')
        }
    }
}


let arrTasks = [];
let done = [];
let pending = [];

if(localStorage.getItem('tasks')){
    let arr = JSON.parse(localStorage.getItem('tasks'));
    arr.forEach(ele=>{
        arrTasks.push(ele)
    })
    createContent()
}

function submit(){
    let contentInput = document.querySelector('.content');
    
    if(contentInput.value != ''){
        let obj = {
            value : contentInput.value,
            id : Math.floor(Math.random()*100000),
            done : false
        }
        arrTasks.push(obj)
        setItemtoLocalStorage(arrTasks)
        createContent()
    }
    

    contentInput.value='';
}

function createContent(){
    let getItem = JSON.parse(localStorage.getItem('tasks'));
    tasks[0].innerHTML = ' ';

        getItem.forEach((ele)=>{

            let createElement = document.createElement('div');
            createElement.classList.add('task','d-flex','justify-content-between','align-items-center','p-3');
            createElement.id = ele.id
            let createContent = document.createElement('div');
            createContent.classList.add('check-box','d-flex','align-items-center')

            let createInputInContent = document.createElement('input')
            createInputInContent.classList.add('form-check-input','me-3','h5','mb-0','shadow-none')
            createInputInContent.type = 'checkbox';
            createInputInContent.id = `C${ele.id}`

            let createP = document.createElement('p');
            createP.classList.add('text-capitalize');
            createP.setAttribute('col','20');
            createP.textContent = ele.value;
            
            
            createContent.appendChild(createInputInContent)
            createContent.appendChild(createP)
            createElement.appendChild(createContent)
            
            let createDropdown = document.createElement('div');
            createDropdown.classList.add('dropdown','ms-3')
            let createAttri= document.createAttribute('data-bs-toggle');
            createAttri.value = 'dropdown';
            
            let createButton = document.createElement('button');
            createButton.classList.add('btn','ms-auto');
            createButton.type='button';
            
            createButton.setAttributeNode(createAttri)
            
            let iconButton = document.createElement('i');
            iconButton.classList.add('fa-solid','fa-ellipsis','fs-3','text-secondary')
            
            createButton.appendChild(iconButton)
            createDropdown.appendChild(createButton)
            
            let createUl = document.createElement('ul');
            createUl.classList.add('dropdown-menu','py-2');

            let createLi2 = document.createElement('li');

            let createLink2 = document.createElement('a');
            createLink2.classList.add('dropdown-item', 'px-2','py-1' ,'text-danger' ,'d-flex' ,'justify-content-between' ,'align-items-center')
            createLink2.textContent = 'Delete'
            createLink2.id = `D${ele.id}`
            let createIconDelete = document.createElement('i');
            createIconDelete.classList.add('fa-solid' ,'fa-trash','pb-0' ,'text-danger')

            

            createLink2.appendChild(createIconDelete);
            createLi2.appendChild(createLink2);

            
            createUl.appendChild(createLi2)

            createDropdown.appendChild(createUl)
            createElement.appendChild(createDropdown)
            tasks[0].appendChild(createElement)




            deletetask(createLink2)
            donetask(createInputInContent)
            filteres(arrTasks)
            
        })
        
}

function deletetask(e){
    e.addEventListener("click",function(e){
        let taskss = JSON.parse(window.localStorage.getItem("tasks"));
        let m = taskss.filter((a)=> e.target.id != `D${a.id}`);
        setItemtoLocalStorage(m);
        savetoTask()
        filteres()
    })
}

function setItemtoLocalStorage(Arr){
    localStorage.setItem('tasks',JSON.stringify(Arr))
}

function savetoTask(){
    if(window.localStorage.length>0){
        if(window.localStorage.getItem.length>0){
            arrTasks =JSON.parse(window.localStorage.getItem("tasks"));
            createContent();
        }
    }
}

function donetask(e){
    e.addEventListener('click',function(e){
        if(e.target.checked){
            let taskss = JSON.parse(window.localStorage.getItem('tasks'));
            taskss.forEach((m)=>{
                if(e.target.id == `C${m.id}`){
                    m.done = true;
                }
                setItemtoLocalStorage(taskss)
                savetoTask()
            })
        }else{
            let taskss = JSON.parse(window.localStorage.getItem('tasks'));
            taskss.forEach((m)=>{
                if(e.target.id == `C${m.id}`){
                    m.done = false;
                }
                setItemtoLocalStorage(taskss)
                savetoTask()
            })
        }
    })
    let s = JSON.parse(window.localStorage.getItem('tasks'))
    s.forEach(m=>{
        if(m.done){
            if(e.id == `C${m.id}`){
                let createCheck = document.createAttribute('checked');
                createCheck.value = 'checked';
                e.setAttributeNode(createCheck)
            }
        }
    })
}

function clearAll(){
    arrTasks = [];
    setItemtoLocalStorage(arrTasks)
    filteres()
    createContent()
}



function filteres(){
     let arrTasks = JSON.parse(window.localStorage.getItem('tasks'))
     done = []
     pending = []
     tasks[1].innerHTML = ' ';
     tasks[2].innerHTML = ' ';
    
        arrTasks.forEach(ele=>{
            if(ele.done){
                done.push(ele)
                tasks[2].innerHTML = '';
                done.forEach(e=>{
                    let createElement = document.createElement('div');
                createElement.classList.add('task','my-2','d-flex','justify-content-between','align-items-center','fs-4','p-3');
                createElement.id = e.id
                let createP = document.createElement('p');
                createP.classList.add('text-capitalize');
                createP.textContent = e.value
                let createIcon = document.createElement('i');
                createIcon.classList.add('fa-solid','fa-check','text-success','fs-4')
                createElement.appendChild(createP)
                createElement.appendChild(createIcon)
                tasks[2].appendChild(createElement);
                
                })
            }else{
                pending.push(ele)
                tasks[1].innerHTML = '';
                pending.forEach(e=>{
                    let createElement = document.createElement('div');
                createElement.classList.add('task','d-flex','my-2','justify-content-between','align-items-center','fs-4','p-3');
                createElement.id = e.id
                let createP = document.createElement('p');
                createP.classList.add('text-capitalize');
                createP.textContent = e.value
                let createIcon = document.createElement('i');
                createIcon.classList.add('fa-solid','fa-xmark','text-danger','fs-4')
                createElement.appendChild(createP)
                createElement.appendChild(createIcon)
                tasks[1].appendChild(createElement);
                
                })
            }
        })
    
    
}





