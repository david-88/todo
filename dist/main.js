(()=>{"use strict";class t{constructor(e){this.text=e,this.id=t.countInstances()}static countInstances(){return t.count=(t.count||0)+1,t.count}}class e extends t{constructor(t){super(t),this.taskList=[],this.active=!0}appendTask(t){this.taskList.push(t)}deleteTask(t){console.log(this.taskList);const e=this.getIndexOfTask(t);this.taskList.splice(e,1),console.log(this.taskList)}getTask(t){const e=this.getIndexOfTask(t);return this.taskList[e]}getIndexOfTask(t){return t=parseInt(t),this.taskList.findIndex((function(e){return e.id===t}))}update(t){this.text=t}}new class{constructor(t,e,n,s){this.Task=e,this.Context=n,this.contextList=new s(this.Context),this.todoDisplay=new t,this.init()}init(){const t=this;this.todoDisplay.onClickAddContext=this.onClickAddContext.bind(this),this.todoDisplay.onClickAddTask=this.onClickAddTask.bind(this),this.todoDisplay.onClickDeleteItem=this.onClickDeleteItem.bind(null,this),this.todoDisplay.onClickChangeContext=function(){t.onClickChangeContext(this,t)},this.todoDisplay.onDclickEditItem=this.onDclickEditItem.bind(null,this),this.todoDisplay.onEnterSaveInput=this.onEnterSaveInput.bind(null,this),this.todoDisplay.onMsDwnCopyTask=function(){t.onMsDwnCopyTask(this,t)},this.todoDisplay.onMsUpAnalyzePosition=function(e){t.onMsUpAnalyzePosition(e,this,t)},this.todoDisplay.initListeners(),this.loadStartPage()}onClickAddContext(){const t=this.todoDisplay.getContextInputValue()||"Give me a name";this.createNewContext(t),this.todoDisplay.resetContextInput()}onClickAddTask(){const t=this.todoDisplay.getTaskInputValue()||"Give me a name";this.createNewTask(t),this.todoDisplay.resetTaskInput()}loadStartPage(){this.activeContext=this.contextList.getActiveContext();const t=this.contextList.getAllContexts(),e=this.activeContext.taskList;this.createNewTask("Double click me to edit my name"),this.createNewTask("Create a new list"),this.createNewTask("Click and hold me to move me to the new list"),this.todoDisplay.renderTasks(e),this.todoDisplay.renderAllContexts(t,this.activeContext),this.todoDisplay.setContextHeading(this.activeContext.text)}createNewTask(t){const e=new this.Task(t);this.contextList.getActiveContext().appendTask(e),this.todoDisplay.appendNewTask(e)}createNewContext(t){const e=new this.Context(t);e.onClickChangeContext=this.onClickChangeContext,this.contextList.addNewContext(e),this.todoDisplay.appendNewContext(e)}onClickDeleteItem(t,e){const n=t.todoDisplay.getElementToDelete(e),s=t.todoDisplay.getItemId(n),i=t.todoDisplay.getClassName(n);i.contains("context")?t.contextList.deleteContext(s):i.contains("task")&&(console.log("ClassName contains task"),t.contextList.activeContext.deleteTask(s)),t.todoDisplay.removeElement(n),e.stopPropagation()}onClickChangeContext(t,e){const n=e.todoDisplay.getItemId(t),s=e.contextList.getContext(n);this.contextList.setActiveContext(s);const i=s.taskList;this.todoDisplay.renderTasks(i),this.todoDisplay.highlightActiveContext(t),this.todoDisplay.setContextHeading(s.text)}onDclickEditItem(t,e){t.todoDisplay.prepareItemEdit(e.target)}onEnterSaveInput(t,e){if("Enter"===e.key){const n=t.todoDisplay.getUserInput(e),s=t.todoDisplay.getItemElement(e),i=t.todoDisplay.getItemId(s),o=t.todoDisplay.getClassName(s);if(o.contains("context")){const e=t.contextList.getIndexOfContext(i);t.contextList.list[e].update(n)}else if(o.contains("task")){const e=t.contextList.activeContext.getIndexOfTask(i);t.contextList.activeContext.taskList[e].text=n}t.todoDisplay.updateItemAfterEdit(s,n)}}onMsDwnCopyTask(t,e){e.todoDisplay.attachTaskToMouse(t)}onMsUpAnalyzePosition(t,e,n){if(e.classList.contains("context")){const s=n.contextList.getActiveContext(),i=n.todoDisplay.temporarySavedTaskElement,o=n.todoDisplay.getItemId(i),a=n.contextList.activeContext.getTask(o),l=n.todoDisplay.getItemId(e);n.contextList.getContext(l).appendTask(a),s.deleteTask(a),n.todoDisplay.removeElement(i),t.stopPropagation()}n.todoDisplay.undoTaskMoveActions()}removeTask(t){this.contextList.getActiveContext().deleteTask(t)}}(class{constructor(){this.bodyElement=document.querySelector("body"),this.contextContainer=document.getElementById("context-container"),this.contextInput=document.getElementById("context-input"),this.contextButton=document.getElementById("context-add-button"),this.taskContainer=document.getElementById("task-container"),this.taskList=document.getElementById("tasks"),this.taskInput=document.getElementById("task-input"),this.taskButton=document.getElementById("task-add-button"),this.taskHeading=document.getElementById("heading-task-container"),this.activeContext=null,this.onClickAddContext=null,this.onClickDeleteItem=null,this.onClickChangeContext=null,this.onDclickEditContext=null,this.onEnterSaveInput=null,this.onClickAddTask=null,this.onMsDwnCopyTask=null,this.onMsUpAnalyzePosition=null}initListeners(){this.contextButton.addEventListener("click",this.onClickAddContext),this.taskButton.addEventListener("click",this.onClickAddTask)}renderAllContexts(t,e){t.forEach(this.appendNewContext.bind(this)),this.activeContext=document.querySelector(`[data-itemid="${e.id}"]`),this.highlightActiveContext(this.activeContext)}appendNewContext(t){const e=this.createDelBtn(),n=this.createInnerContent(t.text,e),s=this.createItemElement(t.id,n,"context");s.addEventListener("click",this.onClickChangeContext),this.contextContainer.appendChild(s)}highlightActiveContext(t){this.activeContext.style.border="none",this.activeContext=t,t.style.border="1px solid black"}renderTasks(t){console.log(t),this.taskList.innerHTML="",t.forEach(this.appendNewTask.bind(this))}appendNewTask(t){const e=this.createDelBtn(),n=this.createInnerContent(t.text,e),s=this.createItemElement(t.id,n,"task");s.classList.add("task"),s.addEventListener("mousedown",this.onMsDwnCopyTask),this.taskList.appendChild(s)}createItemElement(t,e,n){const s=document.createElement("p");return s.dataset.itemid=t,s.classList.add(n),s.addEventListener("dblclick",this.onDclickEditItem),s.appendChild(e),s}createDelBtn(){const t=document.createElement("i");return t.classList.add("fa"),t.classList.add("fa-trash-o"),t.addEventListener("click",this.onClickDeleteItem),t}createInnerContent(t,e){const n=document.createElement("div"),s=document.createElement("span");return s.innerHTML=t,n.appendChild(s),n.appendChild(e),n}prepareItemEdit(t){const e=this.createInputBox(t);this.saveItemElements(t),this.createEditableElement(e)}createInputBox(t){const e=document.createElement("input"),n=t.firstChild.textContent;return e.type="text",e.value=n,e.addEventListener("keyup",this.onEnterSaveInput),e}saveItemElements(t){this.itemElements=t.parentNode}createEditableElement(t){const e=this.itemElements.parentNode;e.firstChild.remove(),e.appendChild(t),t.focus()}updateItemAfterEdit(t,e){this.itemElements.firstChild.innerHTML=e,t.firstChild.remove(),t.appendChild(this.itemElements)}attachTaskToMouse(t){const e=this.createTaskCopy(t);this.bodyElement.addEventListener("mousemove",this.moveTaskWithMouse.bind(null,this,e)),this.bodyElement.addEventListener("mouseup",this.onMsUpAnalyzePosition);const n=document.querySelectorAll(".context"),s=this;n.forEach((function(t){t.addEventListener("mouseover",s.onMsOverHighlight),t.addEventListener("mouseout",s.onMsOutNormal),t.addEventListener("mouseup",s.onMsUpAnalyzePosition)}))}onMsOverHighlight(){this.style.opacity="0.7"}onMsOutNormal(){this.style.opacity="1"}createTaskCopy(t){this.temporarySavedTaskElement=t;const e=this.temporarySavedTaskElement.cloneNode(!0);return e.id="task-copy",this.bodyElement.appendChild(e),e}moveTaskWithMouse(t,e,n){const s=n.x,i=n.y;e.style.position="absolute",e.style.top=i+"px",e.style.left=s+10+"px"}removeTaskCopy(){document.getElementById("task-copy").remove()}undoTaskMoveActions(){this.removeTaskCopy(),this.bodyElement.removeEventListener("mouseup",this.onMsUpAnalyzePosition);const t=document.querySelectorAll(".context"),e=this;t.forEach((function(t){t.removeEventListener("mouseover",e.onMsOverHighlight),t.removeEventListener("mouseout",e.onMsOutNormal),t.removeEventListener("mouseup",e.onMsUpAnalyzePosition),t.style.opacity="1"}))}setContextHeading(t){this.taskHeading.innerText=t}getItemId(t){return t.dataset.itemid}getItemElement(t){return t.target.parentNode}getContextInputValue(){return this.contextInput.value}resetContextInput(){this.contextInput.value=""}removeElement(t){t.remove()}getElementToDelete(t){return t.target.parentNode.parentNode}getTaskInputValue(){return this.taskInput.value}resetTaskInput(){this.taskInput.value=""}getUserInput(t){return t.target.value}getClassName(t){return t.classList}},class extends t{constructor(t){super(t),this.favorite=!1}},e,class{constructor(t){this.Context=t,this.list=[],this.init()}init(){const t=new e("inbox");this.addNewContext(t),this.setActiveContext(t)}addNewContext(t){this.list.push(t)}deleteContext(t){const e=this.getIndexOfContext(t);this.list.splice(e,1)}getContext(t){const e=this.getIndexOfContext(t);return this.list[e]}getIndexOfContext(t){return t=parseInt(t),this.list.findIndex((function(e){return e.id===t}))}setActiveContext(t){this.activeContext=t}getActiveContext(){return this.activeContext}getAllContexts(){return this.list}})})();
//# sourceMappingURL=main.js.map