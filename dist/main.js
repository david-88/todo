(()=>{class t{constructor(e){this.text=e,this.id=t.countInstances()}static countInstances(){return t.count=(t.count||0)+1,t.count}}class e extends t{constructor(t){super(t),this.taskList=[],this.active=!0}appendTask(t){this.taskList.push(t)}deleteTask(t){const e=this.taskList.findIndex((e=>e.id===t.id));this.taskList.splice(e,1)}update(t){this.text=t}}const n=new class{constructor(t,e,n,i){this.Task=e,this.Context=n,this.contextList=new i(this.Context),this.todoDisplay=new t,this.init()}init(){this.todoDisplay.onClickAddContext=this.onClickAddContext.bind(this),this.todoDisplay.onClickDeleteContext=this.onClickDeleteContext.bind(null,this),this.todoDisplay.onDclickEditContext=this.onDclickEditContext.bind(null,this),this.todoDisplay.onEnterSaveInput=this.onEnterSaveInput.bind(null,this),this.todoDisplay.initListeners(),this.loadStartPage()}onClickAddContext(){const t=this.todoDisplay.getContextInputValue();this.createNewContext(t)}loadStartPage(){this.activeContext=this.contextList.getActiveContext(),this.todoDisplay.renderAllContexts(this.contextList.getAllContexts())}createNewTask(t){const e=new this.Task(t);this.contextList.getActiveContext().appendTask(e)}createNewContext(t){const e=new this.Context(t);this.contextList.addNewContext(e),this.todoDisplay.appendNewContext(e)}onClickDeleteContext(t,e){const n=t.todoDisplay.getElementToDelete(e),i=t.todoDisplay.getItemId(n);t.contextList.deleteContext(i),t.todoDisplay.removeContext(n)}onDclickEditContext(t,e){t.todoDisplay.prepareContextEdit(e.target)}onEnterSaveInput(t,e){if("Enter"===e.key){const n=t.todoDisplay.getUserInput(e),i=t.todoDisplay.getContextElement(e),s=t.todoDisplay.getItemId(i),o=t.contextList.getIndexOfContext(s);t.contextList.list[o].update(n),t.todoDisplay.updateContextAfterEdit(i,n)}}removeTask(t){this.contextList.getActiveContext().deleteTask(t)}}(class{constructor(){this.contextContainer=document.getElementById("context-container"),this.contextInput=document.getElementById("context-input"),this.contextButton=document.getElementById("context-add"),this.taskContainer=document.getElementById("task-container"),this.taskInput=document.getElementById("task-input"),this.taskButton=document.getElementById("task-add"),this.onClickAddContext=null,this.onClickDeleteContext=null,this.onDclickEditContext=null,this.onEnterSaveInput=null}initListeners(){this.contextButton.addEventListener("click",this.onClickAddContext)}renderAllContexts(t){t.forEach(this.appendNewContext.bind(this))}appendNewContext(t){const e=this.createDelBtn(),n=this.createInnerContent(t.text,e),i=this.createContextElement(t.id,n);this.contextContainer.appendChild(i)}createContextElement(t,e){const n=document.createElement("p");return n.classList.add("context"),n.dataset.itemid=t,n.addEventListener("dblclick",this.onDclickEditContext),n.appendChild(e),n}createDelBtn(){const t=document.createElement("button");return t.innerHTML="del",t.addEventListener("click",this.onClickDeleteContext),t}createInnerContent(t,e){const n=document.createElement("div"),i=document.createElement("span");return i.innerHTML=t,n.appendChild(i),n.appendChild(e),n}prepareContextEdit(t){const e=this.createInputBox(t);this.saveContextElements(t),this.createEditableElement(e)}createInputBox(t){const e=document.createElement("input"),n=t.firstChild.textContent;return e.type="text",e.placeholder=n,e.addEventListener("keyup",this.onEnterSaveInput),e}saveContextElements(t){this.contextElements=t.parentNode}createEditableElement(t){const e=this.contextElements.parentNode;e.firstChild.remove(),e.appendChild(t)}removeContext(t){t.remove()}updateContextAfterEdit(t,e){this.contextElements.firstChild.innerHTML=e,t.firstChild.remove(),t.appendChild(this.contextElements)}getElementToDelete(t){return t.target.parentNode.parentNode}getItemId(t){return t.dataset.itemid}getContextInputValue(){return this.contextInput.value}getContextElement(t){return t.target.parentNode}getUserInput(t){return t.target.value}renderTasks(t){}},class extends t{constructor(t){super(t),this.favorite=!1}},e,class{constructor(t){this.Context=t,this.list=[],this.init()}init(){const t=new e("inbox");this.addNewContext(t),this.setActiveContext(t)}addNewContext(t){this.list.push(t)}deleteContext(t){const e=this.getIndexOfContext(t);this.list.splice(e,1)}getContext(t){const e=this.getIndexOfContext(t);return this.list[e]}getIndexOfContext(t){return t=parseInt(t),this.list.findIndex((function(e){if(e.id===t)return!0}))}setActiveContext(t){this.activeContext=t}getActiveContext(){return this.activeContext}getAllContexts(){return this.list}});n.createNewTask("taskA"),n.createNewTask("taskB"),n.createNewContext("contextB"),n.createNewContext("contextC")})();
//# sourceMappingURL=main.js.map